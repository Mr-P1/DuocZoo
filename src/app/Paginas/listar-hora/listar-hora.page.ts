import { Component, OnInit } from '@angular/core';
import { Compra, CompraID } from '../../Modelos/compra';
import { ApiZooService } from '../../Servicio/api-zoo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-hora',
  templateUrl: './listar-hora.page.html',
  styleUrls: ['./listar-hora.page.scss'],
})
export class ListarHoraPage implements OnInit {



  constructor(
    private api: ApiZooService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
  ) { }

  public idActiva = 0;
  public botonHabilitado = true;
  // public compra !: Compra[];
  public compra: Array<CompraID> = [];



  ngOnInit() {

    this.rutaActiva.paramMap.subscribe(para => {
      Number(this.idActiva = +para.get('idUsuario')!)
      this.api.obtenerCompra(this.idActiva).subscribe((datos: any) => {
        this.compra = datos;
      })

    })

  }

}
