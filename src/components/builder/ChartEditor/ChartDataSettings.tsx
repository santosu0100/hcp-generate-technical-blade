import React from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Database } from 'lucide-react';
import { ChartData, ChartDataset } from '@/types/components.dto';

interface ChartDataSettingsProps {
  data: ChartData;
  onUpdate: (data: ChartData) => void;
}

export function ChartDataSettings({ data, onUpdate }: ChartDataSettingsProps) {
  const [expandedDataset, setExpandedDataset] = React.useState<number | null>(0);

  const labels = data.labels || [];
  const datasets = data.datasets || [];

  const handleUpdateLabels = (newLabels: string[]) => {
    onUpdate({ ...data, labels: newLabels });
  };

  const handleAddLabel = () => {
    const newLabels = [...labels, `Label ${labels.length + 1}`];
    // Also update all datasets to have a new data point
    const newDatasets = datasets.map(ds => ({
      ...ds,
      data: [...ds.data, 0]
    }));
    onUpdate({ ...data, labels: newLabels, datasets: newDatasets });
  };

  const handleRemoveLabel = (index: number) => {
    const newLabels = labels.filter((_, i) => i !== index);
    const newDatasets = datasets.map(ds => ({
      ...ds,
      data: ds.data.filter((_, i) => i !== index)
    }));
    onUpdate({ ...data, labels: newLabels, datasets: newDatasets });
  };

  const handleAddDataset = () => {
    const newDataset: ChartDataset = {
      label: `Dataset ${datasets.length + 1}`,
      data: Array(labels.length).fill(0),
      backgroundColor: '#1E3A5F',
      borderColor: '#1E3A5F',
    };
    onUpdate({ ...data, datasets: [...datasets, newDataset] });
    setExpandedDataset(datasets.length);
  };

  const handleRemoveDataset = (index: number) => {
    onUpdate({ ...data, datasets: datasets.filter((_, i) => i !== index) });
    if (expandedDataset === index) setExpandedDataset(null);
  };

  const handleUpdateDataset = (index: number, updates: Partial<ChartDataset>) => {
    const newDatasets = [...datasets];
    newDatasets[index] = { ...newDatasets[index], ...updates };
    onUpdate({ ...data, datasets: newDatasets });
  };

  const handleUpdateDataPoint = (dsIndex: number, pIndex: number, value: number) => {
    const newDatasets = [...datasets];
    const newData = [...newDatasets[dsIndex].data];
    newData[pIndex] = value;
    newDatasets[dsIndex] = { ...newDatasets[dsIndex], data: newData };
    onUpdate({ ...data, datasets: newDatasets });
  };

  return (
    <div className="space-y-8 pb-8 min-h-[400px]">
      {/* Labels Section */}
      <section className="space-y-4 bg-white/2 p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical size={14} className="text-slate-600" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Labels (Eixo X)</h3>
          </div>
          <button 
            onClick={handleAddLabel}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-bold uppercase transition-all shadow-sm active:scale-95"
          >
            <Plus size={12} /> Add Label
          </button>
        </div>
        
        {labels.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto px-1 custom-scrollbar">
            {labels.map((label, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2.5 py-2 group hover:border-white/20 transition-all">
                <input 
                  type="text" 
                  value={label} 
                  onChange={(e) => {
                    const newLabels = [...labels];
                    newLabels[index] = e.target.value;
                    handleUpdateLabels(newLabels);
                  }}
                  className="bg-transparent border-none text-xs text-slate-200 outline-none flex-1 font-medium"
                />
                <button 
                  onClick={() => handleRemoveLabel(index)}
                  className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center bg-black/10 rounded-lg border border-dashed border-white/5">
            <p className="text-[10px] text-slate-600 italic">Nenhum rótulo definido.</p>
          </div>
        )}
      </section>

      {/* Datasets Section */}
      <section className="space-y-4 bg-white/2 p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-slate-600" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Séries de Dados</h3>
          </div>
          <button 
            onClick={handleAddDataset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg text-[10px] font-bold uppercase transition-all shadow-sm active:scale-95"
          >
            <Plus size={12} /> Add Série
          </button>
        </div>

        {datasets.length > 0 ? (
          <div className="space-y-3">
            {datasets.map((ds, dsIndex) => (
              <div key={dsIndex} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all hover:border-white/20 shadow-sm">
                <div 
                  className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${expandedDataset === dsIndex ? 'bg-white/5' : 'hover:bg-white/2'}`}
                  onClick={() => setExpandedDataset(expandedDataset === dsIndex ? null : dsIndex)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded shadow-sm border border-white/10" style={{ backgroundColor: Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : ds.backgroundColor }} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200">{ds.label || 'Série sem nome'}</span>
                      <span className="text-[9px] text-slate-500 font-medium uppercase tracking-tighter">
                        {ds.type || 'Default'} • {ds.data.length} pts • {ds.yAxisID === 'y1' ? 'Eixo Dir.' : 'Eixo Esq.'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveDataset(dsIndex); }}
                      className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="p-1.5 text-slate-500">
                      {expandedDataset === dsIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {expandedDataset === dsIndex && (
                  <div className="px-5 pb-5 space-y-5 animate-in slide-in-from-top-2 duration-300 border-t border-white/5 pt-4 bg-black/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Identificação</label>
                        <input 
                          type="text" 
                          value={ds.label} 
                          onChange={(e) => handleUpdateDataset(dsIndex, { label: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-blue-500 transition-all font-medium"
                          placeholder="Nome da série..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Tipo de Viz.</label>
                        <select 
                          value={ds.type || ''} 
                          onChange={(e) => handleUpdateDataset(dsIndex, { type: e.target.value as any })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-blue-500 transition-all font-medium appearance-none"
                        >
                          <option value="">Padrão do Gráfico</option>
                          <option value="bar">Barras</option>
                          <option value="line">Linha</option>
                        </select>
                      </div>
                    </div>

                    {labels.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Pontos de Dados</label>
                        <div className="grid grid-cols-4 gap-2">
                          {labels.map((label, pIndex) => (
                            <div key={pIndex} className="space-y-1">
                              <label className="text-[8px] text-slate-500 truncate block px-1 font-bold">{label}</label>
                              <input 
                                type="number" 
                                step="any"
                                value={ds.data[pIndex] ?? 0} 
                                onChange={(e) => handleUpdateDataPoint(dsIndex, pIndex, parseFloat(e.target.value) || 0)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-blue-500 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Eixo de Escala</label>
                        <select 
                          value={ds.yAxisID || 'y'} 
                          onChange={(e) => handleUpdateDataset(dsIndex, { yAxisID: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-blue-500 transition-all font-medium appearance-none"
                        >
                          <option value="y">Principal (Esquerda)</option>
                          <option value="y1">Secundário (Direita)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cor Temática</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : (ds.backgroundColor || '#1E3A5F')} 
                            onChange={(e) => handleUpdateDataset(dsIndex, { backgroundColor: e.target.value, borderColor: e.target.value })}
                            className="w-9 h-9 rounded-lg border border-white/10 bg-black/20 cursor-pointer p-1"
                          />
                          <input 
                            type="text" 
                            value={Array.isArray(ds.backgroundColor) ? ds.backgroundColor[0] : (ds.backgroundColor || '#1E3A5F')} 
                            onChange={(e) => handleUpdateDataset(dsIndex, { backgroundColor: e.target.value, borderColor: e.target.value })}
                            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none focus:border-blue-500 transition-all font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {(ds.type === 'line' || (data as any).type === 'line') && (
                      <div className="grid grid-cols-3 gap-4 border-t border-white/5 mt-2 pt-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Tensão (Curva)</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={ds.tension ?? 0.4} 
                            onChange={(e) => handleUpdateDataset(dsIndex, { tension: parseFloat(e.target.value) })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Raio Ponto</label>
                          <input 
                            type="number" 
                            value={ds.pointRadius ?? 3} 
                            onChange={(e) => handleUpdateDataset(dsIndex, { pointRadius: parseInt(e.target.value) })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-center justify-between pt-5">
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Preencher</span>
                          <button 
                            onClick={() => handleUpdateDataset(dsIndex, { fill: !ds.fill })}
                            className={`w-8 h-4 rounded-full relative transition-all ${ds.fill ? 'bg-indigo-500' : 'bg-slate-700'}`}
                          >
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${ds.fill ? 'left-[18px]' : 'left-[2px]'}`} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-black/10 rounded-xl border border-dashed border-white/5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
               <Database size={20} className="text-slate-600" />
            </div>
            <p className="text-xs text-slate-500 italic max-w-[200px]">Nenhuma série de dados configurada. Clique em "Add Série" para começar.</p>
          </div>
        )}
      </section>
    </div>
  );
}
