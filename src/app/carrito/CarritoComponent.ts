import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ContadorService } from '../Servicios/contador.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, AfterViewInit {

  price: number = 7980;
  cart: any[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private cdr: ChangeDetectorRef, private contadorService: ContadorService) { }

  ngOnInit(): void {
    const cartString = localStorage.getItem('cart');

    if (cartString) {
      this.cart = JSON.parse(cartString);
    }

    this.cart.forEach(item => {
      item.total = item.quantity * this.price;
    });

    this.calculateSubtotal();
    this.calculateTotal();
    

    localStorage.setItem('cartItemCount', this.calculateTotalQuantity().toString());
    this.contadorService.updateCartItemCount(this.calculateTotalQuantity());
       
  }

  ngAfterViewInit(): void {
    this.initializeData();
  }

  private initializeData() {
    const cartString = localStorage.getItem('cart');

    if (cartString) {
      this.cart = JSON.parse(cartString);

      this.cart.forEach(item => {
        item.total = item.quantity * this.price;
      });
    }

    this.calculateSubtotal();
    this.calculateTotal();

    this.cdr.detectChanges();
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.updateTotal(item);
    this.contadorService.updateCartItemCount(this.calculateTotalQuantity());
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateTotal(item);
      this.contadorService.updateCartItemCount(this.calculateTotalQuantity());
      localStorage.setItem('cart', JSON.stringify(this.cart));
         
    }
  }

  updateTotal(item: any) {
    item.total = item.quantity * this.price;
    this.calculateSubtotal();
    this.calculateTotal();
  }

  calculateSubtotal() {
    this.subtotal = this.cart.reduce((acc, item) => acc + item.total, 0);
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.total, 0);
  }

  calculateTotalQuantity(): number {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  removeItem(item: any) {
    const index = this.cart.indexOf(item);

    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.calculateSubtotal();
      this.calculateTotal();
    }

    localStorage.setItem('cartItemCount', this.calculateTotalQuantity().toString());
    this.contadorService.updateCartItemCount(this.calculateTotalQuantity());
  }
}