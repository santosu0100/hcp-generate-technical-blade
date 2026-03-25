import React from 'react';
import { createPortal } from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { OperationTechnicalBladeDocument } from '../../components/pdf/render/operation-technical-blade-document';
import { ComponentType } from '../../types/pdf-components.types';

interface Props {
  type: ComponentType;
  onClose: () => void;
}

export function ComponentPreviewModal({ type, onClose }: Props) {
  const getDummyData = (t: ComponentType) => {
    switch(t) {
      case 'text': return { content: 'Este é um texto de exemplo formatado nativamente pela engine do PDF. Utilize para construir parágrafos e descrições longas nas suas seções. Ele suporta alinhamento, cores e tamanhos diversificados dinamicamente.' };
      case 'section': return { title: 'Visão Geral Estratégica' };
      case 'title-description': return { title: 'Rentabilidade', description: 'Até 20% ao ano prefixada no modelo padrão.', links: [{label: 'Saiba mais no site', href: 'https://hurst.capital'}] };
      case 'label-value': return { label: 'Período Estipulado', value: '12 meses' };
      case 'big-int': return { label: 'Ao ano', value: '21,00%' };
      case 'action-button': return { label: 'INVISTA AGORA', href: 'https://hurst.capital' };
      case 'link': return { label: 'Acesse os documentos legais clicando aqui.', href: 'https://hurst.capital' };
      case 'bullet-list': return { items: [{label: 'Volume Total', value: 'R$ 2.817.137,40'}, {label: 'Quantidade', value: '14.365'}, {label: 'Ticket Médio', value: 'R$ 300,00'}] };
      case 'arrow-list': return { items: [{title: 'Cenário Base', description: '7.500 vidas cadastradas com 1.000 usuários ativos.'}, {title: 'Projeção', description: 'Expectativa de 15.000 vidas até o fim do exercício.'}] };
      case 'ordered-list': return { items: [{title: 'Crie sua conta', description: 'Cadastre-se na plataforma em 5 minutos.'}, {title: 'Escolha a operação', description: 'Analise as oportunidades disponíveis.'}] };
      case 'marker-list': return { items: [{title: 'Rentabilidade', description: 'Retornos superiores ao CDI.'}, {title: 'Segurança', description: 'Proteção através de fundos.'}] };
      case 'timeline-ordered-description': return { items: [{title: 'Parceria e Cadastro', description: 'A empresa contrata a plataforma.'}, {title: 'Liquidação', description: 'Pagamento via PIX em segundos.'}] };
    }
    return {};
  };

  const getDummyChildren = (t: ComponentType) => {
    switch(t) {
      case 'highlight-card': return [
         { type: 'label-value', data: { label: 'Aporte', value: 'R$ 10.000,00' } },
         { type: 'big-int', data: { value: '21,00%', label: 'ao ano' }, config: { labelPosition: 'after' } }
      ] as any;
      case 'section': return [
         { type: 'text', data: { content: 'Conteúdo interno da seção demonstrativa para validar o espaçamento, a fonte e a margem entre o título superior e o texto base.' } }
      ] as any;
      case 'sidebar': return [
         { type: 'highlight-card', children: [
             { type: 'label-value', data: { label: 'Rentabilidade', value: 'Prefixada' } },
             { type: 'big-int', data: { value: '21,00%', label: 'ao ano' }, config: { labelPosition: 'after' } }
         ]}
      ] as any;
      case 'footer': return [
         { type: 'text', data: { content: 'Hurst Capital' } }
      ] as any;
    }
    return undefined;
  };

  // Force layout wrappers if needed so it doesn't break
  const isLayoutType = ['brand', 'sidebar', 'footer'].includes(type);
  const getPayload = () => {
     let rootComponents = [];
     if (isLayoutType) {
         rootComponents.push({ type, data: getDummyData(type), config: { position: 'left' }, children: getDummyChildren(type) });
         // add a dummy section so the page isn't empty otherwise sidebar takes no height
         if (type === 'sidebar') {
            rootComponents.push({ type: 'section', data: { title: 'Página de Exemplo' }, children: [{ type: 'text', data: { content: 'A barra lateral acompanha a altura do conteúdo.' } }]});
         }
     } else {
         // for regular components, wrap in a section for realistic layout!
         rootComponents.push({
            type: 'section',
            data: { title: `Preview: ${type}` },
            children: [{ type, data: getDummyData(type), config: {}, children: getDummyChildren(type) }]
         });
     }
     return { originator: 'hurst' as any, components: rootComponents as any[] };
  };

  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white w-[80%] max-w-[900px] h-[80vh] rounded-xl flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
           <h4 className="text-lg font-semibold text-slate-900 m-0">Visualização em Tempo Real: <code className="bg-slate-200 px-1 rounded text-blue-600">{type}</code></h4>
           <button className="text-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 rounded px-2 transition-colors focus:outline-none" onClick={onClose}>&times;</button>
        </div>
        <div className="flex-1 bg-slate-200 relative">
           <PDFViewer width="100%" height="100%" className="border-none">
             <OperationTechnicalBladeDocument fields={getPayload()} />
           </PDFViewer>
        </div>
      </div>
    </div>,
    document.body
  );
}
