import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiZooService } from '../../Servicio/api-zoo.service';
import { ICreateOrderRequest } from "ngx-paypal";

@Component({
  selector: 'app-paypal-ficha',
  templateUrl: './paypal-ficha.component.html',
  styleUrls: ['./paypal-ficha.component.scss'],
})
export class PaypalFichaComponent implements OnInit {
  public idActivo: number = 0;
  public ficha: any;
  public payPalConfig: any;

  public pagotratamiento = 0;

  constructor(
    private rutaActiva: ActivatedRoute,
    private api: ApiZooService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {

    this.rutaActiva.paramMap.subscribe(parametros => {

      this.idActivo = +parametros.get('idTratamiento')!;

      this.api.obtenerFichaPorID(this.idActivo).subscribe(datos => {
        if (datos) {
          console.log(datos)

          this.ficha = datos;

          this.pagotratamiento =this.ficha.precio * 47
          console.log(this.pagotratamiento)

        }
        else {
          this.router.navigate(['/listar-admin']);
        }
      })
    })









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
                value:"1000",
                breakdown: {
                  item_total: {
                    currency_code: "MXN",
                    value:"1000"
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
                    value:"1000"
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
          //
            alert("Pago de ficha realizado")
            this.router.navigate(['lista-animales-tratados'])
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


  



  

}
