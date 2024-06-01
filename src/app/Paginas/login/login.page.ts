import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ApiZooService} from '../../Servicio/api-zoo.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formularioLogin:FormGroup;

  constructor(
    private formB:FormBuilder,
    private api:ApiZooService,
    private http: HttpClient,
    private router:Router
  ) { 
    this.formularioLogin= this.formB.group({
      usuario: ['',[Validators.required]],
      contraseña: ['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  async logearse(){
    if (this.formularioLogin.invalid){
      return
    }
    else{
      this.http.get<any>(this.api.urlUsuarios).subscribe(data=>{
        const user = data.find((a:any)=>{
          return a.usuario == this.formularioLogin.value.usuario && 
                 a.contraseña == this.formularioLogin.value.contraseña
        });
        if (user){
          this.formularioLogin.reset()

          if(user.usuario == "admin"){
            
            this.router.navigate(['listar-admin'])
          }
          else{
            this.api.nombreUsuario(user.usuario)
            this.api.idUSuario(user.id)
            this.router.navigate(['inicio-usuario'])
          }
          
        }
        else{
          alert("Usuario incorrecto ó no existe")
          return
        }
      })
    }
  }

}
