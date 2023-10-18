import { Component, OnInit } from '@angular/core';
import { MisdatosService } from '../Servicios/misdatos.service';
import { ContadorService } from '../Servicios/contador.service';

@Component({
  selector: 'app-producto1',
  templateUrl: './producto1.component.html',
  styleUrls: ['./producto1.component.css']
})
export class Producto1Component implements OnInit {
  miTienda:any = {};
  miProducto1:any[] = [];

  constructor(private misDatos: MisdatosService, private contadorService: ContadorService) { }

  ngOnInit(): void {  
    // Verifica si el carrito ya existe en el Local Storage
    const carritoString = localStorage.getItem('cart');

   /* if (carritoString !== undefined) {
      // Si existe el carrito, elimínalo para vaciarlo
      localStorage.removeItem('cart');
    }*/

    if (carritoString === null) {
      // Si no existe, inicializa el carrito con un arreglo vacío
      localStorage.setItem('cart', JSON.stringify([]));
    }

     this.misDatos.obtenerDatos().subscribe(data => {
      console.log(data);
      this.miTienda = data;
      this.miProducto1 = data.producto1.map((producto: any) => ({ ...producto, id: producto.id }));
    });
   
    // Llama al servicio para actualizar el contador al entrar al componente
    this.actualizarContador();
    
  }

  add(producto: any): void {
    // Obtén el carrito actual del Local Storage
    const carritoString = localStorage.getItem('cart');
  
    // Analiza el carrito a un objeto JavaScript
    const carrito = JSON.parse(carritoString || '[]');
  
    // Busca si el producto ya está en el carrito
    const productoIndex = carrito.findIndex((item: any) => item.id === producto.id);
  
    if (productoIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      carrito[productoIndex].quantity++;
    } else {
      // Si no está en el carrito, agrégalo con cantidad 1
      carrito.push({ ...producto, quantity: 1 });
    }
  
    // Guarda el carrito actualizado en el Local Storage
    localStorage.setItem('cart', JSON.stringify(carrito));
  
    // Calcula la cantidad total de productos en el carrito
    const totalQuantity = carrito.reduce((total: number, item: any) => total + item.quantity, 0);
  
    // Llama al servicio para actualizar el contador con la cantidad total
    this.contadorService.updateCartItemCount(totalQuantity);

    // Llama al servicio para actualizar el contador al agregar un producto
    this.actualizarContador();
  }
  
  private actualizarContador() {
    // Obtén la cantidad total de productos en el carrito
    const cartString = localStorage.getItem('cart');
    const carrito = JSON.parse(cartString || '[]');
    const totalQuantity = carrito.reduce((total: number, item: any) => total + item.quantity, 0);

    // Llama al servicio para actualizar el contador con la cantidad total
    this.contadorService.updateCartItemCount(totalQuantity);
  }
  

  }

