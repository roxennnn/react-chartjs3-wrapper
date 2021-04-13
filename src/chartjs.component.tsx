import { Chart, Plugin } from 'chart.js';
import _uniqueId from 'lodash-es/uniqueId';
import React, { useEffect, useState } from 'react';
import { ChartProps, ExtendedChart, ICrosshairPluginOptions } from '../types';

const CROSSHAIR_DEFAULT = {
  strokeStyle: '#000000',
  lineWidth: 2,
  dashedSegments: [10],
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  startPoint: number[],
  endPoint: number[],
  options?: ICrosshairPluginOptions
): void => {
  ctx.save();
  ctx.beginPath();

  if (options?.dashed) {
    ctx.setLineDash(
      options?.dashedSegments
        ? options.dashedSegments
        : CROSSHAIR_DEFAULT.dashedSegments
    );
  }

  ctx.moveTo(startPoint[0], startPoint[1]);
  ctx.lineTo(endPoint[0], endPoint[1]);

  /* Options */
  if (options) {
    // Defaults
    ctx.lineWidth =
      options && options?.lineWidth
        ? options.lineWidth
        : CROSSHAIR_DEFAULT.lineWidth;
    ctx.strokeStyle =
      options && options?.strokeStyle
        ? options.strokeStyle
        : CROSSHAIR_DEFAULT.strokeStyle;

    // Others
    if (options?.fillStyle) {
      ctx.fillStyle = options.fillStyle;
    }
    if (options?.filter) {
      ctx.filter = options.filter;
    }
    if (options?.font) {
      ctx.font = options.font;
    }
    if (options?.globalAlpha) {
      ctx.globalAlpha = options.globalAlpha;
    }
    if (options?.globalCompositeOperation) {
      ctx.globalCompositeOperation = options.globalCompositeOperation;
    }
    if (options?.lineCap) {
      ctx.lineCap = options.lineCap;
    }
    if (options?.lineDashOffset) {
      ctx.lineDashOffset = options.lineDashOffset;
    }
    if (options?.lineJoin) {
      ctx.lineJoin = options.lineJoin;
    }
    if (options?.lineWidth) {
      ctx.lineWidth = options.lineWidth;
    }
    if (options?.miterLimit) {
      ctx.miterLimit = options.miterLimit;
    }
    if (options?.shadowBlur) {
      ctx.shadowBlur = options.shadowBlur;
    }
    if (options?.shadowColor) {
      ctx.shadowColor = options.shadowColor;
    }
    if (options?.shadowOffsetX) {
      ctx.shadowOffsetX = options.shadowOffsetX;
    }
    if (options?.shadowOffsetY) {
      ctx.shadowOffsetY = options.shadowOffsetY;
    }
    if (options?.strokeStyle) {
      ctx.strokeStyle = options.strokeStyle;
    }
  }

  ctx.stroke();
  ctx.restore();
};

/* Draw a vertical line when hovering in line charts */
const makeVerticalCrosshairPlugin = (
  options?: ICrosshairPluginOptions
): Plugin => ({
  id: 'verticalCrosshair',
  beforeDatasetsDraw: (chartInstance: ExtendedChart) => {
    if (chartInstance?.tooltip?._active?.length) {
      const activePoint = chartInstance?.tooltip?._active[0];
      const ctx: CanvasRenderingContext2D | null = chartInstance?.ctx;

      // draw line
      if (ctx && activePoint) {
        const x: number = activePoint?.element?.x;
        const topY: number = chartInstance?.chartArea?.top;
        const bottomY: number = chartInstance?.chartArea?.bottom;

        drawLine(ctx, [x, topY], [x, bottomY], options);
      }
    }
  },
});

/* Draw a horizontal line when hovering in line charts */
const makeHorizontalCrosshairPlugin = (
  options?: ICrosshairPluginOptions
): Plugin => ({
  id: 'horizontalCrosshair',
  beforeDatasetsDraw: (chartInstance: ExtendedChart) => {
    if (chartInstance?.tooltip?._active?.length) {
      const activePoint = chartInstance?.tooltip?._active[0];
      const ctx: CanvasRenderingContext2D | null = chartInstance?.ctx;

      // draw line
      if (ctx && activePoint) {
        const y: number = activePoint?.element?.y;
        const leftX: number = chartInstance?.chartArea?.left;
        const rightX: number = chartInstance?.chartArea?.right;

        drawLine(ctx, [leftX, y], [rightX, y], options);
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
    crosshairVerticalOptions,
    enableHorizontalCrosshair,
    crosshairHorizontalOptions,
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

    /* Plugins */
    const activePlugins: Plugin[] = [];
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
          chart.options = options;
        }
        chart.update();
      }
    }
  }, [chart, data, options, type]);

  return <canvas id={canvasId}></canvas>;
};
