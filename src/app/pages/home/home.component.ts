import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  // Défintions des variables neccessaires et leur valeur par défaut
  olympics: Olympic[] | undefined = undefined;
  noData: boolean = false;
  isLoading: boolean = true;

  // Le constructeur inclut les différents services dont on va avoir besoin
  constructor(
    private olympicService: OlympicService,
    private globalService: GlobalService
  ) {
  }

  // La fonction onInit s'execute au chargement du composant
  ngOnInit(): void {
    // On recupère de l'observable des olympics a partir du service
    this.olympicService.getOlympics().subscribe(async data => {
      await this.globalService.sleep(500);
      if (data.length > 0) {
        // on remplit la variable olympics avec la data recue
        this.olympics = data;

        // Si besoin on initialise le nombres de medailles min et max
        if (!this.globalService.hasBeenInitialized)
          this.globalService.initializeMinMaxNbMedals(this.olympics);
      } else if (this.globalService.hasBeenInitialized) {
        // En cas d'erreur de reception des données, on set les variables aux valeurs neccessaires
        // pour l'affichage d'un message a l utilisateur
        this.noData = true;
        this.isLoading = false;
      } else if (!this.isLoading) {
        this.noData = true;
      } else {
        this.isLoading = false;
      }
    });
  }
}
