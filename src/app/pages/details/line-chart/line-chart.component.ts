import {Component, Input, OnInit} from '@angular/core';
import {Participation} from "../../../core/models/Participation";
import {ChartConfiguration} from "chart.js";
import {NgChartsModule} from "ng2-charts";
import {GlobalService} from "../../../core/services/global.service";

@Component({
  selector: 'app-line-chart',
  imports: [
    NgChartsModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {

  constructor(private globalService: GlobalService) {}

  @Input() participations!: Participation[];
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Médailles'
        },
        min: this.globalService.getMinNbMedals(),
        max: this.globalService.getMaxNbMedals(),
      },
      x: {
        title: {
          display: true,
          text: 'Années'
        }
      }
    }
  };

  ngOnInit(): void {
    this.generateChart();
  }

  generateChart(): void {
    const sorted = [...this.participations].sort((a, b) => a.year - b.year);
    this.lineChartData = {
      labels: sorted.map(p => p.year.toString()),
      datasets: [
        {
          label: 'Nombre de médailles',
          data: sorted.map(p => p.medalsCount),
          fill: false,
          borderColor: '#04838F',
          tension: 0.5,
          pointBackgroundColor: '#04838F'
        }
      ]
    };
  }

}
