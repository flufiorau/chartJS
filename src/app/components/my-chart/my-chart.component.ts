import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets, ChartTooltipItem} from 'chart.js';
import {IWeather, WeatherService} from '../core/weather.service';

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {

  lineChart: Chart;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getWeatherData();
  }

  private getWeatherData() {
    this.weatherService.getDataFromWeatherServer().subscribe((weatherList: Array<IWeather>) => {
      this.canvasRendering(weatherList);
    });
  }

  private canvasRendering(weatherList: Array<IWeather>) {
    const canvas: any = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    const datasets: Array<ChartDataSets> = [];
    const gridLinesColors: Array<string> = [undefined];
    for (const i of weatherList) {
      const colorGradientFill = ctx.createLinearGradient(0, 50, 0, 180);
      colorGradientFill.addColorStop(0, `rgba(${i.color.red}, ${i.color.green}, ${i.color.blue}, 0.9)`);
      colorGradientFill.addColorStop(1, `rgba(${i.color.red}, ${i.color.green}, ${i.color.blue}, 0.1)`);
      gridLinesColors.push(`rgba(${i.color.red}, ${i.color.green}, ${i.color.blue}`);
      datasets.push(
        {
          data: [undefined, ...i.temperatureByDate],
          borderColor: `rgba(${i.color.red}, ${i.color.green}, ${i.color.blue}`,
          pointRadius: 4,
          pointBackgroundColor: '#ffffff',
          pointHoverRadius: 6,
          pointHitRadius: 8,
          pointBorderWidth: 2,
          backgroundColor: colorGradientFill,
          lineTension: 0,
        }
      );
    }

    this.lineChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [
          [], ['Jun 22', '08:07'], ['Jun 22', '10:58'], ['Jun 28', '17:12'], ['Jul 6', '13:31'],
          ['Jul 13', '19:30'], ['Jul 14', '14:43'], ['Jul 20', '08:39'], ['Jul 21', '09:07'], []],
        datasets
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                borderDash: [5, 5],
                drawBorder: false,
                color: gridLinesColors
              },
              scaleLabel: {
                display: true,
                labelString: 'Range of Motion (degrees)',
              },
              ticks: {
                min: 60,
                max: 180,
                stepSize: 20,
                callback(value) {
                  return `${value}°`;
                }
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date',
              }
            },
          ]
        },
        tooltips: {
          position: 'average',
          mode: 'single',
          borderColor: '#3cba9f',
          backgroundColor: '#3cba9f',
          callbacks: {
            title(item: ChartTooltipItem[]) {
              return `${item[0].value}°`;
            },
            label() {
              return undefined;
            },
          },
          titleAlign: 'center',
          bodyAlign: 'center'
        },
      }
    });

  }

}
