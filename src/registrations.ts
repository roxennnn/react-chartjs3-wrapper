// Generally speaking for a chart you need its controller so linecontroller for line chart,
// piecontroller for pie chart etc. You need the element so a lineElement and pointElement
// for line or radar chart, arcElement for pie, doughnut of polar area chart and barElement for bar.
// And then you need to import the supplied plugins for the title, filler (for area charts)
// legend and the tooltip

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartComponentLike,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  registerables,
} from 'chart.js';

/* No tree-shakeable */
export const registerAll = (): void => Chart.register(...registerables);

export const customRegister = (...toRegister: ChartComponentLike[]): void =>
  Chart.register(...toRegister);

const COMMON_TO_REGISTER: ChartComponentLike[] = [
  PointElement,
  CategoryScale,
  LinearScale,
];

const LINE_TO_REGISTER: ChartComponentLike[] = [LineController, LineElement];

const BAR_TO_REGISTER: ChartComponentLike[] = [BarController, BarElement];

export const registerLine = (...toRegister: ChartComponentLike[]): void =>
  Chart.register(...COMMON_TO_REGISTER, ...LINE_TO_REGISTER, ...toRegister);

export const registerBar = (...toRegister: ChartComponentLike[]): void =>
  Chart.register(...COMMON_TO_REGISTER, ...BAR_TO_REGISTER, ...toRegister);
