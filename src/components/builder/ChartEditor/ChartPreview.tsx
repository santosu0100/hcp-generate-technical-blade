import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ChartConfiguration, registerables } from 'chart.js';
import { ChartData, ChartConfig } from '@/types/components.dto';

ChartJS.register(...registerables);

interface ChartPreviewProps {
  data: ChartData;
  config: ChartConfig;
}

export function ChartPreview({ data, config }: ChartPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const options = config.options || {};
    const usesScales = !['pie', 'doughnut', 'radar', 'polarArea'].includes(config.type);
    const hasDualAxis = data.datasets?.some(ds => ds.yAxisID === 'y1');

    const chartConfig: ChartConfiguration = {
      type: (config.type === 'line' ? 'line' : 'bar') as any,
      data: {
        labels: data.labels || [],
        datasets: (data.datasets || []).map((ds, index) => ({
          ...ds,
          type: (ds.type ?? config.type) as any,
          backgroundColor: ds.backgroundColor || (index === 0 ? '#3b82f6' : '#6366f1'),
          borderColor: ds.borderColor || (index === 0 ? '#3b82f6' : '#6366f1'),
          tension: ds.tension ?? 0.4,
          borderRadius: 4,
          yAxisID: ds.yAxisID || 'y',
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: {
          title: {
            display: !!options.title,
            text: options.title || '',
            color: options.titleColor || '#1e293b',
            font: { size: options.titleFontSize || 16, weight: 'bold' },
          },
          legend: {
            display: options.legendDisplay !== false,
            position: 'top',
            labels: {
              color: '#475569',
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 11 },
            },
          },
        },
        scales: usesScales ? {
          x: {
            display: options.xAxisDisplay !== false,
            grid: { display: options.gridDisplay === true, color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } },
          },
          y: {
            display: options.yAxisDisplay !== false,
            position: options.yAxis?.position || 'left',
            min: options.yAxis?.min,
            max: options.yAxis?.max,
            title: { display: !!options.yAxis?.title, text: options.yAxis?.title || '', color: '#475569' },
            grid: { display: options.gridDisplay !== false, color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#64748b', font: { size: 10 } },
          },
          ...(hasDualAxis ? {
             y1: {
                display: options.yAxisDisplay !== false,
                position: options.yAxis1?.position || 'right',
                min: options.yAxis1?.min,
                max: options.yAxis1?.max,
                title: { display: !!options.yAxis1?.title, text: options.yAxis1?.title || '', color: '#475569' },
                grid: { display: false },
                ticks: { color: '#64748b', font: { size: 10 } },
             }
          } : {})
        } : {},
      },
    };

    chartRef.current = new ChartJS(ctx, chartConfig);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, config]);

  return (
    <div className="w-full h-full min-h-[300px] bg-white rounded-2xl p-6 border border-slate-200 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/10 to-transparent" />
      
      <div className="w-full h-full relative z-10">
        <canvas ref={canvasRef} />
      </div>
      
      {(!data.datasets || data.datasets.length === 0) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/95 z-20">
          <p className="text-sm font-medium">Nenhum dado configurado</p>
          <p className="text-[10px] mt-1 italic">Adicione labels e séries para visualizar o gráfico</p>
        </div>
      )}
    </div>
  );
}
