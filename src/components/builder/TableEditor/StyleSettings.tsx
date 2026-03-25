import { LayoutGrid, Type, Settings, GripVertical, Bold, Italic } from 'lucide-react';
import { ColorInput } from '../ColorInput';

interface StyleSettingsProps {
  config: any;
  setConfig: (config: any) => void;
}

export function StyleSettings({ config, setConfig }: StyleSettingsProps) {
  const updateConfig = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-300 pb-10">
      {/* 1. Design Geral */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={18} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">Design Geral</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 text-[11px] uppercase tracking-wider">Variante base</label>
            <div className="flex gap-2">
              {['standard', 'secondary'].map(v => (
                <button 
                  key={v}
                  onClick={() => updateConfig('variant', v)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                    (config.variant || 'standard') === v 
                      ? 'bg-blue-500 border-blue-400 text-white shadow-lg' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {v === 'standard' ? 'Padrão' : 'Secundária'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 text-[11px] uppercase tracking-wider">Efeitos dinâmicos</label>
            <button 
              onClick={() => updateConfig('enableAlternateRows', !config.enableAlternateRows)}
              className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-between ${
                config.enableAlternateRows 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              Linhas Alternadas (Zebra)
              <div className={`w-8 h-4 rounded-full relative transition-colors ${config.enableAlternateRows ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.enableAlternateRows ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Cabeçalhos */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Type size={18} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">Cabeçalhos (Header)</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Header Principal</p>
            <div className="grid grid-cols-2 gap-4">
              <ColorInput 
                label="Fundo"
                value={config.headerBackgroundColor || ''}
                onChange={(val) => updateConfig('headerBackgroundColor', val)}
                labelClass="text-[10px] text-slate-500"
              />
              <ColorInput 
                label="Texto"
                value={config.headerTextColor || ''}
                onChange={(val) => updateConfig('headerTextColor', val)}
                labelClass="text-[10px] text-slate-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => updateConfig('headerBold', !config.headerBold)}
                className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.headerBold ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
              >
                <Bold size={12} /> Negrito
              </button>
              <button 
                onClick={() => updateConfig('headerItalic', !config.headerItalic)}
                className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.headerItalic ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
              >
                <Italic size={12} /> Itálico
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Header de Agrupamento</p>
            <div className="grid grid-cols-2 gap-4">
              <ColorInput 
                label="Fundo"
                value={config.groupHeaderBackgroundColor || ''}
                onChange={(val) => updateConfig('groupHeaderBackgroundColor', val)}
                labelClass="text-[10px] text-slate-500"
              />
              <ColorInput 
                label="Texto"
                value={config.groupHeaderTextColor || ''}
                onChange={(val) => updateConfig('groupHeaderTextColor', val)}
                labelClass="text-[10px] text-slate-500"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => updateConfig('groupHeaderBold', !config.groupHeaderBold)}
                className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.groupHeaderBold ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
              >
                <Bold size={12} /> Negrito
              </button>
              <button 
                onClick={() => updateConfig('groupHeaderItalic', !config.groupHeaderItalic)}
                className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.groupHeaderItalic ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
              >
                <Italic size={12} /> Itálico
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Corpo e Fontes */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={18} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">Corpo & Fontes</h3>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold">Tam. Fonte (Header)</label>
            <input 
              type="number" 
              value={config.fontSize || 8}
              onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))}
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold">Tam. Fonte (Corpo)</label>
            <input 
              type="number" 
              value={config.rowFontSize || 7}
              onChange={(e) => updateConfig('rowFontSize', parseInt(e.target.value))}
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
          <ColorInput 
            label="Fundo Padrão"
            value={config.rowBackgroundColor || ''}
            onChange={(val) => updateConfig('rowBackgroundColor', val)}
            labelClass="text-[10px] text-slate-500 uppercase font-bold"
          />
          <ColorInput 
            label="Fundo Zebra"
            value={config.alternateRowBackgroundColor || ''}
            onChange={(val) => updateConfig('alternateRowBackgroundColor', val)}
            labelClass="text-[10px] text-slate-500 uppercase font-bold"
          />
        </div>
      </section>

      {/* 4. Bordas e Dimensões */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={18} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">Bordas & Dimensões</h3>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold">Largura Tabela</label>
            <input 
              type="text" 
              value={config.tableWidth || '100%'}
              onChange={(e) => updateConfig('tableWidth', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
          <ColorInput 
            label="Cor da Borda"
            value={config.borderColor || ''}
            onChange={(val) => updateConfig('borderColor', val)}
            labelClass="text-[10px] text-slate-500 uppercase font-bold"
          />
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold">Espessura</label>
            <input 
              type="number" 
              step="0.1"
              value={config.borderWidth || 1}
              onChange={(e) => updateConfig('borderWidth', parseFloat(e.target.value))}
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold">Arredondamento</label>
            <input 
              type="number" 
              value={config.borderRadius || 4}
              onChange={(e) => updateConfig('borderRadius', parseInt(e.target.value))}
              className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* 5. Espaçamentos (Padding) */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <GripVertical size={18} className="text-blue-400" />
          <h3 className="text-lg font-bold text-white">Espaçamentos</h3>
        </div>

        <div className="grid grid-cols-4 gap-x-6 gap-y-8">
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Padding X Célula</label>
              <input 
                type="number" 
                value={config.cellPadding || 4}
                onChange={(e) => updateConfig('cellPadding', parseInt(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Padding Y Célula</label>
              <input 
                type="number" 
                value={config.cellPaddingY || 2}
                onChange={(e) => updateConfig('cellPaddingY', parseInt(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Margem Header</label>
              <input 
                type="number" 
                value={config.headerMarginBottom || 4}
                onChange={(e) => updateConfig('headerMarginBottom', parseInt(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
           </div>
           <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase font-bold">Margem Grupos</label>
              <input 
                type="number" 
                value={config.groupHeaderMarginBottom || 2}
                onChange={(e) => updateConfig('groupHeaderMarginBottom', parseInt(e.target.value))}
                className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
              />
           </div>
        </div>
      </section>
    </div>
  );
}
