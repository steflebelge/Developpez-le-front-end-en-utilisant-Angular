import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

// Ce service est injecté au niveau root pour un accès global et commun
@Injectable({
  providedIn: 'root',
})


export class OlympicService {
  //defintion de l'URL du JSON de données
  private olympicUrl = './assets/mock/olympic.json';
  // Instanciation des olympics
  private olympics = new BehaviorSubject<Olympic[]>([]);

  constructor(
    private http: HttpClient,
    ) {}

  // Fonction de chargement des données olympiques à partir de l'URL,
  // puis retourne un Observable contenant le tableau des données olympiques.
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics.next(value)),
      catchError((error, caught) => {
        console.error(error);
        const emptyData: Olympic[] = [];
        this.olympics.next(emptyData);
        return of(emptyData);
      })
    );
  }

  // getter de l'observable des olympics
  getOlympics() {
    return this.olympics.asObservable();
  }
}
