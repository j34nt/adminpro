import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  cargando: boolean;
  totalRegistros: number;

  constructor(
    public _hospitalesService: HospitalService,
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalesService.cargarHospitales()
            .subscribe((resp: any) => {
              this.totalRegistros = resp.total;
              this.hospitales = resp.hospitales;
              this.cargando = false;
            });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalesService.buscarHospital(termino).subscribe(resp => {
      this.hospitales = resp;
      this.cargando = false;
    });

  }
  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      button: {
        text: 'Crear!',
        closeModal: true,
      },
    })
    .then(name => {
      if (!name) {
        throw null;
      }
      this._hospitalesService.crearhospital(name).subscribe(resp => {
        this.cargarHospitales();
      });
      return;
    });
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalesService.actualizarHospital(hospital)
            .subscribe();

  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Estas Seguro?',
      text: ' Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar => {
      if (borrar) {
        this._hospitalesService.borrarHospital(hospital._id)
        .subscribe(resp => this.cargarHospitales());
      }
    });
  }

}
