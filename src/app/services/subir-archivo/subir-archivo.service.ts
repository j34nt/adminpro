import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(
    public http: HttpClient
  ) { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    console.log(archivo, tipo, id);
    const formData = new FormData();
    const url = URL_SERVICIOS + 'upload/' + tipo + '/' + id;

    formData.append('imagen', archivo, archivo.name);
    return this.http.put(url, formData, {reportProgress: true});

  }
}
