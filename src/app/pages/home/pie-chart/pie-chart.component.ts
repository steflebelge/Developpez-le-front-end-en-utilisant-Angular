import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {Olympic} from "../../../core/models/Olympic";
import {ChartConfiguration, ChartEvent, ChartOptions, ChartType} from "chart.js";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pie-chart',
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  standalone: true,
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() olympics!: Olympic[];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  // Données du graphique vide
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: []
    }],
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          textAlign: 'center',
          padding: 10,
          font: {
            size: 15
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value} médailles`;
          }
        }
      }
    },
    onHover: (event, chartElement) => {
      if (this.chartCanvas?.nativeElement) {
        const pointOverSegment = chartElement.length > 0;
        this.chartCanvas.nativeElement.style.cursor = pointOverSegment ? 'pointer' : 'default';
      }
    }
  };
  countryIds: number[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['olympics'])
      this.updatePieChart();
  }

  updatePieChart() {
    const labels: string[] = [];
    const values: number[] = [];

    for (const olympicTmp of this.olympics) {
      labels.push(olympicTmp.country);
      const totalMedals = olympicTmp.participations.reduce(
        (sommeMedailles, participationTmp) =>
          sommeMedailles + participationTmp.medalsCount, 0
      );
      values.push(totalMedals);
      this.countryIds.push(olympicTmp.id);
    }

    this.pieChartData = {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#B21451', '#8e5ea2', '#3cba9f', '#46B214', "#141FB2"]
      }]
    };
  }

  onChartClick(event: { event?: ChartEvent, active?: {}[] }) {
    if (event.active && event.active.length > 0) {
      const chartElement = event.active[0];
      // @ts-ignore
      const index = chartElement.index;

      const countryId = this.countryIds[index];

      if (countryId != null) {
        this.router.navigate(['/details', countryId]);
      }
    }
  }
}
