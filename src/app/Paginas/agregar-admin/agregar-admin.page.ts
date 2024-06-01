import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiZooService} from '../../Servicio/api-zoo.service';


@Component({
  selector: 'app-agregar-admin',
  templateUrl: './agregar-admin.page.html',
  styleUrls: ['./agregar-admin.page.scss'],
})
export class AgregarAdminPage implements OnInit {

  public imagenCargando = false;
  public imagen64='';
  public formulario : FormGroup;

  constructor(
    private formB:FormBuilder,
    private router:Router,
    private api:ApiZooService

  ) { 
    this.formulario= this.formB.group({
      imagen: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      raza: ['',[Validators.required]],
      edad:[[Validators.required]],
      altura: [[Validators.required]],
      peso:[[Validators.required]],
      alimentacion:['',[Validators.required]],
      grupo:['',[Validators.required]],
      recinto:['',[Validators.required]]
    })
  }

  ngOnInit() {
  }

  public cargarFoto(e: Event){
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files ? elemento.files[0] : null;
    console.log(archivo);
    
    if (archivo) {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        this.imagenCargando = false;
      }
    }

    
  }

  

  public datos(){
    console.warn(this.formulario.value)
  }

  public guardarAnimal():void{
    if(this.formulario.invalid || this.imagenCargando){
      this.formulario.markAllAsTouched();
      return
    }
    
    this.api.agregarAnimal({
      ...this.formulario.value,
      imagen:this.imagen64
    }).subscribe(data=>{
      if(data){
        this.formulario.reset();
        this.formulario.updateValueAndValidity();
        this.router.navigate(['listar-admin']);
      }
    })


  }


}
