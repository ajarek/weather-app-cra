import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export class ChartJS {
  constructor(data) {
    this.data = data;
    this.chart = null;
  }

  transformDataToChartJSData(data,property = 'temp') {
    return data && data.map((dataItem) => {
      return {
        x:dataItem &&  dataItem.date ,
        y:dataItem &&  dataItem[property],
      };
    });
  }

  render() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "rgba(234, 32, 39,0.3)",
            borderColor: "#EA2027",
            fill: true,
            data: this.transformDataToChartJSData(this.data, 'temp'),
          },
          {
            label: 'Feels like',
            backgroundColor: 'rgba(0, 0, 254, 0.3)',
            borderColor: '#0000FF',
            fill: true,
            data: this.transformDataToChartJSData(this.data, 'likely'),
        }
          
        ],
      },
      options: {
         scales: {
       
        },
      },
    });

    return canvas;
  }
}

