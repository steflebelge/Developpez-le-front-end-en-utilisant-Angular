import {Component, Input, ViewChild} from '@angular/core';
import {BaseChartDirective, NgChartsModule} from 'ng2-charts';
import {filter, Observable} from "rxjs";
import {Olympic} from "../../../core/models/Olympic";
import {AsyncPipe} from "@angular/common";
import {ChartConfiguration, ChartType} from "chart.js";

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
    }]
  };

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
    }

    this.pieChartData = {
      labels,
      datasets: [{
        data: values
      }]
    };
  }
}
