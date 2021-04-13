<p align="center">
  Just a simple wrapper React component for <a href="https://github.com/chartjs/Chart.js">Chart.js</a> 3.
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/react-chartjs3-wrapper">
  <img alt="GitHub" src="https://img.shields.io/github/license/roxennnn/react-chartjs3-wrapper">
</p>

## Installation
```npm
npm i react-chartjs3-wrapper
```

## Usage
The following shows how to create a React Chart.js 3 component.
```tsx
import React from 'react';
import { ChartJsComponent, conditionalRegistration } from 'react-chartjs3-wrapper';

const MyComponent = () => {
  useEffect(() => {
    conditionalRegistration({
      line: true,
      title: true,
      legend: true
    })
  }, [])
  return (
    <div>
      <ChartJsComponent
        type="line"
        data={data}
        options={options}
      />
    </div>
  );
};
```

## Documentation
### Component
The `ChartJsComponent` is a simple component which wraps a Chart.js chart. The available props are:
* `type`: the type of the chart (`line`, `bar`, `pie`, ...)
* `data`: the data to be displayed in the chart (it must be a Chart.js `ChartData` object)
* `options`: the chart options: (it must be a Chart.js `ChartOptions` object)
* `plugins`: the plugins used by the chart (it must be a Chart.js `Plugin` object array)

### Crosshairs
Moreover, there are 2 plugins which can be enabled through 2 props: the **Vertical Crosshair** and the **Horizontal Crosshair** plugins. The 2 props are `enableVerticalCrosshair` and `enableHorizonalCrosshair`. In order to customize these 2 plugins, the corresponding option props can be used (`crosshairVerticalOptions` and `crosshairHorizontalOptions` respectively). These objects mostly contains HTML canvas element options. The following are the properties present in the option objects:
```ts
dashed?: boolean;
dashedSegments?: number[]; // default: [10]
fillStyle?: string | CanvasGradient | CanvasPattern;
filter?: string;
font?: string;
globalAlpha?: number;
globalCompositeOperation?: string;
lineCap?: CanvasLineCap;
lineDashOffset?: number;
lineJoin?: CanvasLineJoin;
lineWidth?: number; // default: 2
miterLimit?: number;
shadowBlur?: number;
shadowColor?: string;
shadowOffsetX?: number;
shadowOffsetY?: number;
strokeStyle?: string | CanvasGradient | CanvasPattern; // default: #000000
```

### Registration
Being Chart.js 3 *tree-shakeable*, controllers, elements, scales and plugins to use are needed to be imported and registered. There are some functions to simplify these procedures:
* `registerAll`: to quickly register all the available items, however not making use of the *tree-shakeable* feature
* `conditionalRegistration`: a function which takes an object as argument, specifying which kind of chart and utilities are needed; the options are the following:
  * `bar`: enable bar charts
  * `bubble`: enable bubble charts
  * `doughnut`: enable doughnut charts 
  * `line`: enable line charts 
  * `polar`: enable polar charts 
  * `pie`: enable pie charts 
  * `radar`: enable radar charts 
  * `scatter`: enable scatter charts 
  * `filler`: enable area between two datasets or a dataset and a boundary
  * `legend`: enable chart legend
  * `title`: enable chart title
  * `tooltip`: enable chart tooltip
  * `others`: used to specify a list of available items to be specified not included in the previous options but needed (e.g.,  `TimeSeriesScale`) 

The registration functions should be called at the beginning of the component (e.g., inside the `useEffect` hook).

## Example
![example](./example/example.gif)

## License
[MIT](https://github.com/roxennnn/react-chartjs3-wrapper/blob/master/LICENSE)