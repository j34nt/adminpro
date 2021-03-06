import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargaStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
            .pipe(
              map((resp: any) => {
                this.token = resp.token;
                localStorage.setItem('token', this.token);
                }),
                catchError(err => {
                  this.router.navigate(['/login']);
                  swal('No se pudo renovar el token', 'No fue posible renovar el token', 'error');
                  return throwError(err);
                })
              );
  }

  estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
  }

  cargaStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];

    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + 'login/google/';

    return this.http.post(url, {token}).pipe(
                  map((resp: any) => {
                    console.log(resp);
                    this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                  })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

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

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;
      }),
      catchError(err => {
        swal('Error en el Login', err.error.mensaje, 'error');
        return throwError(err);

      })

    );

  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

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
                    if (usuario._id === this.usuario._id) {
                      const usuarioDB: Usuario = resp.usuario;
                      // this.usuario = resp.usuario;
                      this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);

                    }
                    swal('Usuario Actualizado', usuario.nombre, 'success');

                    return true;
                  })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
            .subscribe((resp: any) => {
              this.usuario.img = resp.usuario.img;
              swal('Imagen Actualizada', this.usuario.nombre, 'success');
              this.guardarStorage(id, this.token, this.usuario, this.menu);
            });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + 'usuario?desde=' + desde;

    return this.http.get(url);
  }

  buscarUsuario(termino: string) {
    const url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
                  map((resp: any) => resp.usuarios)
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + 'usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
                  map((resp: any) => {
                    swal('Usuario Borrado', 'El usuario ha sido eliminado correctamente', 'success');
                    return true;
                  })
    );
  }
}
