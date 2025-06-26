import { Injectable } from '@angular/core';
import {Olympic} from "../models/Olympic";
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public minNbMedals: number = -1;
  public maxNbMedals: number = -1;
  public hasBeenInitialized: boolean = false;

  setMinNbMedals(newMinNbMedals: number){
    this.minNbMedals = newMinNbMedals;
  }
  getMinNbMedals():number{
    return this.minNbMedals;
  }

  setMaxNbMedals(newMaxNbMedals: number){
    this.maxNbMedals = newMaxNbMedals;
  }
  getMaxNbMedals():number{
    return this.maxNbMedals;
  }

  initializeMinMaxNbMedals(olympics: Olympic[]): void{
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
      this.hasBeenInitialized = true;
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
