import { ChartOptions, Filler, PieController } from 'chart.js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChartJsComponent, conditionalRegistration } from '../.';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options: ChartOptions = {
  plugins: {
    tooltip: {
      caretPadding: 100,
    },
  },
};

const App = () => {
  React.useEffect(() => {
    conditionalRegistration({
      line: true,
      legend: true,
      title: true,
      others: [PieController, Filler],
    });
  }, []);
  return (
    <div>
      <ChartJsComponent
        type="line"
        data={data}
        options={options}
        enableVerticalCrosshair={true}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
