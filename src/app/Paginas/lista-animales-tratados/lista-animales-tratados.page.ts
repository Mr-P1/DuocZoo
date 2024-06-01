import { Component, OnInit } from '@angular/core';
import { ApiZooService } from '../../Servicio/api-zoo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-animales-tratados',
  templateUrl: './lista-animales-tratados.page.html',
  styleUrls: ['./lista-animales-tratados.page.scss'],
})
export class ListaAnimalesTratadosPage implements OnInit {

  constructor(
    private api: ApiZooService,
    private http: HttpClient
  ) { }

  animales: any;
  tratamientos: any[]=[];

  animalesConTratamiento!: any[];

  ngOnInit() {
    // this.http.get<any>(this.api.urlTratamiento).subscribe(datos => {
    //   this.animales = datos

    //   this.http.get<any>(this.api.urlFicha).subscribe(datos => {
    //     this.tratamientos = datos

    //     console.log(this.animales)
    //     console.log("-------------------")
    //     console.log(this.tratamientos)

    //   })
    // })


    // this.http.get<any[]>(this.api.urlTratamiento).subscribe(datos1 => {
    //   this.animales = datos1;

    //   this.http.get<any[]>(this.api.urlFicha).subscribe(datos2 => {
    //     this.tratamientos = datos2.filter( datos3 =>this.animales.some(animal => animal.idFicha === datos3.id.toString())) //Aqui va el filter

    //   });
    // });

    this.http.get<any[]>(this.api.urlTratamiento).subscribe(datos1 => {
      this.animales = datos1;
  
    });

    // .filter(animal =>
    //   tratamientos.some(tratamiento => tratamiento.idFicha === animal.id.toString())
    // );


    // this.http.get<any>(this.api.urlFicha).subscribe(datos => {
    //   this.tratamientos = datos

    // })




    // const animalesTratados = this.animales.filter(animal => {
    //   return this.tratamientos.some(tratamiento => tratamiento.idFicha === animal.id);
    // });

    // console.log(animalesTratados)


    // this.http.get<any[]>(this.api.urlFicha).subscribe(tratamientos => {
    //   this.tratamientos = tratamientos;

    //   this.http.get<any[]>(this.api.urlAnimalEnfermo).subscribe(animales => {
    //     this.animales = animales.filter(animal =>
    //       tratamientos.some(tratamiento => tratamiento.idFicha === animal.id)
    //     );
    //   });

    // });





  }





}
