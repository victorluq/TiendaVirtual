import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { Producto1Component } from './producto1/producto1.component';
import { DashboardProd1Component } from './dashboard-prod1/dashboard-prod1.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './carrito/CarritoComponent';
import { FormsModule } from '@angular/forms';
import { ContadorService } from './Servicios/contador.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    Producto1Component,
    DashboardProd1Component,
    IndexComponent,
    FooterComponent,
    CarritoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ContadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
