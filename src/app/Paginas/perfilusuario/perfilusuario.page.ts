import { Component, OnInit } from '@angular/core';
import {ApiZooService} from '../../Servicio/api-zoo.service';
import {Usuarios} from '../../Modelos/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {

  public usuarioIngresado = this.api.retornarNombre(); 
  public idUsuario = this.api.retornarId();
  public usuario !: Usuarios;
  constructor(
    private api: ApiZooService,
    private router:Router
  ) { }
  ngOnInit() {
    this.api.obtenerUsuarioPorID(this.idUsuario).subscribe(
     datos=>{
      if(datos){
        this.usuario = datos;
      }
      else{
        this.router.navigate(['/'])
      }

     }
    )

  }

}
