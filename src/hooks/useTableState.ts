import { useState, useEffect, useMemo } from 'react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { TableColumnConfig } from '@/types/components.dto';

export function useTableState(componentId: string) {
  const { rootComponents, updateComponent } = usePdfBuilder();
  
  const findComponent = (nodes: any[], id: string): any => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node._childrenWrapped) {
        const found = findComponent(node._childrenWrapped, id);
        if (found) return found;
      }
    }
    return null;
  };

  const component = useMemo(() => findComponent(rootComponents, componentId), [rootComponents, componentId]);
  
  const [columns, setColumns] = useState<TableColumnConfig[]>(component?.dto.data?.columns || []);
  const [items, setItems] = useState<any[]>(component?.dto.data?.items || []);
  const [groups, setGroups] = useState<any[]>(component?.dto.data?.groups || []);
  const [config, setConfig] = useState<any>(component?.dto.config || {});

  useEffect(() => {
    if (!component) return;
    
    const pruneObject = (obj: any) => {
      if (!obj) return {};
      return Object.entries(obj).reduce((acc: any, [key, value]) => {
        if (value !== '' && value !== undefined && value !== null && !(typeof value === 'number' && isNaN(value))) {
          acc[key] = value;
        }
        return acc;
      }, {});
    };

    updateComponent(componentId, {
      data: { ...component.dto.data, columns, items, groups },
      config: pruneObject(config)
    });
  }, [columns, items, groups, config, componentId]);

  return {
    component,
    columns, setColumns,
    items, setItems,
    groups, setGroups,
    config, setConfig
  };
}
