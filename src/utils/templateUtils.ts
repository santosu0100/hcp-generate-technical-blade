import { WrappedComponent } from '../context/PdfBuilderContext';
import { ComponentDTO } from '../types/components.dto';



/**
 * Padrão para as chaves do template.
 * {{path.to.attribute}}
 */
export function generateKey(path: string): string {
  return `{{${path}}}`;
}

/**
 * Verifica se um path deve ser substituído por uma chave.
 * Somente o path 'originator' e qualquer coisa dentro de '.data.' deve ser substituído.
 */
function shouldTemplatePath(path: string): boolean {
  if (path === 'originator') return true;
  if (!path.includes('.data.')) return false;

  // Se o atributo final for 'label' ou 'title', não templata (mantém o valor real)
  const parts = path.split('.');
  const lastPart = parts[parts.length - 1];
  if (lastPart === 'label' || lastPart === 'title') return false;

  // Se o path contém '.columns.', significa que é um item de uma lista de colunas (como em table ou groups)
  if (path.includes('.columns.')) return false;

  return true;
}

/**
 * Percorre recursivamente o payload e substitui valores folha por chaves baseadas no path.
 */
function replaceWithPool(obj: any, actualPath: string, templatePath: string, skipPaths: string[] = []): any {
  if (skipPaths.includes(actualPath)) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item, index) => replaceWithPool(item, `${actualPath}.${index}`, `${templatePath}.${index}`, skipPaths));
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    
    // Se houver uma chave customizada para template, ela aparece no JSON final como "key"
    // Mas não é usada para sobrescrever o path das variáveis (conforme nova solicitação)
    if (obj.internal_templateKey) {
        newObj.key = obj.internal_templateKey;
    }

    // Se for um componente do tipo table, as colunas devem ser mantidas (não templated)
    if (obj.type === 'table') {
      skipPaths.push(`${actualPath}.data.columns`);
    }
    // Se for um componente do tipo action-button, o conteúdo (label/href) deve ser mantido
    if (obj.type === 'action-button') {
      skipPaths.push(`${actualPath}.data`);
    }

    for (const [key, value] of Object.entries(obj)) {
      if (key === 'internal_templateKey') continue;

      const nextActualPath = actualPath === '' ? key : `${actualPath}.${key}`;
      const nextTemplatePath = templatePath === '' ? key : `${templatePath}.${key}`;
      
      newObj[key] = replaceWithPool(value, nextActualPath, nextTemplatePath, skipPaths);
    }
    return newObj;
  }

  // Se for primitivo (e não um skip path), verifica se o path deve ser templated
  if ((typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') && obj !== null) {
    if (shouldTemplatePath(actualPath)) {
      // Usamos o templatePath para a chave final
      return generateKey(templatePath);
    }
  }

  return obj;
}

function prunePayload(obj: any, keepInternal = false): any {
  if (Array.isArray(obj)) {
    return obj.map(item => (typeof item === 'object' && item !== null) ? prunePayload(item, keepInternal) : item);
  }
  if (obj !== null && typeof obj === 'object') {
    const pruned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      // Remove campos internos (que começam com internal_) a menos que explicitamente solicitado
      if (!keepInternal && key.startsWith('internal_')) continue;

      if (value !== '' && value !== undefined && value !== null && !(typeof value === 'number' && isNaN(value))) {
        if (typeof value === 'object') {
          const nested = prunePayload(value, keepInternal);
          if (Array.isArray(nested)) {
            if (nested.length > 0) pruned[key] = nested;
          } else if (Object.keys(nested).length > 0) {
            pruned[key] = nested;
          }
        } else {
          pruned[key] = value;
        }
      }
    }
    return pruned;
  }
  return obj;
}

/**
 * Gera o payload do template substituindo os valores reais por chaves baseadas no caminho JSON.
 * Exclui atributos de configuração e campos vazios.
 * Suporta override de chaves via `internal_templateKey`.
 */
export function generateTemplate(rootComponents: WrappedComponent[], originator: string): any {
  // 1. Primeiro geramos o payload DTO limpo (sem IDs internos de UI, estrutura final, mas com internal_templateKey se houver)
  const processNodes = (nodes: WrappedComponent[]): ComponentDTO[] => {
    return nodes.map(node => {
      const dto = { ...node.dto } as any;
      
      // Limpeza/Garantia: internal_templateKey deve ficar na raiz do DTO do componente (ao lado de type)
      // e não dentro do objeto data.
      if (dto.data && dto.data.internal_templateKey) {
        if (!dto.internal_templateKey) {
          dto.internal_templateKey = dto.data.internal_templateKey;
        }
        delete dto.data.internal_templateKey;
      }

      if (node._childrenWrapped && node._childrenWrapped.length > 0) {
        dto.children = processNodes(node._childrenWrapped);
      } else {
        delete dto.children;
      }
      
      // Prunamos campos vazios mas MANTEMOS os internos (internal_templateKey) para o replaceWithPool poder usar
      return prunePayload(dto, true) as ComponentDTO;
    });
  };

  const basePayload = {
    originator,
    components: processNodes(rootComponents)
  };

  // 2. Aplicamos a substituição baseada em caminhos, mas COM suporte a chaves customizadas
  return replaceWithPool(basePayload, '', '', []);
}

/**
 * Função utilitária para setar um valor em uma chave específica dentro de um objeto.
 * Procura pela chave string (ex: "{{path.to.attr}}") e a substitui pelo valor real.
 */
export function setValueByKey(payload: any, key: string, value: any): any {
  if (Array.isArray(payload)) {
    return payload.map(item => setValueByKey(item, key, value));
  }

  if (payload !== null && typeof payload === 'object') {
    const newObj: any = {};
    for (const [k, v] of Object.entries(payload)) {
      if (v === key) {
        newObj[k] = value;
      } else if (typeof v === 'object' || Array.isArray(v)) {
        newObj[k] = setValueByKey(v, key, value);
      } else {
        newObj[k] = v;
      }
    }
    return newObj;
  }

  return payload === key ? value : payload;
}
