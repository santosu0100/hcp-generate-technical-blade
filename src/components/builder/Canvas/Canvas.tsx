import { useState } from 'react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { OperationTechnicalBladeDocument } from '@/components/pdf/render/OperationTechnicalBladeDocument';
import { PDFViewer } from '@react-pdf/renderer';
import { CanvasTabs } from './CanvasTabs';
import { ZoneDropArea } from './ZoneDropArea';
import { JsonPayloadViewer } from './JsonPayloadViewer';

export function Canvas() {
  const { rootComponents, getPayload } = usePdfBuilder();
  const [activeTab, setActiveTab] = useState<'builder'|'preview'|'json'>('builder');

  const payload = getPayload();

  const brand = rootComponents.filter(c => c.dto.type === 'brand');
  const sidebar = rootComponents.filter(c => c.dto.type === 'sidebar');
  const footer = rootComponents.filter(c => c.dto.type === 'footer');
  const main = rootComponents.filter(c => !['brand', 'sidebar', 'footer'].includes(c.dto.type));

  const hasLeftSidebar = sidebar.some(c => (c.dto as any).config?.position !== 'right');
  const hasRightSidebar = sidebar.some(c => (c.dto as any).config?.position === 'right');
  const noSidebar = sidebar.length === 0;

  return (
    <div className="flex flex-col h-full bg-slate-900/40">
      <CanvasTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {activeTab === 'builder' && (
          <div className="bg-white w-full max-w-4xl mx-auto rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col min-h-[842px] p-8 gap-6 text-slate-800 shrink-0 mb-10">
            <ZoneDropArea 
              title="Arraste o LOGO (Brand) aqui" 
              currentNodes={brand} 
              onDropType={(type) => type === 'brand'} 
            />
            
            <div className="flex flex-1 gap-6 min-h-[450px]">
              {(noSidebar || hasLeftSidebar) && (
                <ZoneDropArea 
                  title="Sidebar Esquerda" 
                  className={`shrink-0 transition-all ${hasLeftSidebar ? 'w-[260px]' : 'w-[120px]'}`}
                  currentNodes={sidebar.filter(c => (c.dto as any).config?.position !== 'right')} 
                  onDropType={(type) => type === 'sidebar'} 
                  initialConfig={{ position: 'left' }}
                />
              )}
              
              <ZoneDropArea 
                title="Conteúdo Principal (Seções, Textos, Cartões...)" 
                className="flex-1 min-w-[300px]"
                currentNodes={main} 
                onDropType={(type) => !['brand', 'sidebar', 'footer'].includes(type)} 
              />
              
              {(noSidebar || hasRightSidebar) && (
                <ZoneDropArea 
                  title="Sidebar Direita" 
                  className={`shrink-0 transition-all ${hasRightSidebar ? 'w-[260px]' : 'w-[120px]'}`}
                  currentNodes={sidebar.filter(c => (c.dto as any).config?.position === 'right')} 
                  onDropType={(type) => type === 'sidebar'} 
                  initialConfig={{ position: 'right' }}
                />
              )}
            </div>

            <ZoneDropArea 
              title="Arraste o RODAPÉ (Footer) aqui" 
              currentNodes={footer} 
              onDropType={(type) => type === 'footer'} 
            />
          </div>
        )}

        {activeTab === 'preview' && (
           <div className="w-full h-full min-h-[800px] bg-white rounded-lg overflow-hidden shadow-2xl">
             <PDFViewer width="100%" height="100%" className="border-none">
               <OperationTechnicalBladeDocument fields={payload} />
             </PDFViewer>
           </div>
        )}

        {activeTab === 'json' && (
          <JsonPayloadViewer payload={payload} />
        )}
      </div>
    </div>
  );
}
