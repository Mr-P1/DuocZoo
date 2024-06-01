import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest } from "ngx-paypal";

@Component({
  selector: 'app-prueba-paypal',
  templateUrl: './prueba-paypal.component.html',
  styleUrls: ['./prueba-paypal.component.scss'],
})
export class PruebaPaypalComponent implements OnInit {

  public payPalConfig: any;
  public showPaypalButtons !: boolean;

  constructor() { }

  ngOnInit() {
    this.payPalConfig = {
      currency: "CL",
      clientId: "AdfOMzSblEj4K41fjZYGSjjTeupuLT2HbCUWdIU_zhy99XHWgsiPK74fytlPm3ZOKHTSsb-ODvbWLI3Z",
      createOrder: (data: any) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "CL",
                value: "5.000",
                breakdown: {
                  item_total: {
                    currency_code: "CL",
                    value: "5.000"
                  }
                } 
              },
              items: [
                {
                  name: "Enterprise Subscription",
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "CL",
                    value: "5.000"
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

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }

  

}
