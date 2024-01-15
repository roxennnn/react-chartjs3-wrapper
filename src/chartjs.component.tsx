import { Chart, Plugin } from 'chart.js';
import 'chartjs-chart-geo';
import _uniqueId from 'lodash-es/uniqueId';
import React, { useEffect, useState } from 'react';
import { ChartProps } from '../types';
import {
  makeHorizontalCrosshairPlugin,
  makeVerticalCrosshairPlugin,
  underLinePlugin,
} from './plugins';

export const ChartJsComponent = ({
  type,
  data,
  options,
  plugins,
  enableVerticalCrosshair,
  crosshairVerticalOptions,
  enableHorizontalCrosshair,
  crosshairHorizontalOptions,
  transferChartImage,
  onmousemoveHandler,
  otherProps,
}: ChartProps) => {
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

    /* Plugins */
    const activePlugins: Plugin[] = [underLinePlugin];
    if (useVerticalCrosshair) {
      activePlugins.push(makeVerticalCrosshairPlugin(crosshairVerticalOptions));
    }
    if (enableHorizontalCrosshair) {
      activePlugins.push(
        makeHorizontalCrosshairPlugin(crosshairHorizontalOptions)
      );
    }
    if (plugins) {
      activePlugins.push(...plugins);
    }

    /* Create chart */
    const newChart = new Chart(ctx as HTMLCanvasElement, {
      type: type,
      data: {
        datasets: [],
      },
      plugins: activePlugins,
    });

    if (ctx && onmousemoveHandler) {
      ctx.onmousemove = onmousemoveHandler(newChart);
    }

    setChart(newChart);
  }, [
    type,
    canvasId,
    plugins,
    enableVerticalCrosshair,
    crosshairVerticalOptions,
    enableHorizontalCrosshair,
    crosshairHorizontalOptions,
  ]);

  /* Update Chart Object */
  useEffect(() => {
    if (data) {
      if (chart) {
        chart.data = data;
        if (options) {
          chart.options = {
            ...options,
            animation: {
              onComplete: () => {
                transferChartImage(chart.toBase64Image());
              },
            },
          };
        }
        chart.update();
      }
    }
  }, [chart, data, options, type]);

  return (
    <canvas
      id={canvasId}
      style={{ width: '100%', height: '100%' }}
      onClick={otherProps?.onClick}
    ></canvas>
  );
};
