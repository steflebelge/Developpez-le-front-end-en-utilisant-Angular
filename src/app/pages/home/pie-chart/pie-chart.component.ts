import {Component, Input, ViewChild} from '@angular/core';
import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {filter, Observable} from "rxjs";
import {Olympic} from "../../../core/models/Olympic";
import {AsyncPipe} from "@angular/common";
import {ChartConfiguration, ChartEvent, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-pie-chart',
  imports: [AsyncPipe, NgChartsModule],
  templateUrl: './pie-chart.component.html',
  standalone: true,
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() olympics!: Observable<Olympic[]>;
  olympicList: Olympic[] = [];
  pieChartType: ChartType = 'pie';
  // Données du graphique vide
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: []
    }],
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
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
    }
  };
  countryIds: number[] = [];

  ngOnInit() {
    this.olympics
      .pipe(filter(data => data.length > 0))
      .subscribe(data => {
        this.olympicList = data;
        this.updatePieChart();
      });
  }

  updatePieChart() {
    const labels: string[] = [];
    const values: number[] = [];

    for (const olympicTmp of this.olympicList) {
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
        backgroundColor: ['#B21451', '#8e5ea2', '#3cba9f', '#46B214', "#141FB2" ]
      }]
    };
  }

  onChartClick(event: { event?: ChartEvent, active?: {}[] }) {
    if (event.active && event.active.length > 0) {
      const chartElement = event.active[0];
      // @ts-ignore
      const index = chartElement.index;

      const countryId = this.countryIds[index]; // récupère l’id ici

      if (countryId != null) {
        console.log('id pays : ' + countryId);
        // this.router.navigate(['/details', countryId]);
      }
    }
  }
}
