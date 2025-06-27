import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import {GlobalService} from "./core/services/global.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  // Ajout de l'olympic service dans l'instance de la classe
  constructor(
    private olympicService: OlympicService,
    private globalService: GlobalService
  ) {}

  // Chargement initial des données et initialisation
  // du min/max medailles du global service
  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe(data => {
      this.globalService.initializeMinMaxNbMedals(data);
    });
  }
}
