import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiZooService } from '../../Servicio/api-zoo.service';

@Component({
  selector: 'app-fichaanimal',
  templateUrl: './fichaanimal.page.html',
  styleUrls: ['./fichaanimal.page.scss'],
})
export class FichaanimalPage implements OnInit {
  public idActivo: number = 0;
  public ficha : any ;


  constructor(
    private rutaActiva: ActivatedRoute,
    private api: ApiZooService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {

      this.idActivo = +parametros.get('idTratamiento')!;

      this.api.obtenerFichaPorID(this.idActivo).subscribe(datos =>{
        if(datos ){
          console.log(datos)
          
          this.ficha = datos;
          
        }
        else{
          this.router.navigate(['/listar-admin']);
        }
      })
    })


  }

}
