import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/producto.interface';
import { ngModuleJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: IProducto[] = [];
  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-html-dbf7d.firebaseio.com/productos_idx.json')
    .subscribe( (resp: IProducto[]) => {
      this.productos = resp;
      this.cargando = false;
    });
  }


}
