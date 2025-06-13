import {Component, Input, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {Observable} from "rxjs";
import {Olympic} from "../../../core/models/Olympic";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pie-chart',
  imports: [AsyncPipe],
  templateUrl: './pie-chart.component.html',
  standalone: true,
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() olympics!: Observable<Olympic[]>;

}
