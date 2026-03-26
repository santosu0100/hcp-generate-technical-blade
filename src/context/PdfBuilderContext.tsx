import React, { createContext, useContext, useState } from 'react';
import { ComponentDTO, ComponentType } from '../types/components.dto';
import { OriginatorType } from '../types/operation-technical-blade.dto';
import { v4 as uuidv4 } from 'uuid';

export interface WrappedComponent {
  id: string;
  dto: ComponentDTO;
  _childrenWrapped?: WrappedComponent[];
}

interface PdfBuilderContextProps {
  originator: OriginatorType;
  setOriginator: (o: OriginatorType) => void;
  components: WrappedComponent[]; // Flat list used for sidebars
  rootComponents: WrappedComponent[]; // Tree structure for canvas
   addComponent: (type: ComponentType, parentId?: string, index?: number, initialConfig?: any) => void;
  removeComponent: (id: string) => void;
  moveComponent: (id: string, direction: 'up' | 'down') => void;
  selectedComponentId: string | null;
  setSelectedComponentId: (id: string | null) => void;
  updateComponent: (id: string, newDto: Partial<ComponentDTO>) => void;
  reorderComponent: (sourceId: string, targetParentId?: string, targetNodeId?: string, position?: 'before' | 'after' | 'inside') => void;
  getPayload: () => { originator: OriginatorType; components: ComponentDTO[] };
  loadPayload: (payload: any) => void;
  clearCanvas: () => void;
}

export const PdfBuilderContext = createContext<PdfBuilderContextProps | null>(null);

export const usePdfBuilder = () => {
  const ctx = useContext(PdfBuilderContext);
  if (!ctx) throw new Error('usePdfBuilder must be used inside Provider');
  return ctx;
};

// --- Funções Recursivas para manipular State profundamente ---
function addNode(nodes: WrappedComponent[], parentId: string, newNode: WrappedComponent): WrappedComponent[] {
  return nodes.map(n => {
    if (n.id === parentId) {
      const children = (n.dto as any).children || [];
      return { ...n, dto: { ...n.dto, children: [...children, newNode.dto] } as any, _childrenWrapped: [...(n._childrenWrapped || []), newNode] };
    }
    if (n._childrenWrapped) {
      const newChildrenWrapped = addNode(n._childrenWrapped, parentId, newNode);
      return { ...n, _childrenWrapped: newChildrenWrapped, dto: { ...n.dto, children: newChildrenWrapped.map(x => x.dto) } as any };
    }
    return n;
  });
}

function addNodeAtIndex(nodes: WrappedComponent[], parentId: string, newNode: WrappedComponent, index?: number): WrappedComponent[] {
  return nodes.map(n => {
    if (n.id === parentId) {
      const childrenWrapped = [...(n._childrenWrapped || [])];
      if (index !== undefined) {
        childrenWrapped.splice(index, 0, newNode);
      } else {
        childrenWrapped.push(newNode);
      }
      return { 
        ...n, 
        _childrenWrapped: childrenWrapped, 
        dto: { ...n.dto, children: childrenWrapped.map(x => x.dto) } as any
      };
    }
    if (n._childrenWrapped) {
      const newChildWrapped = addNodeAtIndex(n._childrenWrapped, parentId, newNode, index);
      return { 
        ...n, 
        _childrenWrapped: newChildWrapped, 
        dto: { ...n.dto, children: newChildWrapped.map(x => x.dto) } as any
      };
    }
    return n;
  });
}

function removeNode(nodes: WrappedComponent[], id: string): WrappedComponent[] {
  return nodes.filter(n => n.id !== id).map(n => {
    if (n._childrenWrapped) {
      const newChild = removeNode(n._childrenWrapped, id);
      return { ...n, _childrenWrapped: newChild, dto: { ...n.dto, children: newChild.map(x => x.dto) } as any };
    }
    return n;
  });
}

function updateNode(nodes: WrappedComponent[], id: string, newDto: Partial<ComponentDTO>): WrappedComponent[] {
  return nodes.map(n => {
    if (n.id === id) {
      const nextDto = { ...n.dto, ...newDto };
      return { ...n, dto: nextDto as any };
    }
    if (n._childrenWrapped) {
      const newChild = updateNode(n._childrenWrapped, id, newDto);
      return { ...n, _childrenWrapped: newChild, dto: { ...n.dto, children: newChild.map(x => x.dto) } as any };
    }
    return n;
  });
}

function moveNodeArr(arr: WrappedComponent[], index: number, direction: 'up'|'down') {
  if (direction === 'up' && index === 0) return arr;
  if (direction === 'down' && index === arr.length - 1) return arr;
  const newArr = [...arr];
  const targetIdx = direction === 'up' ? index - 1 : index + 1;
  const temp = newArr[index];
  newArr[index] = newArr[targetIdx];
  newArr[targetIdx] = temp;
  return newArr;
}

function moveNodeDeep(nodes: WrappedComponent[], id: string, direction: 'up' | 'down'): WrappedComponent[] {
  const idx = nodes.findIndex(n => n.id === id);
  if (idx !== -1) {
    return moveNodeArr(nodes, idx, direction);
  }
  return nodes.map(n => {
    if (n._childrenWrapped) {
      const newC = moveNodeDeep(n._childrenWrapped, id, direction);
      return { ...n, _childrenWrapped: newC, dto: { ...n.dto, children: newC.map(c => c.dto) } as any };
    }
    return n;
  });
}

