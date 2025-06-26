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
  // Défintions des variables neccessaires et leur valeur par défaut
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: []
    }],
  };
  countryIds: number[] = [];
  pieChartOptions: ChartOptions = {
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

  // Recupération du tableau de participations depuis l'élément parent
  @Input() olympics!: Olympic[];

  // Récupération des instances des composants enfants neccessaires
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // Le constructeur inclut les différents services dont on va avoir besoin
  constructor(private router: Router) {
  }

  // La fonction onInit s'execute au chargement du composant
  ngOnChanges(changes: SimpleChanges): void {
    // Lors de changements sur olympics
    if (changes['olympics'])
      this.updatePieChart();
  }

  // Fonction de génération de la lineChart
  updatePieChart() {
    // Défintions des variables neccessaires
    const labels: string[] = [];
    const values: number[] = [];

    // On itère sur les olympics
    for (const olympicTmp of this.olympics) {

      // On rajoute le label de l'olympic en cours aux labels
      labels.push(olympicTmp.country);

      // On calcul le nombre de médailles totales
      const totalMedals = olympicTmp.participations.reduce(
        (sommeMedailles, participationTmp) =>
          sommeMedailles + participationTmp.medalsCount, 0
      );
      values.push(totalMedals);
      this.countryIds.push(olympicTmp.id);
    }

    // on met a jour les données du graphiques avec les valeurs labels et values calculées
    this.pieChartData = {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#B21451', '#8e5ea2', '#3cba9f', '#46B214', "#141FB2"]
      }]
    };
  }

  // Gestion du click sur une partie du camembert
  onChartClick(event: { event?: ChartEvent, active?: {}[] }) {
    // Si il y a un element
    if (event.active && event.active.length > 0) {
      // On le recupere ainsi que son index
      const chartElement = event.active[0];
      // @ts-ignore
      const index = chartElement.index;

      // on peux alors en deduire l'id du pays
      const countryId = this.countryIds[index];

      // Si l'id est bien définit, on redirige l'utilisateur sur les details de ce pays
      if (countryId != null) {
        this.router.navigate(['/details', countryId]);
      }
    }
  }
}
