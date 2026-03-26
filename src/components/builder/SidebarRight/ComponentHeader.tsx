import React from 'react';
import { 
  Type, Layout, Image as ImageIcon, FileText, 
  Columns, Footprints, Table as TableIcon, Settings 
} from 'lucide-react';
import { ComponentType } from '@/types/components.dto';

interface ComponentHeaderProps {
  type: ComponentType;
  id: string;
}

export function ComponentHeader({ type, id }: ComponentHeaderProps) {
  const getIcon = () => {
    switch (type) {
      case 'text': return <Type size={20}/>;
      case 'section': return <Layout size={20}/>;
      case 'box-group': return <ImageIcon size={20}/>;
      case 'card': return <FileText size={20}/>;
      case 'sidebar': return <Columns size={20}/>;
      case 'footer': return <Footprints size={20}/>;
      case 'brand': return <ImageIcon size={20}/>;
      case 'table': return <TableIcon size={20}/>;
      default: return <Settings size={20}/>;
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shrink-0">
        {getIcon()}
      </div>
      <div className="min-w-0">
        <h2 className="text-sm font-bold text-white uppercase tracking-tight truncate">{type}</h2>
        <p className="text-[10px] text-slate-400 font-mono truncate">{id}</p>
      </div>
    </div>
  );
}
