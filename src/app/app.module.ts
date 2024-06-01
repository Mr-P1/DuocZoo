import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';

import { PruebaPaypalComponent} from './Paginas/prueba-paypal/prueba-paypal.component';
import {PaypalCompraComponent} from './Paginas/paypal-compra/paypal-compra.component';
import {PaypalApadrinamientoComponent} from './Paginas/paypal-apadrinamiento/paypal-apadrinamiento.component';
import {ApiZooService} from './Servicio/api-zoo.service'
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {PaypalFichaComponent} from './Paginas/paypal-ficha/paypal-ficha.component'


@NgModule({
  declarations: [AppComponent,PruebaPaypalComponent, PaypalCompraComponent ,PaypalApadrinamientoComponent,PaypalFichaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgxPayPalModule,HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ApiZooService],
  bootstrap: [AppComponent],
})
export class AppModule {}
