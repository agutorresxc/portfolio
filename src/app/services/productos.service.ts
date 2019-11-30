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
  productosFiltrado: IProducto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-dbf7d.firebaseio.com/productos_idx.json')
      .subscribe( (resp: IProducto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-dbf7d.firebaseio.com/productos/${ id }.json`)
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Si ya tenemos los datos, aplicar el filtro
      this.filtrarProductos(termino);
    }
  }
    private filtrarProductos( termino: string) {
      console.log(this.productos);
      this.productosFiltrado = [];
      termino = termino.toLocaleLowerCase();
      this.productos.forEach( prod => {
        const titulolower = prod.titulo.toLocaleLowerCase();
        if (prod.categoria.indexOf(termino) >= 0 || titulolower.indexOf(termino) >= 0) {
          this.productosFiltrado.push(prod);
        }
      });
      // return this.productos.filter(palabra => termino = palabra.categoria);
    }
}
