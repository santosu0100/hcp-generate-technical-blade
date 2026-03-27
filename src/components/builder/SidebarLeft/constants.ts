import { ComponentType } from '@/types/components.dto';
import { ComponentCategory } from '@/components/pdf/render/types';

export const COMPONENT_LIST: { type: ComponentType, icon: string, label: string, desc: string, category: ComponentCategory }[] = [
  // Layout Estrutural
  { type: 'brand' as ComponentType, icon: '🎨', label: 'Logo Originadora', desc: 'Logotipo / Assinatura (Topo)', category: ComponentCategory.LAYOUT },
  { type: 'box-group' as ComponentType, icon: '📦', label: 'Grupo de Blocos', desc: 'Agrupador de componentes (Grid)', category: ComponentCategory.LAYOUT },
  { type: 'page-break' as ComponentType, icon: '✂️', label: 'Quebra de Página', desc: 'Força o pulo de página', category: ComponentCategory.LAYOUT },
  { type: 'footer' as ComponentType, icon: '🦶', label: 'Rodapé', desc: 'Fechamento da página/documento', category: ComponentCategory.LAYOUT },
  { type: 'section' as ComponentType, icon: '🗂️', label: 'Seção', desc: 'Bloco de conteúdo com Título', category: ComponentCategory.LAYOUT },
  { type: 'sidebar' as ComponentType, icon: '🗄️', label: 'Barra Lateral', desc: 'Barra lateral de Destaques', category: ComponentCategory.LAYOUT },

  // Componentes Principais
  { type: 'action-button' as ComponentType, icon: '🔘', label: 'Botão de Ação', desc: 'Call-to-action clicável', category: ComponentCategory.COMPONENTS },
  { type: 'card' as ComponentType, icon: '⭐️', label: 'Cartão', desc: 'Placar/Card de Valores', category: ComponentCategory.COMPONENTS },
  { type: 'ordered-description' as ComponentType, icon: '⏱️', label: 'Descrição Ordenada', desc: 'Etapas passo a passo (Linha do Tempo)', category: ComponentCategory.COMPONENTS },
  { type: 'link' as ComponentType, icon: '🔗', label: 'Link', desc: 'Texto clicável (URL)', category: ComponentCategory.COMPONENTS },
  { type: 'marker-list' as ComponentType, icon: '📌', label: 'Lista com Marcadores', desc: 'Tópicos com ícones redondos', category: ComponentCategory.COMPONENTS },
  { type: 'arrow-list' as ComponentType, icon: '➔', label: 'Lista com Setas', desc: 'Tópicos com setas', category: ComponentCategory.COMPONENTS },
  { type: 'bullet-list' as ComponentType, icon: '•', label: 'Lista de Pontos', desc: 'Tópicos de Rótulo e Valores', category: ComponentCategory.COMPONENTS },
  { type: 'ordered-list' as ComponentType, icon: '1.' as ComponentType, label: 'Lista Numerada', desc: 'Lista de passos numerados', category: ComponentCategory.COMPONENTS },
  { type: 'big-int' as ComponentType, icon: '🔢', label: 'Número em Destaque', desc: 'Dado de alto impacto (ex. 21%)', category: ComponentCategory.COMPONENTS },
  { type: 'label-value' as ComponentType, icon: '🏷️', label: 'Rótulo e Valor', desc: 'Par de chave-valor pequeno', category: ComponentCategory.COMPONENTS },
  { type: 'table' as ComponentType, icon: '📊', label: 'Tabela', desc: 'Grade de dados estruturada', category: ComponentCategory.COMPONENTS },
  { type: 'text' as ComponentType, icon: '📝', label: 'Texto', desc: 'Texto simples ou longo', category: ComponentCategory.COMPONENTS },
  { type: 'title-description' as ComponentType, icon: 'Aa', label: 'Título e Descrição', desc: 'Bloco de texto com links', category: ComponentCategory.COMPONENTS },
  { type: 'chart' as ComponentType, icon: '📈', label: 'Gráfico', desc: 'Gráficos de barra, linha, pizza, etc.', category: ComponentCategory.COMPONENTS },
  { type: 'image-view' as ComponentType, icon: '🖼️', label: 'Imagem', desc: 'Exibe uma imagem a partir de uma URL', category: ComponentCategory.COMPONENTS },
].sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'));
