import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Compra } from 'src/app/Modelos/compra';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';

@Component({
  selector: 'app-modificar-hora',
  templateUrl: './modificar-hora.page.html',
  styleUrls: ['./modificar-hora.page.scss'],
})
export class ModificarHoraPage implements OnInit {

  public idActiva = 0;
  public compra !: Compra;
  public idUsuario = Number(this.api.retornarId());
  public botonHabilitado= true;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private api: ApiZooService,
    private http: HttpClient) { }


  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idHora')!;
      this.api.obtenerCompraPorID(this.idActiva).subscribe(data => {
        if (data) {
          this.compra = {
            fecha: data.fecha,
            total: data.total,
            detalles: data.detalles,
            idUsuario: data.idUsuario,
            id: data.id
          };

          let fechaArray = String(this.compra.fecha).split("-");
          let mes = fechaArray[1];
          let dia = fechaArray[0];

          let hoy = new Date();
          let fechaActual = hoy.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric' });
          
          let fechaArray2 = String(fechaActual).split("-");
          let mesActual = fechaArray2[1];
          let diaActial = fechaArray2[0];

          if(mes < mesActual || mes == mesActual && dia <= diaActial){
            this.botonHabilitado = false;
          }

        }
      })
    });




  }


  public fechaSeleccionada = "";

  isWeekday = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Comparar la fecha seleccionada con la fecha actual
    if (selectedDate < currentDate) {
      return false;
    }

    const utcDay = selectedDate.getUTCDay();

    // Los días domingos estarán deshabilitados
    return utcDay !== 0;
  }

  test() {


    let fechaActual = new Date();
    fechaActual.setMinutes(fechaActual.getMinutes() + 6); // Sumar 6 minutos
    let fechaActualStr = fechaActual.toISOString(); // Convertir a formato ISO-8601

    let fechaUser = new Date(this.fechaSeleccionada);
    let var1 = fechaUser.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric' });
    fechaActual = new Date(fechaActualStr);

    var mesActual = fechaActual.getMonth();
    var mesUsuario = fechaUser.getMonth();
    var asd = mesUsuario < mesActual ? true : false;




    if (asd == true || this.fechaSeleccionada == "") {
      alert("Verifique que haya ingresado una fecha valida")
      return;
    } else {

      var nuCom = {
        fecha: var1,
        total: this.compra.total,
        detalles: this.compra.detalles,
        idUsuario: this.compra.idUsuario,
        id: this.compra.id
      }


      this.api.modificarCompra(this.idActiva, nuCom).subscribe(data => {
        alert("Modificado con exito")
        this.router.navigate(['/inicio-usuario']);
      })

    }

  }


}
