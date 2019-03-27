import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-uploads',
  templateUrl: './modal-uploads.component.html',
  styles: []
})
export class ModalUploadsComponent implements OnInit {

  oculto: string = '';

  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirArchicoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      // this.imagenSubir(null);
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchicoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
            .subscribe(resp => {
              this._modalUploadService.notificacion.emit(resp);
              this.cerrarModal();
            });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
