import type { WrappedComponent } from '../context/PdfBuilderContext';
import { type ComponentDTO } from '../types/components.dto';

const DATA_PATH_MARKER = '.data.';

/**
 * Padrão para as chaves do template.
 * {{path.to.attribute}}
 */
export const generateKey = (path: string): string => `{{${path}}}`;

/**
 * Verifica se um valor é um primitivo (string, number, boolean) válido para template.
 */
const isTemplateableValue = (value: unknown, isModel = false, isTemplate = false): value is string | number | boolean => {
  if (value === null || value === undefined) return false;
  if (value === '' && !isModel && !isTemplate) return false;
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
  
  // Exceções: rótulos e títulos em geral são mantidos como valores reais para o PDF
  if (['label', 'title'].includes(lastPart)) {
    return false;
  }

  if (path.includes('.columns.')) return false;

  return true;
};

/**
 * Limpa objetos vazios, nulos ou indefinidos do payload.
 * Garante que o JSON final seja limpo e contenha apenas o necessário.
 */
export function prunePayload(obj: any, keepInternal = false): any {
  if (Array.isArray(obj)) {
    return obj.map(item => prunePayload(item, keepInternal));
  }

  if (obj === null || typeof obj !== 'object') return obj;

  return Object.entries(obj).reduce((acc: Record<string, any>, [key, value]) => {
    if (!keepInternal && key.startsWith('internal_')) return acc;
    
    // Especial: Manter itens vazios e itemModel no template
    if (key === 'items' && Array.isArray(value)) {
      return { ...acc, [key]: prunePayload(value, keepInternal) };
    }
    if (key === 'itemModel' && value !== null && typeof value === 'object') {
      return { ...acc, [key]: prunePayload(value, keepInternal) };
    }

    const prunedValue = prunePayload(value, keepInternal);

    // No template generation (keepInternal=true), queremos MANTER strings vazias e estruturas
    if (keepInternal) {
      if (prunedValue === undefined) return acc;
      return { ...acc, [key]: prunedValue };
    }

    // Comportamento original mais restritivo para limpeza final se necessário
    if (prunedValue === null || prunedValue === undefined || prunedValue === '') return acc;
    if (Array.isArray(prunedValue) && prunedValue.length === 0) return acc;
    if (typeof prunedValue === 'object' && Object.keys(prunedValue).length === 0) return acc;

    return { ...acc, [key]: prunedValue };
  }, {});
}

/**
 * Percorre recursivamente o payload e substitui valores folha por chaves baseadas no path.
 */
/**
 * Estrutura padrão para itens de cada tipo de componente.
 * Usado para gerar o itemModel quando a lista está vazia.
 */
function getDefaultItemForType(type: string, columns?: any[]): any {
  if (type === 'table' && columns) {
    const cells: any = {};
    columns.forEach(c => cells[c.key] = '');
    return { cells };
  }
  
  if (['bullet-list', 'label-value', 'title-description', 'big-int'].includes(type)) {
    return { label: '', value: '' };
  }
  
  if (['arrow-list', 'ordered-list', 'marker-list', 'ordered-description'].includes(type)) {
    return { title: '', description: '' };
  }

  return {};
}

