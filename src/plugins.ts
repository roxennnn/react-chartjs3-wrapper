import { Plugin } from 'chart.js';
import { ExtendedChart, ICrosshairPluginOptions } from '../types';

export const underLinePlugin = {
    id: 'underline',
    afterDraw: (chart: any, _args: any, opts: any) => {
        const { ctx } = chart;

        ctx.save();
        chart?.scales?.r?._pointLabelItems?.forEach((labelItem: any) => {
            ctx.strokeStyle = opts?.lineColor || 'blue';
            ctx.lineWidth = opts?.lineWidth || 1;

            ctx.beginPath();
            ctx.moveTo(labelItem?.left, labelItem?.bottom + (opts?.yOffset || 0));
            ctx.lineTo(labelItem?.right, labelItem?.bottom + (opts?.yOffset || 0));
            ctx.stroke();
        });
        ctx.restore();
    },
};

/***************************************
 *               CROSSHAIR             *
 ***************************************/
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
            ctx.globalCompositeOperation = options.globalCompositeOperation as any;
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

/* Draw a horizontal line when hovering in line charts */
export const makeHorizontalCrosshairPlugin = (
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

/* Draw a vertical line when hovering in line charts */
export const makeVerticalCrosshairPlugin = (
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
