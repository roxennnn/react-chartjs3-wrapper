import { Chart, Plugin } from 'chart.js';
import _uniqueId from 'lodash-es/uniqueId';
import React, { useEffect, useState } from 'react';
import {
  ChartProps,
  ExtendedChart,
  IVerticalCrosshairPluginOptions,
} from '../types';

const CROSSHAR_DEFAULT = {
  color: '#000000',
  lineWidth: 2,
};

/* Draw a vertical line when hovering in line charts */
const makeVerticalCrosshairPlugin = (
  options?: IVerticalCrosshairPluginOptions
): Plugin => ({
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
        ctx.lineWidth =
          options && options?.lineWidth
            ? options.lineWidth
            : CROSSHAR_DEFAULT.lineWidth;
        ctx.strokeStyle =
          options && options?.color ? options.color : CROSSHAR_DEFAULT.color;
        ctx.stroke();
        ctx.restore();
      }
    }
  },
});

export const ChartJsComponent = (props: ChartProps) => {
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
