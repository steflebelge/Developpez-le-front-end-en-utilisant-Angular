import { Injectable } from '@angular/core';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

// Ce service est injecté au niveau root pour un accès global et commun
@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  // Défintions des varibales neccessaires et leur initialisation
  public minNbMedals: number = -1;
  public maxNbMedals: number = -1;
  public hasBeenInitialized: boolean = false;

  // setter et getter du minimum de nombre de medailles
  setMinNbMedals(newMinNbMedals: number){
    this.minNbMedals = newMinNbMedals;
  }
  getMinNbMedals():number{
    return this.minNbMedals;
  }

  // setter et getter du maximum de nombre de medailles
  setMaxNbMedals(newMaxNbMedals: number){
    this.maxNbMedals = newMaxNbMedals;
  }
  getMaxNbMedals():number{
    return this.maxNbMedals;
  }

  // Recherche et set du nombre min et max de medailles
  initializeMinMaxNbMedals(olympics: Olympic[]): void{
    if (this.hasBeenInitialized) return;
    this.hasBeenInitialized = true;

    if(olympics.length > 0) {
      olympics.forEach((olympicTmp: Olympic) => {
        olympicTmp.participations.forEach((participationTmp: Participation) => {
          let minNbMedals: number = this.getMinNbMedals();
          let maxNbMedals: number = this.getMaxNbMedals();

          if (minNbMedals < 0
            || participationTmp.medalsCount < minNbMedals) {
            this.setMinNbMedals(participationTmp.medalsCount);
          }

          if (maxNbMedals < 0
            || participationTmp.medalsCount > maxNbMedals) {
            this.setMaxNbMedals(participationTmp.medalsCount);
          }
        });
      });
      this.setMinNbMedals(this.getMinNbMedals() > 10 ? this.getMinNbMedals() - 10 : 0);
      this.setMaxNbMedals(this.getMaxNbMedals() + 10);
    }
  }

  // Fonction de pause du code
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
