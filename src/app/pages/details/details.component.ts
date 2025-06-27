import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {Participation} from "../../core/models/Participation";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {GlobalService} from "../../core/services/global.service";
import {LoaderComponent} from "../../shared/loader/loader.component";
import {DataLoadingErrorComponent} from "../../shared/data-loading-error/data-loading-error.component";

@Component({
  selector: 'app-details',
  imports: [
    LineChartComponent,
    LoaderComponent,
    DataLoadingErrorComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit {
  // Défintions des variables neccessaires et leur valeur par défaut
  olympics: Olympic[] = [];
  olympic: Olympic | undefined;
  participations: Participation[] | undefined = [];
  idPays: number | undefined;
  nbMedailles: number = 0;
  nbAthletes: number = 0;
  isLoading: boolean = true;
  noData: boolean = false;



  // Le constructeur inclut les différents services dont on va avoir besoin
  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private router: Router,
              private globalService: GlobalService
              ) {}

    // La fonction onInit s'execute au chargement du composant
    ngOnInit(): void {
      // Si aucun idPays transmit alors on redirige l'utilisateur vers l'accueil
      if(!this.route.snapshot.paramMap.get('idPays'))
        this.router.navigate(['/']);
      else {
        // Sinon on recupere l id
        this.idPays = parseInt(
          <string>this.route.snapshot.paramMap.get('idPays')
        );
        // On recupère les olympics a partir du service
        this.olympicService.getOlympics().subscribe(async data => {
          // Si data n'est pas vide
          if(data.length > 0) {
            await this.globalService.sleep(500);

            // on remplit la variable olympics avec la data recue
            this.olympics = data;

            // On recherche le pays demandé
            this.olympic = this.olympics.find(
              (olympicTmp => olympicTmp.id == this.idPays)
            );

            // Si l'id du pays ne corresponds a aucun pays du JSON
            // on renvoi vers un not found
            if(!this.olympic)
              await this.router.navigate(['/notFound']);

            // on remplit la variable participations avec les données du pays demandé
            this.participations = this.olympic?.participations;

            // On itère sur les participations du pays pour calculer
            // le nombre total de medailles et d'athletes pour ce pays
            // et on set les variables correspondantes
            this.participations?.forEach((participationTmp: Participation)=> {
              this.nbMedailles += participationTmp.medalsCount;
              this.nbAthletes += participationTmp.athleteCount;
            });
          } else if (this.isLoading) {
            this.isLoading = false;
          } else {
            // En cas d'erreur de reception des données, on set les variables aux valeurs neccessaires
            // pour l'affichage d'un message a l utilisateur
            this.noData = true;
          }

          // Gestion du cas d'erreur de chargement des données avec changement de page
          if(this.globalService.hasBeenInitialized && data.length == 0 && !this.isLoading && !this.noData) {
            this.noData = true;
          }
        });
      }
    }
}
