import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {Participation} from "../../core/models/Participation";
import {PieChartComponent} from "../home/pie-chart/pie-chart.component";

@Component({
  selector: 'app-details',
  imports: [
    PieChartComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  olympics: Olympic[] = [];
  olympic: Olympic | undefined;
  participations: Participation[] | undefined = [];
  idPays: number | undefined;
  nbMedailles: number = 0;
  nbAthletes: number = 0;

  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private router: Router
              ) {}

    ngOnInit(): void {
      if(!this.route.snapshot.paramMap.get('idPays'))
        this.router.navigate(['/']);
      else {
        this.idPays = parseInt(<string>this.route.snapshot.paramMap.get('idPays'));
        this.olympicService.getOlympics().subscribe(data => {
          if(data.length > 0) {
            this.olympics = data;
            this.olympic = this.olympics.find((olympicTmp => olympicTmp.id == this.idPays));
            this.participations = this.olympic?.participations;
            this.participations?.forEach((participationTmp: Participation) => {
              this.nbMedailles += participationTmp.medalsCount;
              this.nbAthletes += participationTmp.athleteCount;
            });
            debugger
          }
        });
      }
    }

}
