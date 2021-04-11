import { Chart, ChartTypeRegistry, Plugin } from 'chart.js';
import { AnyObject } from 'chart.js/types/basic';
import _uniqueId from 'lodash/uniqueId';
import React, { useEffect, useState } from 'react';
import {
  ChartProps,
  ExtendedChart,
  IVerticalCrosshairPluginOptions,
} from '../types';

/* Draw a vertical line when hovering in line charts */
const makeVerticalCrosshairPlugin = (
  options?: IVerticalCrosshairPluginOptions
): Plugin<keyof ChartTypeRegistry, AnyObject> => ({
  id: 'verticalCrosshair',
  beforeDatasetsDraw: (chartInstance: ExtendedChart) => {
    if (chartInstance?.tooltip?._active?.length) {
      const activePoint = chartInstance?.tooltip?._active[0];
      const ctx: CanvasRenderingContext2D | null = chartInstance?.ctx;

      // draw line
      if (ctx && activePoint) {
        const x: number = activePoint?.element?.x;
        const topY: number = chartInstance?.legend?.bottom;
        const bottomY: number = chartInstance?.chartArea?.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = options && options?.lineWidth ? options.lineWidth : 2;
        ctx.strokeStyle = options && options?.color ? options.color : '#000000';
        ctx.stroke();
        ctx.restore();
      }
    }
  },
});

export const ChartComponent = (props: ChartProps) => {
  const {
    type,
    data,
    options,
    plugins,
    enableVerticalCrosshair,
    crosshairOptions,
  } = props;

  /* Create random canvasId */
  // id will be set once when the component initially renders, but never again
  // (unless you assigned and called the second argument of the tuple)
  const [canvasId] = useState(_uniqueId('canvas-chartjs-'));

  /* Create Chart Object */
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    const useVerticalCrosshair: boolean =
      type === 'line' && !!enableVerticalCrosshair;

    const ctx = document.getElementById(canvasId);
    const newChart = new Chart(ctx as HTMLCanvasElement, {
      type: type,
      data: {
        datasets: [],
      },
      plugins: (useVerticalCrosshair
        ? [makeVerticalCrosshairPlugin(crosshairOptions)]
        : []
      ).concat(!!plugins ? plugins : []),
    });
    setChart(newChart);
  }, [
    type,
    canvasId,
    plugins,
    plugins,
    enableVerticalCrosshair,
    crosshairOptions,
  ]);

  /* Update Chart Object */
  useEffect(() => {
    if (data) {
      if (chart) {
        chart.data = data;
        if (options) {
          chart.options = options;
        }
        chart.update();
      }
    }
  }, [chart, data, options, type]);

  return <canvas id={canvasId}></canvas>;
};

/***************************************
 *             Registrations           *
 ***************************************/
// Generally speaking for a chart you need its controller so linecontroller for line chart,
// piecontroller for pie chart etc. You need the element so a lineElement and pointElement
// for line or radar chart, arcElement for pie, doughnut of polar area chart and barElement for bar.
// And then you need to import the supplied plugins for the title, filler (for area charts)
// legend and the tooltip

/* No tree-shakeable */
// export const registerAll = (): void => Chart.register(...registerables);

// export const customRegister = (...toRegister: ChartComponentLike[]): void =>
//   Chart.register(...toRegister);

/* From type declarations */
// export { IVerticalCrosshairPluginOptions, ExtendedChart };
