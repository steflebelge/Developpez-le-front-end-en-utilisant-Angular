import {Component, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {GlobalService} from 'src/app/core/services/global.service';
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  olympics: Olympic[] | undefined = undefined;

  constructor(
    private olympicService: OlympicService,
    private globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(async data => {
      await this.globalService.sleep(500);
      this.olympics = data;
      if(!this.globalService.hasBeenInitialized)
        this.globalService.initializeMinMaxNbMedals(this.olympics);
    });
  }
}
