import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService, ModalUploadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);
    this._modalUploadService.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.obetenerMedico(id)
            .subscribe(resp => {
              this.medico = resp;
              this.medico.hospital = resp.hospital._id;
              this.cambioHospital(this.medico.hospital);
            });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
            .subscribe(medico => {
              this.medico = medico._id;
              this.router.navigate(['/medico', medico._id]);
            });

  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
            .subscribe(resp => this.hospital = resp);
  }

}
