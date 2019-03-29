import { Component, OnInit } from '@angular/core';
import { MedicoService, ModalUploadService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('medicos', id);

  }

  crearMedico() {

  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedico(termino).pipe(
              map(resp => this.medicos = resp)
    );
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe(resp => this.medicos = resp);
  }

  editarMedico(medico: Medico) {

  }
  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id)
            .subscribe(() => this.cargarMedicos() );
  }

}
