import { StyleSheet, Image, View } from '@react-pdf/renderer';
import React from 'react';
import {
  Chart as ChartJS,
  ChartConfiguration,
  registerables,
  ChartData as ChartJSData,
  ChartOptions as ChartJSOptions,
} from 'chart.js';
import { createCanvas, CanvasRenderingContext2D } from 'canvas';

// Register all Chart.js components
ChartJS.register(...registerables);

// Type for Chart.js context in Node.js environment
interface ChartNodeContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

// ============================================
// Types
// ============================================

export type ChartBaseType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

export interface ChartDataset {
  label: string;
  data: number[];
  type?: 'bar' | 'line';
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  yAxisID?: string;
  /** Line chart options */
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  borderDash?: number[];
}

export interface ChartAxisConfig {
  display?: boolean;
  title?: string;
  min?: number;
  max?: number;
  position?: 'left' | 'right';
}

export interface ChartOptions {
  title?: string;
  titleColor?: string;
  titleFontSize?: number;
  legendDisplay?: boolean;
  legendFontSize?: number;
  tickFontSize?: number;
  /** Show/hide X axis line and labels */
  xAxisDisplay?: boolean;
  /** Show/hide Y axis line and labels */
  yAxisDisplay?: boolean;
  /** Show/hide all grid lines (backward compatibility) */
  gridDisplay?: boolean;
  /** Show/hide vertical grid lines (X axis) */
  gridXDisplay?: boolean;
  /** Show/hide horizontal grid lines (Y axis) */
  gridYDisplay?: boolean;
  gridColor?: string;
  /** Left Y-axis config */
  yAxis?: ChartAxisConfig;
  /** Right Y-axis config (for dual-axis) */
  yAxis1?: ChartAxisConfig;
}

export interface ChartConfig {
  type: ChartBaseType;
  width?: number;
  height?: number;
  widthPercent?: string;
  displayHeight?: number;
  options?: ChartOptions;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartProps {
  data: ChartData;
  config: ChartConfig;
  theme?: {
    primaryColor?: string;
    textPrimary?: string;
  };
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: '100%',
  },
});

// High-resolution scale factor
const SCALE_FACTOR = 2;

function renderChartToBase64(data: ChartData, config: ChartConfig, theme?: ChartProps['theme']): string {
  const width = config.width ?? 400;
  const height = config.height ?? 300;
  const options = config.options ?? {};

  // Create high-resolution canvas
  const canvas = createCanvas(width * SCALE_FACTOR, height * SCALE_FACTOR);
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE_FACTOR, SCALE_FACTOR);

  // Colors
  const primaryColor = theme?.primaryColor ?? '#FFCC00';
  const textColor = theme?.textPrimary ?? '#4A4A4A';
  const gridColor = options.gridColor ?? '#E5E5E5';

  // Font sizes
  const titleFontSize = options.titleFontSize ?? 14;
  const legendFontSize = options.legendFontSize ?? 11;
  const tickFontSize = options.tickFontSize ?? 10;

  // Check for dual-axis (second Y axis)
  const hasDualAxis = data.datasets.some(ds => ds.yAxisID === 'y1');

  // Check if any chart type uses scales (not pie/doughnut/radar)
  const usesScales = !['pie', 'doughnut', 'radar', 'polarArea'].includes(config.type);

  // Grid display logic: gridXDisplay/gridYDisplay override gridDisplay
  const showGridX = options.gridXDisplay ?? options.gridDisplay ?? false;
  const showGridY = options.gridYDisplay ?? options.gridDisplay ?? false;

  // Build datasets with proper configuration
  const datasets: ChartJSData['datasets'] = data.datasets.map((dataset, index) => {
    const isLine = dataset.type === 'line';
    const defaultColor = index === 0 ? primaryColor : '#1E3A5F';

    return {
      type: dataset.type ?? config.type,
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor ?? defaultColor,
      borderColor: dataset.borderColor ?? (isLine ? defaultColor : 'transparent'),
      borderWidth: isLine ? dataset.borderWidth ?? 2 : 0,
      yAxisID: dataset.yAxisID ?? 'y',
      // Line specific
      ...(isLine && {
        fill: dataset.fill ?? false,
        tension: dataset.tension ?? 0,
        pointRadius: dataset.pointRadius ?? 4,
        pointBackgroundColor: dataset.backgroundColor ?? defaultColor,
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        borderDash: dataset.borderDash,
      }),
      // Bar specific
      ...(!isLine && {
        borderRadius: 4,
      }),
    };
  });

  // Build scales configuration
  const scales: ChartJSOptions['scales'] = {};

  if (usesScales) {
    // X Axis
    scales.x = {
      display: options.xAxisDisplay ?? true,
      grid: {
        display: showGridX,
        color: gridColor,
      },
      ticks: {
        color: textColor,
        font: { size: tickFontSize },
      },
    };

    // Y Axis (left)
    scales.y = {
      display: options.yAxisDisplay ?? true,
      position: options.yAxis?.position ?? 'left',
      min: options.yAxis?.min,
      max: options.yAxis?.max,
      title: {
        display: !!options.yAxis?.title,
        text: options.yAxis?.title ?? '',
        color: textColor,
        font: { size: tickFontSize },
      },
      grid: {
        display: showGridY,
        color: gridColor,
      },
      ticks: {
        color: textColor,
        font: { size: tickFontSize },
      },
    };

    // Y1 Axis (right, for dual-axis charts)
    if (hasDualAxis) {
      scales.y1 = {
        display: options.yAxisDisplay ?? true,
        position: options.yAxis1?.position ?? 'right',
        min: options.yAxis1?.min,
        max: options.yAxis1?.max,
        title: {
          display: !!options.yAxis1?.title,
          text: options.yAxis1?.title ?? '',
          color: textColor,
          font: { size: tickFontSize },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: { size: tickFontSize },
        },
      };
    }
  }

  // Build complete Chart.js configuration
  const chartConfig: ChartConfiguration = {
    type: config.type === 'line' ? 'line' : 'bar', // Base type, datasets can override
    data: {
      labels: data.labels,
      datasets,
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        title: {
          display: !!options.title,
          text: options.title ?? '',
          color: options.titleColor ?? textColor,
          font: {
            size: titleFontSize,
            weight: 'bold',
          },
          padding: { bottom: 10 },
        },
        legend: {
          display: options.legendDisplay ?? true,
          position: 'top',
          align: 'center',
          labels: {
            color: textColor,
            font: { size: legendFontSize },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 15,
          },
        },
      },
      scales,
    },
  };

  // Create chart
  const chartNode = {
    canvas: canvas as unknown as HTMLCanvasElement, // Still need this since canvas package types don't match HTMLCanvasElement perfectly but Chart.js expects it
    ctx,
  };
  new ChartJS(chartNode as any, chartConfig);

  return canvas.toDataURL('image/png');
}

export default function Chart({ data, config, theme }: ChartProps) {
  const canvasWidth = config?.width ?? 400;
  const canvasHeight = config?.height ?? 300;
  const displayWidth = config?.widthPercent ?? '100%';
  const displayHeight = config?.displayHeight ?? canvasHeight * 0.75;

  const base64Image = renderChartToBase64(
    { ...data, datasets: (data?.datasets)?.map(ds => ({ ...ds, data: ds.data })) },
    { ...config, width: canvasWidth, height: canvasHeight },
    theme,
  );

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  return (
    <View style={containerStyle}>
      <Image src={base64Image} style={{ width: displayWidth, height: displayHeight }} />
    </View>
  );
}
