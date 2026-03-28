import { WrappedComponent } from '../context/PdfBuilderContext';
import { ComponentDTO } from '../types/components.dto';

const DATA_PATH_MARKER = '.data.';

/**
 * Padrão para as chaves do template.
 * {{path.to.attribute}}
 */
export const generateKey = (path: string): string => `{{${path}}}`;

/**
 * Verifica se um valor é um primitivo (string, number, boolean) válido para template.
 */
const isTemplateableValue = (value: unknown): value is string | number | boolean => {
  if (value === null || value === undefined || value === '') return false;
  if (typeof value === 'number' && Number.isNaN(value)) return false;
  return ['string', 'number', 'boolean'].includes(typeof value);
};

/**
 * Verifica se um path deve ser substituído por uma chave.
 */
const shouldTemplatePath = (path: string): boolean => {
  if (path === 'originator') return true;
  if (!path.includes(DATA_PATH_MARKER)) return false;

  const parts = path.split('.');
  const lastPart = parts[parts.length - 1];
  
  // Exceções: rótulos, títulos e definições de colunas são mantidos como valores reais
  if (['label', 'title'].includes(lastPart)) return false;
  if (path.includes('.columns.')) return false;

  return true;
};

/**
 * Função utilitária para remoção de campos vazios e metadados internos.
 */
export function prunePayload(obj: any, keepInternal = false): any {
  if (Array.isArray(obj)) {
    return obj
      .map(item => (typeof item === 'object' && item !== null ? prunePayload(item, keepInternal) : item))
      .filter(item => item !== undefined && item !== null);
  }

  if (obj === null || typeof obj !== 'object') return obj;

  return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    if (!keepInternal && key.startsWith('internal_')) return acc;
    if (value === '' || value === undefined || value === null) return acc;
    if (typeof value === 'number' && Number.isNaN(value)) return acc;

    if (typeof value !== 'object') {
      return { ...acc, [key]: value };
    }

    const nested = prunePayload(value, keepInternal);
    const hasItems = Array.isArray(nested) ? nested.length > 0 : Object.keys(nested).length > 0;
    
    return hasItems ? { ...acc, [key]: nested } : acc;
  }, {});
}

/**
 * Percorre recursivamente o payload e substitui valores folha por chaves baseadas no path.
 */
function replaceWithPool(obj: any, actualPath: string, templatePath: string, skipPaths: string[] = []): any {
  if (skipPaths.includes(actualPath)) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item, index) => 
      replaceWithPool(item, `${actualPath}.${index}`, `${templatePath}.${index}`, skipPaths)
    );
  }

  if (obj !== null && typeof obj === 'object') {
    // Se houver uma chave customizada, ela aparece como "key" no template
    const baseObj = obj.internal_templateKey ? { key: obj.internal_templateKey } : {};

    // Adiciona caminhos para pular em componentes específicos
    const activeSkipPaths = [
      ...(obj.type === 'table' ? [`${actualPath}.data.columns`] : []),
      ...(obj.type === 'action-button' ? [`${actualPath}.data`] : []),
      ...skipPaths
    ];

    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (key === 'internal_templateKey') return acc;

      const nextActualPath = actualPath === '' ? key : `${actualPath}.${key}`;
      const nextTemplatePath = templatePath === '' ? key : `${templatePath}.${key}`;
      
      return {
        ...acc,
        [key]: replaceWithPool(value, nextActualPath, nextTemplatePath, activeSkipPaths)
      };
    }, baseObj);
  }

  // Valor primitivo: verifica se deve virar uma chave de template
  return isTemplateableValue(obj) && shouldTemplatePath(actualPath)
    ? generateKey(templatePath)
    : obj;
}

/**
 * Gera o payload do template.
 * Organizado para garantir imutabilidade e clareza.
 */
export function generateTemplate(rootComponents: WrappedComponent[], originator: string): any {
  const processNodes = (nodes: WrappedComponent[]): any[] => {
    return nodes.map(({ dto, _childrenWrapped }) => {
      const anyDto = dto as any;
      const { children: _ignored, ...dtoSansChildren } = anyDto;
      
      // Resolve a chave interna, garantindo que ela fique na raiz do DTO
      const internalKey = anyDto.internal_templateKey || anyDto.data?.internal_templateKey;
      
      // Remove a chave do objeto data se ela estiver lá (limpeza/normalização imutável)
      const cleanData = anyDto.data && anyDto.data.internal_templateKey
        ? Object.fromEntries(Object.entries(anyDto.data).filter(([k]) => k !== 'internal_templateKey'))
        : anyDto.data;

      const baseDto: any = {
        ...dtoSansChildren,
        internal_templateKey: internalKey,
        data: cleanData,
        ...(_childrenWrapped?.length ? { children: processNodes(_childrenWrapped) } : {})
      };

      return prunePayload(baseDto, true);
    });
  };

  const basePayload = {
    originator,
    components: processNodes(rootComponents)
  };

  return replaceWithPool(basePayload, '', '', []);
}

/**
 * Função utilitária para injetar valores no template.
 */
export function setValueByKey(payload: any, key: string, value: any): any {
  if (Array.isArray(payload)) {
    return payload.map(item => setValueByKey(item, key, value));
  }

  if (payload !== null && typeof payload === 'object') {
    return Object.entries(payload).reduce((acc, [k, v]) => ({
      ...acc,
      [k]: v === key ? value : (typeof v === 'object' ? setValueByKey(v, key, value) : v)
    }), {});
  }

  return payload === key ? value : payload;
}
