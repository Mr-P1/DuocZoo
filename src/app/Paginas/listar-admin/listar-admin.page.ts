import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { AnimalID } from '../../Modelos/animales';
import { ApiZooService } from '../../Servicio/api-zoo.service';

@Component({
  selector: 'app-listar-admin',
  templateUrl: './listar-admin.page.html',
  styleUrls: ['./listar-admin.page.scss'],
})
export class ListarAdminPage implements OnInit {

  @ViewChild(IonInfiniteScroll)
  public scroll !: IonInfiniteScroll;
  public animales: Array<AnimalID> = [];
  public results: any;

  constructor(
    private api: ApiZooService,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.api.listarPrimerosElementos()
    this.api.listaAnimales.subscribe(datosActualizados => {
      this.animales = datosActualizados;
      if (this.scroll) {
        this.scroll.complete();
      }
      this.results = this.animales
    })
  }
  public cargarMasDatos() {
    this.api.obtenerMasElementos();
  }
  handleChange(animales: any) {
    const query = animales.target.value;
    this.results = this.animales;
    if (query && query.trim() != ' ') {
      this.results = this.results.filter((animeles: any) => {
        return (animeles.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1 || animeles.raza.toLowerCase().indexOf(query.toLowerCase()) > -1)
      })
    }
  }


}