function replaceWithPool(
  obj: any, 
  actualPath: string, 
  templatePath: string, 
  skipPaths: string[] = [],
  options?: { 
    skipIndexing?: boolean; 
    showLiteralValue?: boolean; 
    colRemap?: Record<string, string>; 
    isModel?: boolean; 
    isTemplate?: boolean;
    emptyItems?: boolean;
    componentType?: string;
    onCollect?: (key: string, value: any) => void;
  }
): any {
  if (skipPaths.includes(actualPath)) return obj;

  if (Array.isArray(obj)) {
    // Se estivermos em modo emptyItems, retornamos array vazio (finalidade do itemModel)
    if (options?.emptyItems) return [];

    return obj.map((item, index) => {
      const nextTemplatePath = options?.skipIndexing ? templatePath : `${templatePath}.${index}`;
      return replaceWithPool(item, `${actualPath}.${index}`, nextTemplatePath, skipPaths, options);
    });
  }

  if (obj !== null && typeof obj === 'object') {
    // 1. Determina se deve mostrar valor literal
    const showLiteralValue = options?.showLiteralValue || obj.internal_showLiteralValue === true;

    // 2. Chave de identificação técnica (originDataKey)
    const baseObj: any = obj.internal_originDataKey ? { originDataKey: obj.internal_originDataKey } : {};

    // 3. Adiciona caminhos para pular
    const activeSkipPaths = [
      ...(obj.type === 'table' ? [`${actualPath}.data.columns`] : []),
      ...(obj.type === 'action-button' ? [`${actualPath}.data`] : []),
      ...skipPaths
    ];

    // 4. Mapeamento de Atributos do Modelo (Remap)
    let currentRemap = options?.colRemap || {};
    if (obj.type === 'table' && obj.data?.columns) {
      currentRemap = { ...currentRemap };
      obj.data.columns.forEach((c: any) => {
        if (c.originDataKey) currentRemap[c.key] = c.originDataKey;
      });
    }
    if (obj.internal_itemRemap) {
      currentRemap = { ...currentRemap, ...obj.internal_itemRemap };
    }

    // 5. Caso especial: Geração do itemModel (na raiz do componente)
    // Agora gera um array de objetos { key, originDataKey } baseado no remap
    if (obj.internal_isTemplateModel && !showLiteralValue && obj.type !== 'table') {
      const itemsData = obj.data?.items || obj.items;
      
      // Determina o modelo baseado nos itens reais para preservar as chaves
      let itemToModel = (Array.isArray(itemsData) && itemsData.length > 0) ? itemsData[0] : null;
      
      // Se não houver itens, usa o default para o tipo
      if (!itemToModel) {
        itemToModel = getDefaultItemForType(obj.type, obj.data?.columns);
      }

      // Determina o path base para coletar as chaves de template (dry run)
      const itemsKey = obj.data?.items ? 'data.items' : 'items';
      const modelTemplatePath = templatePath === '' ? itemsKey : `${templatePath}.${itemsKey}`;
      const modelActualPath = actualPath === '' ? itemsKey : `${actualPath}.${itemsKey}`;

      // Dry run para coletar as chaves de template do modelo no masterDefaultValues
      replaceWithPool(
        itemToModel, 
        `${modelActualPath}.0`, 
        modelTemplatePath, 
        activeSkipPaths, 
        { ...options, skipIndexing: true, showLiteralValue, colRemap: currentRemap, isModel: true }
      );

      // Gera itemModel garantindo que todas as chaves do item existam (usando remap se existir)
      const modelKeys = Object.keys(itemToModel);
      baseObj.itemModel = modelKeys.map(key => ({
        key,
        originDataKey: (obj.internal_itemRemap && obj.internal_itemRemap[key]) || key
      }));
    }

    const isModelRoot = obj.internal_isTemplateModel === true;
    const processedObj = Object.entries(obj).reduce((acc: any, [key, value]) => {
      if (['internal_originDataKey', 'internal_isTemplateModel', 'internal_showLiteralValue', 'internal_itemRemap', 'cellMetadata'].includes(key)) return acc;

      const nextActualPath = actualPath === '' ? key : `${actualPath}.${key}`;
      
      // Remapeia o path do template se houver um remap configurado
      // EXCETO se for um item de lista conhecido (label, value, title, description) e estivermos em itens reais
      // para evitar que remapeamentos externos "vazem" para dentro dos itens
      let mappedKey = currentRemap[key] || key;
      
      // Proteção extra para chaves de itens de lista em componentes específicos
      // Usamos o componentType propagado via options
      const compType = obj.type || options?.componentType;
      if (['label', 'value'].includes(key) && ['bullet-list', 'title-description', 'label-value', 'big-int'].includes(compType)) {
        mappedKey = (obj.internal_itemRemap && obj.internal_itemRemap[key]) || key;
      } else if (['title', 'description'].includes(key) && ['arrow-list', 'ordered-list', 'marker-list', 'ordered-description'].includes(compType)) {
        mappedKey = (obj.internal_itemRemap && obj.internal_itemRemap[key]) || key;
      }

      const nextTemplatePath = templatePath === '' ? mappedKey : `${templatePath}.${mappedKey}`;

      // Configurações para filhos: Propaga emptyItems se já existir ou se formos a raiz de um modelo (e não for literal nem tabela)
      const nextOptions = { 
        ...options, 
        showLiteralValue, 
        colRemap: currentRemap,
        componentType: obj.type || options?.componentType,
        emptyItems: options?.emptyItems || (key === 'data' && isModelRoot && !showLiteralValue && obj.type !== 'table')
      };

      // Caso especial: Tabela (remap de células) - continua funcionando para tabelas
      if (key === 'cells' && typeof value === 'object' && value !== null) {
        const metadata = (obj as any).cellMetadata || {};
        const remappedCells = Object.entries(value).reduce((cellAcc: any, [cellKey, cellVal]) => {
          const finalCellKey = metadata[cellKey]?.originDataKey || currentRemap[cellKey] || cellKey;
          const cellLiteral = metadata[cellKey]?.internal_showLiteralValue === true;
          
          cellAcc[finalCellKey] = replaceWithPool(
            cellVal, 
            `${nextActualPath}.${cellKey}`, 
            `${nextTemplatePath}.${finalCellKey}`, 
            activeSkipPaths, 
            { ...nextOptions, showLiteralValue: showLiteralValue || cellLiteral }
          );
          return cellAcc;
        }, {});
        
        return { ...acc, cells: remappedCells };
      }
      
      acc[mappedKey] = replaceWithPool(value, nextActualPath, nextTemplatePath, activeSkipPaths, nextOptions);
      return acc;
    }, baseObj);

    return processedObj;
  }

  // Valor primitivo: verifica se deve virar uma chave de template
  if (isTemplateableValue(obj, options?.isModel, options?.isTemplate) && shouldTemplatePath(actualPath) && !options?.showLiteralValue) {
    const key = generateKey(templatePath);
    if (options?.onCollect) {
      options.onCollect(key, obj);
    }
    return key;
  }

  return obj;
}

