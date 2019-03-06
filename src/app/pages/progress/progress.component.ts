import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  leyenda = 'Leyenda';

  progresoA: number = 20;
  progresoV: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // actualizar(event: number) {
  //   console.log(event);
  // }

}
