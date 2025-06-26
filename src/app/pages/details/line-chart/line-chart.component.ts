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
  // Défintions des variables neccessaires et leur valeur par défaut
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

  // Recupération du tableau de participations depuis l'élément parent
  @Input() participations!: Participation[];

  // Le constructeur inclut les différents services dont on va avoir besoin
  constructor(private globalService: GlobalService) {}

  // La fonction onInit s'execute au chargement du composant
  ngOnInit(): void {
    this.generateChart();
  }

  // Fonction de génération de la lineChart
  generateChart(): void {
    // On tri les données
    const sorted = [...this.participations].sort((a, b) => a.year - b.year);

    // On remplit les données a partir des données triées
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
