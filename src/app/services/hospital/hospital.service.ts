import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  token: string;
  hospital: Hospital;
  usuario: Usuario;

  constructor(
    public htttp: HttpClient,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) {
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + 'hospital';
    return this.htttp.get(url);
  }
  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + 'hospital/' + id;

    return this.htttp.get(url).pipe(
                  map((resp: any) => resp.hospital)
    );
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + 'hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.htttp.delete(url).pipe(
                  map(resp => {
                    swal('Hospital Borrado', 'El hospital ha sido borrado satisfactoriamente', 'success');
                    return true;
                  })
    );
  }

  crearhospital(nombre: string) {
    const name = {
      nombre: nombre
    };
    let url = URL_SERVICIOS + 'hospital';
    url += '?token=' + this._usuarioService.token;

    return this.htttp.post(url, name).pipe(
                  map((resp: any) => {
                    swal('Hospital Creado', 'El hospital ha sido creado satisfactoriamente', 'success');
                    return true;
                  })
    );

  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;
    return this.htttp.get(url).pipe(
                  map((resp: any) => resp.hospitales)
    );
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + 'hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.htttp.put(url, hospital).pipe(
                  map(resp => {
                    swal('Hospital Actualizado', 'El hospital ha sido actualizado correctamente', 'success');
                    return true;
                  })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService.subirArchivo(file, 'hospital', id)
              .subscribe((resp: any) => {
                swal('Imagen Actualizada', 'Se ha actualizado satisfactoriamente', 'success');
                return true;
              });
  }
}
