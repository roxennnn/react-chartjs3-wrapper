import {
  CanvasGradient,
  CanvasLineCap,
  CanvasLineJoin,
  CanvasPattern,
  Chart,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  Plugin,
} from 'chart.js';

export interface ICrosshairPluginOptions {
  fillStyle?: string | CanvasGradient | CanvasPattern;
  filter?: string;
  font?: string;
  globalAlpha?: number;
  globalCompositeOperation?: string;
  lineCap?: CanvasLineCap;
  lineDashOffset?: number;
  lineJoin?: CanvasLineJoin;
  lineWidth?: number;
  miterLimit?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  /* Custom */
  dashed?: boolean;
  dashedSegments?: number[];
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
  crosshairVerticalOptions?: ICrosshairPluginOptions;
  enableHorizontalCrosshair?: boolean;
  crosshairHorizontalOptions?: ICrosshairPluginOptions;
  transferChartImage: (data: string) => void;
  onmousemoveHandler?: (chart: Chart) => (mousemove: MouseEvent) => void;
  /* Other props */
  otherProps?: any;
}