export function generateTemplate(components: WrappedComponent[], originator: string): any {
  function processNodes(wrappedItems: WrappedComponent[]): any[] {
    return wrappedItems.map(w => {
      const dto = w.dto as any;
      const { id, _childrenWrapped } = w;

      // Preserve technical metadata for recursive processing
      const baseDto: any = {
        type: dto.type,
        internal_originDataKey: dto.internal_originDataKey,
        internal_isTemplateModel: dto.internal_isTemplateModel,
        internal_showLiteralValue: dto.internal_showLiteralValue,
        internal_itemRemap: dto.internal_itemRemap,
        data: dto.data,
      };

      if (dto.config) baseDto.config = dto.config;
      
      const children = w._childrenWrapped || dto.children;
      if (children && children.length > 0) {
        if (typeof children[0] === 'object' && 'dto' in children[0]) {
          baseDto.children = processNodes(children as WrappedComponent[]);
        } else {
          // Já são DTOs
          baseDto.children = children;
        }
      }

      return prunePayload(baseDto, true);
    });
  }

  // Se 'components' for a lista plana do contexto, precisamos das raízes.
  // Se for a lista já filtrada, usamos como está.
  // Assumindo que o chamador pode passar a estrutura completa.
  const basePayload = {
    originator,
    components: processNodes(components)
  };

  const masterDefaultValues: Record<string, any> = {};
  const template = replaceWithPool(basePayload, '', '', [], {
    isTemplate: true,
    onCollect: (key, value) => {
      masterDefaultValues[key] = value;
    }
  });

  const finalTemplate = prunePayload(template, true);
  
  // Adiciona a lista flat de keyDefaultValue na raiz
  const defaultValuesArray = Object.entries(masterDefaultValues).map(([key, value]) => ({ key, value }));
  if (defaultValuesArray.length > 0) {
    finalTemplate.keyDefaultValue = defaultValuesArray;
  }

  return finalTemplate;
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
