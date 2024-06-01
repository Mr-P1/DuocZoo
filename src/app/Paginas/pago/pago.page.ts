import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';
import { Ticket } from '../../Modelos/tickets';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../../Modelos/compra';
import { Router } from '@angular/router';
import {IPayPalConfig} from 'ngx-paypal'


@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

 
  public fechaSeleccionada = "";
  public idUsuario = Number(this.api.retornarId());
  public descuento = false;
  public nuevoMonto = 0;

  constructor(
    private api: ApiZooService,
    private http: HttpClient,
    private router: Router
  ) { }

  tickets: any[] = [];

  ngOnInit() {
    this.http.get<any>(this.api.urlTickets).subscribe(datos => {
      this.tickets = datos;
      
    })

    this.http.get<any>(this.api.urlApadrinamientos).subscribe(data => {
      const apadrinado = data.find((a: any) => {
        return a.idUsuario == this.idUsuario
      })
      if (apadrinado) {
        this.descuento = true;

      }
    })

  }

  isWeekday = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Comparar la fecha seleccionada con la fecha actual
    if (selectedDate < currentDate) {
      return false;
    }

    const utcDay = selectedDate.getUTCDay();

    // Los días domingos estarán deshabilitados
    return utcDay !== 0;
  }

  public usuarioID = this.api.retornarId();

  compraUsuario !: Compra;
  total = 0;

  actualizarTotal() {
    this.total = this.tickets.reduce((total, ticket) =>
      total + ticket.precio * ticket.cantidad
      , 0
    );

    if (this.descuento == true) {
      this.total = this.total * 0.85
    }

  }


  prueba2() {
    this.http.get<any>(this.api.urlApadrinamientos).subscribe(data => {
      const apadrinado = data.find((a: any) => {
        return a.idUsuario == this.idUsuario
      })
      if (apadrinado) {
        alert("recibe descuento")
      }
      else {
        alert("No")
      }
    })

  }

  //Muestra en la consola los datos como fecha, tickets y total
  Prueba() {
    const total = this.tickets.reduce((total, ticket) => total + ticket.precio * ticket.cantidad, 0);

    // Crear un objeto con los detalles de la compra
    const detalles = this.tickets.map(ticket => {
      return {
        id: ticket.id,
        nombre: ticket.nombre,
        cantidad: ticket.cantidad,
        subtotal: ticket.cantidad * ticket.precio
      };
    });


    console.log("Total", total);

    console.log("Tickets", detalles);

    console.log("FEcha", this.fechaSeleccionada);
  }

  guardarCompra() {
    // Calcular el valor total
    const total = this.tickets.reduce((total, ticket) => total + ticket.precio * ticket.cantidad, 0);

    // Crear un objeto con los detalles de la compra
    const detalles = this.tickets.map(ticket => {
      return {
        id: ticket.id,
        nombre: ticket.nombre,
        cantidad: ticket.cantidad,
        subtotal: ticket.cantidad * ticket.precio
      };
    });


   

    let fechaActual = new Date();
    fechaActual.setMinutes(fechaActual.getMinutes() + 6); // Sumar 6 minutos
    let fechaActualStr = fechaActual.toISOString(); // Convertir a formato ISO-8601


    fechaActual = new Date(fechaActualStr);

    let fechaUser = new Date(this.fechaSeleccionada);
    let var1 = fechaUser.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric' });
    
    var mesActual = fechaActual.getMonth();
    var mesUsuario = fechaUser.getMonth();
    var asd = mesUsuario < mesActual ? true : false;

    if (total <= 0 || asd == true || this.fechaSeleccionada == "") {
      alert("Verifique que haya ingresado una fecha valida o haya ingresada por lo menos 1 ticket")
      return;
    }
    else {


      this.api.realizarCompra({
        fecha: var1,
        total: this.total,
        detalles: detalles,
        idUsuario: Number(this.api.retornarId())
      }).subscribe(() => {
        alert("Compra realizada");
        this.router.navigate(['inicio-usuario']);
      })


    }




  }

  prueba3() {

    let fechaUser = new Date(this.fechaSeleccionada);

    let fechaActual = new Date();
    fechaActual.setMinutes(fechaActual.getMinutes() + 6); // Sumar 6 minutos
    let fechaActualStr = fechaActual.toISOString(); // Convertir a formato ISO-8601


    fechaActual = new Date(fechaActualStr);
    let var1 = fechaUser.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    let var2 = fechaActual.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })



    var mesActual = fechaActual.getMonth();
    var mesUsuario = fechaUser.getMonth();

    var asd = mesUsuario < mesActual ? true : false;
    alert("Fecha seleccionada Usuario " + mesUsuario + " Fecha De hoy " + mesActual + "  " + asd)


    if (mesUsuario < mesActual) {
      alert("El mes que selecciono el usuario es menor")
    }

    // var resultado2 = var1 <= var2 ? true : false;

    // alert(resultado2)

  }



}
