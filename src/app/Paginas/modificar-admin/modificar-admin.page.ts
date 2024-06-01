import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiZooService } from '../../Servicio/api-zoo.service';


@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.page.html',
  styleUrls: ['./modificar-admin.page.scss'],
})
export class ModificarAdminPage implements OnInit {

  public imagenCargando = false;
  public imagenBase64 = '';
  public formulario: FormGroup;
  public idActiva = 0;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private api: ApiZooService,
    private formB: FormBuilder,
    private http: HttpClient
  ) {
    this.formulario = this.formB.group({
      imagen: ['', [Validators.required]],
      nombre: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(15)]],
      raza: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(15)]],
      edad: [[Validators.required]],
      altura: [[Validators.required]],
      peso: [[Validators.required]],
      alimentacion: ['', [Validators.required]],
      grupo: ['', [Validators.required]],
      recinto: ['', [Validators.required]]

    })
  }

  public cargarFoto(e: Event) {
    this.imagenCargando = true;
    const elemento = e.target as HTMLInputElement;
    const archivo = elemento.files ? elemento.files[0] : null;
    console.log(archivo)

    if (archivo) {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        this.imagenCargando = false;

        this.imagenBase64 = reader.result as string
      }
    }

  }


  ngOnInit() {
    this.rutaActiva.paramMap.subscribe(parametros => {
      this.idActiva = +parametros.get('idAnimal')!;
      this.api.obtenerAnimalPorID(this.idActiva)
        .subscribe(animal => {
          if (animal) {
            this.imagenBase64 = animal.imagen;
            this.formulario.setValue({
              ...animal
            });
           
            this.formulario.updateValueAndValidity();
          }
          else {
            this.router.navigate(['']);
          }
        })
    })
  }

  public modificarAnimal() {
    if (this.formulario.invalid || this.imagenCargando) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.api.modificarAnimalPorID(this.idActiva, {
      ...this.formulario.value,
      imagen: this.imagenBase64
    }).subscribe(datos => {
      if (datos) {
        alert('Modificado')
        this.router.navigate(['listar-admin']);
      }
    })
  }

}
