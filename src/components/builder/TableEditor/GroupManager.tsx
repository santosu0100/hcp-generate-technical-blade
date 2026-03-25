import { Plus, Trash2, Bold, Italic } from 'lucide-react';
import { TableColumnConfig } from '@/types/components.dto';
import { ColorInput } from '../ColorInput';

interface GroupManagerProps {
  columns: TableColumnConfig[];
  groups: any[];
  setGroups: (groups: any[]) => void;
}

export function GroupManager({ columns, groups, setGroups }: GroupManagerProps) {
  const addGroup = () => {
    setGroups([...groups, { label: 'Novo Grupo', columns: [], backgroundColor: '', textColor: '', bold: false, italic: false }]);
  };

  const removeGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const updateGroup = (index: number, field: string, value: any) => {
    const newGroups = [...groups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    setGroups(newGroups);
  };

  const toggleColumnInGroup = (groupIndex: number, colKey: string) => {
    const newGroups = [...groups];
    const currentCols = newGroups[groupIndex].columns || [];
    if (currentCols.includes(colKey)) {
      newGroups[groupIndex].columns = currentCols.filter((k: string) => k !== colKey);
    } else {
      newGroups[groupIndex].columns = [...currentCols, colKey];
    }
    setGroups(newGroups);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Agrupamentos de Colunas</h3>
          <p className="text-sm text-slate-400">Crie cabeçalhos superiores que agrupam múltiplas colunas.</p>
        </div>
        <button 
          onClick={addGroup}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all"
        >
          <Plus size={16} /> Novo Grupo
        </button>
      </div>

      <div className="grid gap-4">
        {groups.length === 0 && (
          <div className="py-12 text-center text-slate-500 italic border-2 border-dashed border-white/5 rounded-xl">
            Nenhum grupo definido.
          </div>
        )}
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 max-w-sm space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Título do Grupo</label>
                <input 
                  type="text"
                  value={group.label}
                  onChange={(e) => updateGroup(gIdx, 'label', e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
              <button 
                onClick={() => removeGroup(gIdx)}
                className="p-2 text-slate-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Colunas Incluídas</label>
              <div className="flex flex-wrap gap-2">
                {columns.map(col => (
                  <button
                    key={col.key}
                    onClick={() => toggleColumnInGroup(gIdx, col.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                      (group.columns || []).includes(col.key)
                        ? 'bg-blue-500 border-blue-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-8">
              <ColorInput 
                label="Cor de Fundo"
                value={group.backgroundColor || ''}
                onChange={(val) => updateGroup(gIdx, 'backgroundColor', val)}
                labelClass="text-[10px] text-slate-500 uppercase font-bold mb-2 block"
              />
              <ColorInput 
                label="Cor do Texto"
                value={group.textColor || ''}
                onChange={(val) => updateGroup(gIdx, 'textColor', val)}
                labelClass="text-[10px] text-slate-500 uppercase font-bold mb-2 block"
              />
            </div>

            <div className="flex justify-end gap-2 px-2">
              <button 
                onClick={() => updateGroup(gIdx, 'bold', !group.bold)}
                className={`p-2 rounded transition-colors ${group.bold ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10 border border-white/10'}`}
                title="Negrito"
              >
                <Bold size={16} />
              </button>
              <button 
                onClick={() => updateGroup(gIdx, 'italic', !group.italic)}
                className={`p-2 rounded transition-colors ${group.italic ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10 border border-white/10'}`}
                title="Itálico"
              >
                <Italic size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
