import { Component, OnInit, Input } from '@angular/core';
import { SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-donas',
  templateUrl: './grafica-donas.component.html',
  styleUrls: ['./grafica-donas.component.css']
})
export class GraficaDonasComponent implements OnInit {

  @Input() data: string[];

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = '';
  public leyenda: string = '';

  constructor() {}

  ngOnInit() {
    console.log(this.data);
    this.doughnutChartLabels = this.data['labels'];
    this.doughnutChartData = this.data['data'];
    this.doughnutChartType = this.data['type'];
    this.leyenda = this.data['leyenda'];
  }

}
