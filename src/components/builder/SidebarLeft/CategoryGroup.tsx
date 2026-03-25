import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ComponentCategory } from '@/components/pdf/render/types';

interface CategoryGroupProps {
  category: ComponentCategory;
  isOpen: boolean;
  onToggle: (cat: ComponentCategory) => void;
  children: React.ReactNode;
}

export function CategoryGroup({ category, isOpen, onToggle, children }: CategoryGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full border-b border-white/5 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <div 
        className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors bg-black/20 hover:bg-white/5 select-none" 
        onClick={() => onToggle(category)}
      >
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{category}</span>
        <div className="flex justify-center items-center text-slate-500">
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="flex flex-col gap-2 px-4 py-3 bg-black/5">
          {children}
        </div>
      )}
    </div>
  );
}
