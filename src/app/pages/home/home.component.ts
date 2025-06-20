import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  olympics: Olympic[] = [];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(data => {
      this.olympics = data;
    });
  }
}
