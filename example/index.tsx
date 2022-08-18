import { ChartOptions } from 'chart.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChartJsComponent, conditionalRegistration } from '../.';

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 15, 20, 5, 11],
      fill: false,
      backgroundColor: 'orange',
      borderColor: 'orange',
    },
  ],
};

const options: ChartOptions = {
  maintainAspectRatio: false,
  hover: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      enabled: true,
      usePointStyle: true,
      mode: 'index',
      position: 'average',
      intersect: false,
      caretPadding: 20, // Distance from the point
    },
  },
};

const App = () => {
  React.useEffect(() => {
    conditionalRegistration({
      line: true,
      legend: true,
      title: true,
    });
  }, []);

  return (
    <div style={{ width: 400, height: 400 }}>
      <ChartJsComponent
        type="line"
        data={data}
        options={options}
        enableVerticalCrosshair={true}
        enableHorizontalCrosshair={true}
        crosshairVerticalOptions={{
          dashed: true,
        }}
        crosshairHorizontalOptions={{
          dashed: true,
        }}
        transferChartImage={(data: any) => {}} // TODO
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
