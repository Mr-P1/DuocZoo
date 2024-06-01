import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiZooService} from '../../Servicio/api-zoo.service';


@Component({
  selector: 'app-agregar-animal',
  templateUrl: './agregar-animal.page.html',
  styleUrls: ['./agregar-animal.page.scss'],
})
export class AgregarAnimalPage implements OnInit {

  public imagenCargando = false;
  public imagenBase64 ='';
  public formularioAnimal:FormGroup;


  constructor(
    private formB: FormBuilder,
    private apiAnimal: ApiZooService,
    private router : Router
  ) { 
    this.formularioAnimal = this.formB.group({
      imagen:['',[Validators.required]],
      nombre:['',[Validators.required]],
      raza:['',[Validators.required]],
      edad:[[Validators.required]],
      altura:[[Validators.required]],
      peso:[[Validators.required]],
      alimentacion:['',[Validators.required]],
      grupo:['',[Validators.required]],
      recinto:['',[Validators.required]]

    })
  }

  public cargarFoto(e:Event){
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files ? elemento.files[0]:null;
    console.log(archivo)

    if(archivo)
    {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () =>{
        this.imagenCargando= false;

        this.imagenBase64 = reader.result as string
      }
    }

  }

  ngOnInit() {
  }

  public agregarAnimal():void{
    if(this.formularioAnimal.invalid || this.imagenCargando){
      this.formularioAnimal.markAllAsTouched();
      return;
    }
    this.apiAnimal.agregarAnimal({
      ...this.formularioAnimal.value,
      imagen: this.imagenBase64
    })
    .subscribe(resultado=>{
      if(resultado){
        this.formularioAnimal.reset();
        this.formularioAnimal.updateValueAndValidity();

        this.router.navigate(['listar-admin']);
      }
    })
  }

}
