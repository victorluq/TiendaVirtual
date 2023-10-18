import { Component, OnInit } from '@angular/core';
import { ContadorService } from '../Servicios/contador.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0; // Variable para la cantidad de elementos en el carrito

  constructor(private contadorService: ContadorService) { } //inyectar el servicio

  ngOnInit(): void {
     // Obtener la cantidad de elementos en el carrito desde el servicio
     this.contadorService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // Obtener la cantidad de elementos en el carrito desde localStorage
    const cartItemCountString = localStorage.getItem('cartItemCount');

    if (cartItemCountString) {
      this.cartItemCount = parseInt(cartItemCountString, 10);
    }

}
}
