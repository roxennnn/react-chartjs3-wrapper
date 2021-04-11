// Generally speaking for a chart you need its controller so linecontroller for line chart,
// piecontroller for pie chart etc. You need the element so a lineElement and pointElement
// for line or radar chart, arcElement for pie, doughnut of polar area chart and barElement for bar.
// And then you need to import the supplied plugins for the title, filler (for area charts)
// legend and the tooltip

import * as ChartJs from 'chart.js';
import { IRegistrationConfig } from '../types';

const REGISTRABLES_FIELDS = [
  'line',
  'bar',
  'pie',
  'bubble',
  'doughnut',
  'polarArea',
  'radar',
  'scatter',
  'legend',
  'tooltip',
  'title',
  'filler',
  'decimation',
];
const REGISTRABLES_CONFIG_MAP: { [type: string]: string[] } = {
  /* Charts */
  line: [
    'LineController',
    'LineElement',
    'PointElement',
    'LinearScale',
    'CategoryScale',
  ],
  bar: [
    'BarController',
    'BarElement',
    'PointElement',
    'LinearScale',
    'CategoryScale',
  ],
  pie: ['PieController', 'ArcElement'],
  bubble: ['BubbleController', 'LinearScale', 'PointElement'],
  doughnut: ['DoughnutController', 'ArcElement'],
  polarArea: ['PolarAreaController', 'RadialLinearScale'],
  radar: [
    'RadarController',
    'RadialLinearScale',
    'PointElement',
    'LineElement',
  ],
  scatter: ['ScatterController', 'LinearScale', 'PointElement', 'LineElement'],

  /* Accessories */
  legend: ['Legend'],
  tooltip: ['Tooltip'],
  title: ['Title'],
  filler: ['Filler'],
  decimation: ['Decimation'],
};
const REGISTRABLES_MAP = new Map<string, ChartJs.ChartComponentLike>([
  ['ArcElement', ChartJs.ArcElement],
  ['LineElement', ChartJs.LineElement],
  ['BarElement', ChartJs.BarElement],
  ['PointElement', ChartJs.PointElement],
  ['BarController', ChartJs.BarController],
  ['BubbleController', ChartJs.BubbleController],
  ['DoughnutController', ChartJs.DoughnutController],
  ['LineController', ChartJs.LineController],
  ['PieController', ChartJs.PieController],
  ['PolarAreaController', ChartJs.PolarAreaController],
  ['RadarController', ChartJs.RadarController],
  ['ScatterController', ChartJs.ScatterController],
  ['CategoryScale', ChartJs.CategoryScale],
  ['LinearScale', ChartJs.LinearScale],
  ['LogarithmicScale', ChartJs.LogarithmicScale],
  ['RadialLinearScale', ChartJs.RadialLinearScale],
  ['TimeScale', ChartJs.TimeScale],
  ['TimeSeriesScale', ChartJs.TimeSeriesScale],
  // ['Decimation', ChartJs.Decimation],
  ['Filler', ChartJs.Filler],
  ['Legend', ChartJs.Legend],
  ['Title', ChartJs.Title],
  ['Tooltip', ChartJs.Tooltip],
]);

/* No tree-shakeable */
export const registerAll = (): void =>
  ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter(
      (chartClass: any) => chartClass.id
    ) as ChartJs.ChartComponentLike[]
  );

export const customRegister = (
  ...toRegister: ChartJs.ChartComponentLike[]
): void => ChartJs.Chart.register(...toRegister);

export const conditionalRegistration = (config: IRegistrationConfig): void => {
  /* Get names of necessary registrables */
  const toBeRegistered: string[] = [];
  REGISTRABLES_FIELDS.forEach((e: string) => {
    if (config && config[e as keyof IRegistrationConfig])
      toBeRegistered.push(...REGISTRABLES_CONFIG_MAP[e]);
  });
  const uniqueToBeRegistered: string[] = toBeRegistered.filter(
    (x: string, i: number, a: string[]) => a.indexOf(x) === i
  );

  /* Register */
  ChartJs.Chart.register(
    uniqueToBeRegistered
      .map((e: string) => REGISTRABLES_MAP.get(e) as ChartJs.ChartComponent)
      .concat(config?.others ? config.others : [])
  );
};
