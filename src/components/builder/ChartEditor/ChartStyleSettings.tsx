import React from 'react';
import { ChartConfig, ChartType, ChartOptions, ChartAxisConfig } from '@/types/components.dto';
import { PropertyField } from '../SidebarRight/PropertyBase';

interface ChartStyleSettingsProps {
  config: ChartConfig;
  onUpdate: (config: ChartConfig) => void;
}

export function ChartStyleSettings({ config, onUpdate }: ChartStyleSettingsProps) {
  const options = config.options || {};

  const handleUpdateOptions = (updates: Partial<ChartOptions>) => {
    onUpdate({
      ...config,
      options: { ...options, ...updates }
    });
  };

  const handleUpdateAxis = (axisKey: 'yAxis' | 'yAxis1', updates: Partial<ChartAxisConfig>) => {
    onUpdate({
      ...config,
      options: {
        ...options,
        [axisKey]: { ...(options[axisKey] || {}), ...updates }
      }
    });
  };

  const chartTypes: { value: ChartType; label: string; icon: string }[] = [
    { value: 'bar', label: 'Barras', icon: '📊' },
    { value: 'line', label: 'Linhas', icon: '📈' },
    { value: 'pie', label: 'Pizza', icon: '🍕' },
    { value: 'doughnut', label: 'Rosca', icon: '🍩' },
    { value: 'radar', label: 'Radar', icon: '🕸️' },
    { value: 'polarArea', label: 'Área Polar', icon: '❄️' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Chart Type Selector */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tipo de Gráfico</h3>
        <div className="grid grid-cols-3 gap-2">
          {chartTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onUpdate({ ...config, type: type.value })}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                config.type === type.value 
                  ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{type.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">{type.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Global Style Section */}
      <section className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
        <h3 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Dimensões & Legenda</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <PropertyField 
              label="Largura (%)" 
              value={config.widthPercent?.replace('%', '')} 
              onChange={(val) => onUpdate({ ...config, widthPercent: `${val}%` })}
              type="number"
              placeholder="100"
            />
            <PropertyField 
              label="Altura (px)" 
              value={config.displayHeight} 
              onChange={(val) => onUpdate({ ...config, displayHeight: Number(val) })}
              type="number"
              placeholder="200"
            />
          </div>
          <PropertyField 
            label="Título do Gráfico" 
            value={options.title} 
            onChange={(val) => handleUpdateOptions({ title: val as string })}
            placeholder="Ex: Evolução de Vendas"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <PropertyField 
              label="Cor do Título" 
              value={options.titleColor} 
              onChange={(val) => handleUpdateOptions({ titleColor: val as string })}
              type="color"
            />
            <PropertyField 
              label="Tamanho Fonte" 
              value={options.titleFontSize} 
              onChange={(val) => handleUpdateOptions({ titleFontSize: val as number })}
              type="number"
              placeholder="14"
            />
          </div>

          <div className="pt-2 flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider block">Exibir Legenda</span>
              <span className="text-[9px] text-slate-500 italic">Identificação das séries</span>
            </div>
            <div className="flex items-center gap-4">
              {options.legendDisplay !== false && (
                <div className="w-20">
                  <PropertyField 
                    label="Tam. Fonte" 
                    value={options.legendFontSize} 
                    onChange={(val) => handleUpdateOptions({ legendFontSize: val as number })}
                    type="number"
                    placeholder="11"
                  />
                </div>
              )}
              <button 
                onClick={() => handleUpdateOptions({ legendDisplay: !options.legendDisplay })}
                className={`w-10 h-5 rounded-full relative transition-all ${options.legendDisplay !== false ? 'bg-blue-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${options.legendDisplay !== false ? 'left-[24px]' : 'left-[4px]'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Axes Style Section */}
      <section className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
        <h3 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Eixos e Grade</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <PropertyField 
              label="Tamanho Fonte Eixos" 
              value={options.tickFontSize} 
              onChange={(val) => handleUpdateOptions({ tickFontSize: val as number })}
              type="number"
              placeholder="10"
            />
            <PropertyField 
              label="Cor da Grade" 
              value={options.gridColor} 
              onChange={(val) => handleUpdateOptions({ gridColor: val as string })}
              type="color"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 border-t border-white/5 pt-4">
             <div className="flex items-center justify-between py-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Eixo X (Labels)</span>
                <button 
                  onClick={() => handleUpdateOptions({ xAxisDisplay: !options.xAxisDisplay })}
                  className={`w-8 h-4 rounded-full relative transition-all ${options.xAxisDisplay !== false ? 'bg-blue-500/50' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${options.xAxisDisplay !== false ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
             </div>
             <div className="flex items-center justify-between py-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Eixo Y (Valores)</span>
                <button 
                  onClick={() => handleUpdateOptions({ yAxisDisplay: !options.yAxisDisplay })}
                  className={`w-8 h-4 rounded-full relative transition-all ${options.yAxisDisplay !== false ? 'bg-blue-500/50' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${options.yAxisDisplay !== false ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
             </div>
              <div className="flex items-center justify-between py-2 col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Grade Vertical (X)</span>
                <button 
                  onClick={() => handleUpdateOptions({ gridXDisplay: !options.gridXDisplay })}
                  className={`w-8 h-4 rounded-full relative transition-all ${options.gridXDisplay !== false ? 'bg-blue-500/50' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${options.gridXDisplay !== false ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2 col-span-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Grade Horiz. (Y)</span>
                <button 
                  onClick={() => handleUpdateOptions({ gridYDisplay: !options.gridYDisplay })}
                  className={`w-8 h-4 rounded-full relative transition-all ${options.gridYDisplay !== false ? 'bg-blue-500/50' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${options.gridYDisplay !== false ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2 col-span-2 border-t border-white/5 mt-1 pt-3">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Exibir Todas as Grades</span>
                <button 
                  onClick={() => handleUpdateOptions({ gridDisplay: !options.gridDisplay })}
                  className={`w-8 h-4 rounded-full relative transition-all ${options.gridDisplay !== false ? 'bg-blue-500/50' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${options.gridDisplay !== false ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
              </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-3 bg-black/20 rounded-lg border border-white/5 space-y-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Config Principal (Y)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <PropertyField 
                  label="Título Eixo" 
                  value={options.yAxis?.title} 
                  onChange={(val) => handleUpdateAxis('yAxis', { title: val as string })}
                  placeholder="Ex: R$"
                />
                <div className="grid grid-cols-2 gap-2">
                  <PropertyField 
                    label="Min" 
                    value={options.yAxis?.min} 
                    onChange={(val) => handleUpdateAxis('yAxis', { min: val as number })}
                    type="number"
                  />
                  <PropertyField 
                    label="Max" 
                    value={options.yAxis?.max} 
                    onChange={(val) => handleUpdateAxis('yAxis', { max: val as number })}
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/20 rounded-lg border border-white/5 space-y-3 opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Config Secundária (Y1)
              </span>
              <div className="grid grid-cols-2 gap-3">
                <PropertyField 
                  label="Título Eixo" 
                  value={options.yAxis1?.title} 
                  onChange={(val) => handleUpdateAxis('yAxis1', { title: val as string })}
                  placeholder="Ex: %"
                />
                <div className="grid grid-cols-2 gap-2">
                  <PropertyField 
                    label="Min" 
                    value={options.yAxis1?.min} 
                    onChange={(val) => handleUpdateAxis('yAxis1', { min: val as number })}
                    type="number"
                  />
                  <PropertyField 
                    label="Max" 
                    value={options.yAxis1?.max} 
                    onChange={(val) => handleUpdateAxis('yAxis1', { max: val as number })}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