function flatFind(nodes: WrappedComponent[], id: string): WrappedComponent | undefined {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n._childrenWrapped) {
      const f = flatFind(n._childrenWrapped, id);
      if (f) return f;
    }
  }
  return undefined;
}

function buildWrappedTree(components: any[]): WrappedComponent[] {
  return components.map(c => {
    const w: WrappedComponent = { id: uuidv4(), dto: { ...c } };
    if (c.children) {
      w._childrenWrapped = buildWrappedTree(c.children);
    }
    return w;
  });
}

function prunePayload(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => (typeof item === 'object' && item !== null) ? prunePayload(item) : item);
  }
  if (obj !== null && typeof obj === 'object') {
    const pruned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== '' && value !== undefined && value !== null && !(typeof value === 'number' && isNaN(value))) {
        if (typeof value === 'object') {
          const nested = prunePayload(value);
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

function extractDtoExt(nodes: WrappedComponent[]): ComponentDTO[] {
  return nodes.map(n => {
    const rawDto = { ...n.dto } as any;
    if (n._childrenWrapped && n._childrenWrapped.length > 0) {
      rawDto.children = extractDtoExt(n._childrenWrapped);
    } else {
      delete rawDto.children;
    }
    return prunePayload(rawDto) as ComponentDTO;
  });
}

export const PdfBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [originator, setOriginator] = useState<OriginatorType>('hurst');
  const [components, setComponents] = useState<WrappedComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const addComponent = (type: ComponentType, parentId?: string, index?: number, initialConfig?: any) => {
    if (['brand', 'sidebar', 'footer'].includes(type) && components.some(c => c.dto.type === type)) {
      console.warn(`O componente de layout estrurural ${type} só pode ser adicionado uma vez.`);
      return;
    }

    const newComponent: WrappedComponent = {
      id: uuidv4(),
      dto: { type, config: initialConfig || {}, data: {}, children: [] } as any,
      _childrenWrapped: []
    };
    
    if (parentId) {
      setComponents(prev => addNodeAtIndex(prev, parentId, newComponent, index));
    } else {
      setComponents(prev => {
        const next = [...prev];
        if (index !== undefined) {
          next.splice(index, 0, newComponent);
        } else {
          next.push(newComponent);
        }
        return next;
      });
    }
    setSelectedComponentId(newComponent.id);
  };

  const removeComponent = (id: string) => {
    setComponents(prev => removeNode(prev, id));
    if (selectedComponentId === id) setSelectedComponentId(null);
  };

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    setComponents(prev => moveNodeDeep(prev, id, direction));
  };

  const findNodeInfo = (nodes: WrappedComponent[], id: string, parentId?: string): { parentId?: string, index: number, node: WrappedComponent } | null => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) return { parentId, index: i, node: nodes[i] };
      if (nodes[i]._childrenWrapped) {
        const found = findNodeInfo(nodes[i]._childrenWrapped!, id, nodes[i].id);
        if (found) return found;
      }
    }
    return null;
  };

  const reorderComponent = (sourceId: string, targetParentId?: string, targetNodeId?: string, position?: 'before' | 'after' | 'inside') => {
    setComponents(prev => {
      const sourceInfo = findNodeInfo(prev, sourceId);
      if (!sourceInfo) return prev;

      const nodeToMove = sourceInfo.node;
      const filtered = removeNode(prev, sourceId);

      // Determine the real targetParentId and targetIndex
      let finalParentId = targetParentId;
      let finalIndex: number | undefined = undefined;

      if (targetNodeId) {
        const targetInfo = findNodeInfo(filtered, targetNodeId);
        if (targetInfo) {
          finalParentId = targetInfo.parentId;
          if (position === 'before') finalIndex = targetInfo.index;
          if (position === 'after') finalIndex = targetInfo.index + 1;
        }
      }

      if (!finalParentId) {
        const newRoot = [...filtered];
        if (finalIndex !== undefined) {
          newRoot.splice(finalIndex, 0, nodeToMove);
        } else {
          newRoot.push(nodeToMove);
        }
        return newRoot;
      } else {
        return addNodeAtIndex(filtered, finalParentId, nodeToMove, finalIndex);
      }
    });
  };

  const updateComponent = (id: string, newDto: Partial<ComponentDTO>) => {
    setComponents(prev => updateNode(prev, id, newDto));
  };

  const getPayload = () => ({
    originator,
    components: extractDtoExt(components)
  });

  const loadPayload = (payload: any) => {
    if (payload.originator) setOriginator(payload.originator);
    if (payload.components && Array.isArray(payload.components)) {
      setComponents(buildWrappedTree(payload.components));
    }
    setSelectedComponentId(null);
  };

  const clearCanvas = () => {
    setComponents([]);
    setSelectedComponentId(null);
  };

  // Provide flat 'components' for the properties sidebar easily via a flat method
  const flatComponents = (): WrappedComponent[] => {
     const flat: WrappedComponent[] = [];
     const traverse = (nodes: WrappedComponent[]) => {
       for (const n of nodes) { flat.push(n); if (n._childrenWrapped) traverse(n._childrenWrapped); }
     };
     traverse(components);
     return flat;
  };

  return (
    <PdfBuilderContext.Provider value={{
      originator, setOriginator, components: flatComponents(), addComponent, removeComponent,
      moveComponent, selectedComponentId, setSelectedComponentId, updateComponent, reorderComponent,
      getPayload, loadPayload, clearCanvas, rootComponents: components
    }}>
      {children}
    </PdfBuilderContext.Provider>
  );
};
