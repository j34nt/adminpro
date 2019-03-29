import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + 'medico';

    return this.http.get(url).pipe(
                  map((resp: any) => {
                    this.totalMedicos = resp.total;
                    return resp.medicos;
                  })
    );
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(
                  map((resp: any) => resp.medicos)
    );
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + 'medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
                  map(resp => {
                    swal('Medico Eliminado', 'El medico ha sido eliminado correctamente', 'success');
                    return true;
                  })
    );

  }

  guardarMedico(medico: Medico) {
    console.log(medico);
    let url = URL_SERVICIOS + 'medico';
    if (medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).pipe(
                    map((resp: any) => {
                      swal('Medico Actualizado', medico.nombre, 'success');
                      return resp.medico;
                    })
      );
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(
                    map((resp: any) => {
                      swal('Medico Creado', medico.nombre, 'success');
                      return resp.medico;
                    })
      );
    }
  }

  obetenerMedico(id: string) {
    const url = URL_SERVICIOS + 'medico/' + id;

    return this.http.get(url).pipe(
                  map((resp: any) => resp.medico)
    );
  }
}
