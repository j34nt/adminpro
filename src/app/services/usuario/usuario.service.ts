import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('Servicio usuario listo');
    this.cargaStorage();
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargaStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;

    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + 'login/google/';

    return this.http.post(url, {token}).pipe(
                  map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                  })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recuerdo: boolean = false) {

    if (recuerdo) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + 'login/';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);

        return true;
      })
    );

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + 'usuario/';

    return this.http.post(url, usuario).pipe(
              map((resp: any) => {
                swal('Usuario Creado', usuario.email, 'success');
                return resp.usuario;
              }));
  }

  actualizar(usuario: Usuario) {
    let url = URL_SERVICIOS + 'usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
                  map((resp: any) => {
                    const usuarioDB: Usuario = resp.usuario;
                    // this.usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
                    swal('Usuario Actualizado', usuario.nombre, 'success');

                    return true;
                  })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
            .subscribe((resp: any) => {
              console.log(resp);
              this.usuario.img = resp.usuario.img;
              swal('Imagen Actualizada', this.usuario.nombre, 'success');
              this.guardarStorage(id, this.token, this.usuario);
            });
  }
}
