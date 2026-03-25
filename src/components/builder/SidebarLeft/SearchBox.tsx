import { Search } from 'lucide-react';

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="p-4 border-b border-white/10 relative flex items-center bg-black/10 shrink-0">
      <Search size={16} className="absolute left-7 text-slate-400" />
      <input 
        type="text" 
        placeholder="Pesquisar componentes..." 
        className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pr-3 pl-9 text-slate-100 text-sm outline-none transition focus:border-blue-500 focus:bg-white/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
