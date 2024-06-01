
import { ICreateOrderRequest } from "ngx-paypal";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';
import { Ticket } from '../../Modelos/tickets';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../../Modelos/compra';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-paypal-compra',
  templateUrl: './paypal-compra.component.html',
  styleUrls: ['./paypal-compra.component.scss'],
})
export class PaypalCompraComponent implements OnInit {

  public payPalConfig: any;
  public showPaypalButtons !: boolean;

  public fechaSeleccionada = "";
  public idUsuario = Number(this.api.retornarId());
  public descuento = false;
  public nuevoMonto = 0;
  public totalCompra = 0;

  tickets: any[] = [];

  constructor(
    private api: ApiZooService,
    private http: HttpClient,
    private router: Router
  ) { }



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

    this.totalCompra = this.total * 47

    this.payPalConfig = {
      currency: "MXN",
      clientId: "AdfOMzSblEj4K41fjZYGSjjTeupuLT2HbCUWdIU_zhy99XHWgsiPK74fytlPm3ZOKHTSsb-ODvbWLI3Z",
      createOrder: (data: any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: String(this.totalCompra),
                breakdown: {
                  item_total: {
                    currency_code: "MXN",
                    value: String(this.totalCompra)
                  }
                }
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "MXN",
                    value: String(this.totalCompra)
                  }
                }
              ]
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data: any, actions: any) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
          this.guardarCompra()

        });

      },
      onClientAuthorization: (data: any) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data: any, actions: any) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err: any) => {
        console.log("OnError", err);
      },
      onClick: (data: any, actions: any) => {
        console.log("onClick", data, actions);
       
      }
    };

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

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }

}
