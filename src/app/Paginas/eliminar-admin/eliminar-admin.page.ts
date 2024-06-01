import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import {AnimalID} from '../../Modelos/animales';

@Component({
  selector: 'app-eliminar-admin',
  templateUrl: './eliminar-admin.page.html',
  styleUrls: ['./eliminar-admin.page.scss'],
})
export class EliminarAdminPage implements OnInit {

  public idActivo :number =0 ;
  public animalAcitvo !: AnimalID;

  constructor(
    private rutaActiva : ActivatedRoute,
    private api:ApiZooService,
    private http: HttpClient,
    private router : Router,
    private alerta: AlertController
  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros=>{
      
      this.idActivo = +parametros.get('idAnimal')!;
      this.api.obtenerAnimalPorID(this.idActivo)
      .subscribe(datos=>{
        if(datos){
          this.animalAcitvo=datos;
        }
        else{
          this.router.navigate(['listar-admin']);
        }
      })
      
    })

  }


  public async eliminarAnimal(){
    const mensaje = await this.alerta.create({
      header: '¿Quieres Eliminarlo?',
      buttons:[
        {
          text:'No',
          role:'cancel'
        },
        {
          text:'Si',
          role:'confirm',
          handler:()=>{
            this.api.eliminarAnimalPorID(this.idActivo)
            .subscribe(()=>{
              this.http.get<any>(`${this.api.urlAnimales}?idAnimal=${this.idActivo}`)
              .subscribe(datos=>{
                this.router.navigate(['listar-admin']);
              })

            })
           
          }
        }
      ]
    })
    await mensaje.present();
  }

}
