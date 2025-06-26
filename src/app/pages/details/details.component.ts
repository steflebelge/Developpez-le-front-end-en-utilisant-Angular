import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {Participation} from "../../core/models/Participation";
import {LineChartComponent} from "./line-chart/line-chart.component";
import {GlobalService} from "../../core/services/global.service";
import {LoaderComponent} from "../../shared/loader/loader.component";

@Component({
  selector: 'app-details',
  imports: [
    LineChartComponent,
    LoaderComponent
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
        this.idPays = parseInt(<string>this.route.snapshot.paramMap.get('idPays'));
        // On recupère les olympics a partir du service
        this.olympicService.getOlympics().subscribe(async data => {
          if(data.length > 0) {
            await this.globalService.sleep(500);
            this.olympics = data;
            // On recherche le pays demandé et ses participations
            this.olympic = this.olympics.find((olympicTmp => olympicTmp.id == this.idPays));
            this.participations = this.olympic?.participations;
            // On calcul le nombre total de medailles et d'athletes pour ce pays
            this.participations?.forEach((participationTmp: Participation) => {
              this.nbMedailles += participationTmp.medalsCount;
              this.nbAthletes += participationTmp.athleteCount;
            });

            // Si besoin on initialise le nombres de medailles min et max
            if(!this.globalService.hasBeenInitialized)
              this.globalService.initializeMinMaxNbMedals(this.olympics);
          }else{
            // En cas d'erreur de reception des données on renvoi vers la page notFound
            this.globalService.hasBeenInitialized = true;
            await this.router.navigate(['/notFound']);
          }
        });
      }
    }
}
