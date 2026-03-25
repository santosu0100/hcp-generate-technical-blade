import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Field {
  name: string;
  label: string;
  type?: 'text' | 'textarea';
  placeholder?: string;
}

interface ListItemEditorProps {
  items: any[];
  onUpdate: (items: any[]) => void;
  fields: Field[];
  title?: string;
  addButtonLabel?: string;
}

export function ListItemEditor({ items = [], onUpdate, fields, title, addButtonLabel = "Adicionar Item" }: ListItemEditorProps) {
  const handleAddItem = () => {
    const newItem = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
    onUpdate([...items, newItem]);
  };

  const handleUpdateItem = (index: number, name: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    onUpdate(newItems);
  };

  const handleRemoveItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</label>
          <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{items.length} itens</span>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="group bg-white/5 border border-white/10 rounded-lg p-3 relative hover:border-white/20 transition-all">
            <div className="flex gap-3">
              <div className="flex-1 space-y-3">
                {fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="w-full bg-black/20 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-blue-500 min-h-[60px] resize-none"
                        value={item[field.name] || ''}
                        onChange={(e) => handleUpdateItem(index, field.name, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        className="w-full bg-black/20 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-blue-500"
                        value={item[field.name] || ''}
                        onChange={(e) => handleUpdateItem(index, field.name, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col justify-between pt-4">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100"
                  title="Remover Item"
                >
                  <Trash2 size={14} />
                </button>
                <div className="p-1.5 text-slate-700 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100">
                  <GripVertical size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-6 px-4 border border-dashed border-white/10 rounded-lg bg-black/10">
            <p className="text-[10px] text-slate-500 italic mb-3">Nenhum item adicionado à lista.</p>
          </div>
        )}

        <button
          onClick={handleAddItem}
          className="w-full py-2 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Plus size={14} />
          {addButtonLabel}
        </button>
      </div>
    </div>
  );
}
