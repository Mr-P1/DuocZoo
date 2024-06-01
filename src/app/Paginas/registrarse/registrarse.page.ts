import { Component, OnInit } from '@angular/core';
import { ApiZooService } from '../../Servicio/api-zoo.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  public formularioRegistro: FormGroup;

  constructor(
    private formB: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private api: ApiZooService,
    private alertController: AlertController
  ) { 
    this.formularioRegistro = this.formB.group({
      usuario: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      contraseña: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25), Validators.email]],
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      tipoUsuario: ['cliente']

    })
  }

  ngOnInit() {
    this.formB
  }

  //Mensaje de usuario creado
  async usuarioCreado() {
    const mensaje = await this.alertController.create({
      header: 'Alerta',
      message: 'Has sido Registrado!',
      buttons: ['OK'],
    });

    await mensaje.present();
  }

  async usuarioDuplicado(){
    const mensaje = await this.alertController.create({
      header:'Alerta',
      message:'Este usuario ya esta en uso',
      buttons:['Ok']
    });


    await mensaje.present();
  }




  async registrarse() {
    if (this.formularioRegistro.invalid) {
      return
    }
    else {
      this.http.get<any>(this.api.urlUsuarios).subscribe((data) => {
        const user = data.find((a: any) => {
          return a.usuario.toLowerCase() == this.formularioRegistro.value.usuario.toLowerCase()
        })
        if (user) {
          this.usuarioDuplicado();
          return;
        }
        else {
          this.api.AgregarUsuario(
            { ...this.formularioRegistro.value }
          ).subscribe(
            async (data) => {

              this.formularioRegistro.reset();
              await this.usuarioCreado();
              this.router.navigate(['/']);

              
            })


        }
      })

    }
  }

}
