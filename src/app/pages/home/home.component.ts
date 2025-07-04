import {Component, OnInit, OnDestroy} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {GlobalService} from 'src/app/core/services/global.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  // Défintions des variables neccessaires et leur valeur par défaut
  olympics: Olympic[] | undefined = undefined;
  noData: boolean = false;
  isLoading: boolean = true;
  private subscription: Subscription | undefined;


  // Le constructeur inclut les différents services dont on va avoir besoin
  constructor(
    private olympicService: OlympicService,
    private globalService: GlobalService
  ) {
  }

  // La fonction onInit s'execute au chargement du composant
  ngOnInit(): void {
    // On recupère de l'observable des olympics a partir du service
    this.subscription = this.olympicService.getOlympics().subscribe(async data => {
      // Si data n'est pas vide
      if (data.length > 0) {
        await this.globalService.sleep(500);

        // on remplit la variable olympics avec la data recue
        this.olympics = data;
      } else if (this.isLoading) {
        this.isLoading = false;
      } else {
        // En cas d'erreur de reception des données, on set les variables aux valeurs neccessaires
        // pour l'affichage d'un message a l utilisateur
        this.noData = true;
      }

      // Gestion du cas d'erreur de chargement des données avec changement de page
      if (this.globalService.hasBeenInitialized && data.length == 0 && !this.isLoading && !this.noData) {
        this.noData = true;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
