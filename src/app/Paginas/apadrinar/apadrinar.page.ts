import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiZooService } from '../../Servicio/api-zoo.service';
import { AnimalID } from '../../Modelos/animales';
import { Apadrinamientos } from 'src/app/Modelos/apadrinamientos';


@Component({
  selector: 'app-apadrinar',
  templateUrl: './apadrinar.page.html',
  styleUrls: ['./apadrinar.page.scss'],
})
export class ApadrinarPage implements OnInit {

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

  prueba() {
    this.http.get<any>(this.api.urlApadrinamientos).subscribe(data => {
      const apadrinado = data.find((a: any) => {
        return a.idUsuario == this.idUsuario && a.idAnimal == this.idActivo;
      })
      if (apadrinado) {
        alert("Ya lo apadrinaste")
        this.botonHabilitado = false;
      }
      else {
        alert("Todavia no lo apadrians")
      }
    })
  }

}
