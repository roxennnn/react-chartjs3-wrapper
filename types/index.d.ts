import {
  Chart,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  Plugin,
} from 'chart.js';

export interface IVerticalCrosshairPluginOptions {
  color?: string;
  lineWidth?: number;
}

// The chart interface misses some properties; this interface is used to add the needed missing properties
export interface ExtendedChart extends Chart {
  tooltip: any;
  legend: any;
}

export interface ChartProps {
  type: keyof ChartTypeRegistry;
  data?: ChartData;
  options?: ChartOptions;
  plugins?: Plugin[];
  /* Enable library plugins */
  enableVerticalCrosshair?: boolean;
  crosshairOptions?: IVerticalCrosshairPluginOptions;
}
