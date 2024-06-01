import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest } from "ngx-paypal";
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalID } from '../../Modelos/animales';
import { Apadrinamientos } from 'src/app/Modelos/apadrinamientos';

@Component({
  selector: 'app-paypal-apadrinamiento',
  templateUrl: './paypal-apadrinamiento.component.html',
  styleUrls: ['./paypal-apadrinamiento.component.scss'],
})
export class PaypalApadrinamientoComponent  implements OnInit {

  public payPalConfig: any;
  public idUsuario = Number(this.api.retornarId());
  public idActivo: number = 0;
  public animalAcitvo !: AnimalID;

  public monto: number = 0;

  constructor(
    private rutaActiva: ActivatedRoute,
    private api: ApiZooService,
    private http: HttpClient,
    private router: Router,
    private alerta: AlertController
  ) { }

  public botonHabilitado = true;


  ngOnInit() {

    this.rutaActiva.paramMap.subscribe(parametros => {

      this.idActivo = +parametros.get('idAnimal')!;
      this.api.obtenerAnimalPorID(this.idActivo)
        .subscribe(datos => {
          if (datos) {
            this.animalAcitvo = datos;
          }
          else {
            this.router.navigate(['listar-admin']);
          }
        })

    })


    this.http.get<any>(this.api.urlApadrinamientos).subscribe(data => {
      const apadrinado = data.find((a: any) => {
        return a.idUsuario == this.idUsuario && a.idAnimal == this.idActivo;
      })
      if (apadrinado) {
        this.botonHabilitado = false;
      }
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
                value: this.monto.toString(),
                breakdown: {
                  item_total: {
                    currency_code: "MXN",
                    value: this.monto.toString()
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
                    value: this.monto.toString()
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
         this.pagar()

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

        if (this.monto <= 10000) {
      alert("El monto debe ser superior a 10.000")
      return;
    }
       
      }
    };


  }


  pagar() {
    if (this.monto <= 10000) {
      alert("El monto debe ser superior a 10.000")
      return;
    }
    else {
      var ap: Apadrinamientos = {
        Monto: this.monto,
        idUsuario: this.idUsuario,
        idAnimal: this.idActivo
      }
      this.api.apadrinarAnimal(ap).subscribe(
        data => {
          alert("Muchas gracias por apadrinar al animal")
          this.router.navigate(['/inicio-usuario'])
        }
      )
    }
  }

}
