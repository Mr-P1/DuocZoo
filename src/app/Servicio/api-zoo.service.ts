import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject, delay, } from 'rxjs';
import {AnimalID,Animales,AnimalParcial} from '../Modelos/animales';
import {Usuarios,UsuarioID, UsuarioPartial} from '../Modelos/usuarios';
import { Compra, CompraID, CompraPartial } from '../Modelos/compra';
import { Apadrinamientos } from '../Modelos/apadrinamientos';

@Injectable({
  providedIn: 'root'
})
export class ApiZooService {


  public urlUsuarios = 'https://impartial-psychedelic-maiasaura.glitch.me/Usuarios';
  public urlAnimales = 'https://impartial-psychedelic-maiasaura.glitch.me/Animales';
  public urlTickets = 'https://impartial-psychedelic-maiasaura.glitch.me/Tickets';
  public urlCompras ='https://impartial-psychedelic-maiasaura.glitch.me/Compras';
  public urlApadrinamientos ='https://impartial-psychedelic-maiasaura.glitch.me/Apadrinamientos';

  public urlFicha = 'https://cord-heavenly-router.glitch.me/Historiales';
  public urlTratamiento ='https://cord-heavenly-router.glitch.me/AnimalEnfermo';
  public urlAnimalEnfermo = 'https://cord-heavenly-router.glitch.me/AnimalEnfermo';
  

  private comLista = new BehaviorSubject<Array<AnimalID>>([]);
  public listaAnimales = this.comLista.asObservable();
  private paginaActual = 1;

  constructor(
    private cliente: HttpClient
  ) { }

  public listarPrimerosElementos(){
    this.cliente.get<Array<AnimalID>>(`${this.urlAnimales}?_page=1`)
    .subscribe(data=>{
      this.paginaActual = this.paginaActual +1;
      this.comLista.next(data);
    })
  }

   

  public obtenerMasElementos(){
    this.cliente.get<Array<AnimalID>>(`${this.urlAnimales}?_page=${this.paginaActual}`)
    .pipe(
      delay(3000)
    ).subscribe(data=>{
      if(data){
        this.paginaActual= this.paginaActual +1 ;
        this.comLista.next(this.comLista.getValue().concat(data));
      }
    })
  }

  public obtenerAnimalPorID(id: number): Observable<AnimalID | null> {
    return this.cliente.get<AnimalID | null>(`${this.urlAnimales}/${id}`);
  }

  public obtenerFichaPorID(id: number): Observable<AnimalID | null> {
    return this.cliente.get<AnimalID | null>(`${this.urlFicha}?idFicha=${id}`);
  }

  public obtenerUsuarioPorID(id:any): Observable<UsuarioID | null>{
    return this.cliente.get<UsuarioID>(`${this.urlUsuarios}/${id}`);
  }

  public obtenerCompraPorID(id:number):Observable<CompraID|null>{
    return this.cliente.get<CompraID| null>(`${this.urlCompras}/${id}`);
  }

  
  public obtenerCompra(id: any): Observable<CompraID| null> {
    return this.cliente.get<CompraID>(`${this.urlCompras}?idUsuario=${id}`)
  }

  public enviarTratamiento(animal: any) {
    return this.cliente.post(this.urlTratamiento, animal, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public agregarAnimal (animal: Animales) {
    return this.cliente.post(this.urlAnimales, animal, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public realizarCompra (compra:any) {
    return this.cliente.post(this.urlCompras, compra, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }

  public apadrinarAnimal(apadrinamiento:Apadrinamientos){
    return this.cliente.post(this.urlApadrinamientos, apadrinamiento,{
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }

  public eliminarAnimalPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.urlAnimales}/${id}`)
  }

  public modificarAnimalPorID(id: number, payload: AnimalParcial): Observable<any> {
    return this.cliente.patch(`${this.urlAnimales}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }

  public modificarCompra(id:number,payload:CompraPartial):Observable<any>{
    return this.cliente.patch(`${this.urlCompras}/${id}`,payload,{
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }


  public AgregarUsuario(usuario: Usuarios) {
    return this.cliente.post(`${this.urlUsuarios}`,usuario,{
      headers:{
        'Content-Type':'application/json;charset=utf-8'
      }
    })
  }


  public nombreUsuario(nombre:any) {
    localStorage.setItem('usuario', nombre);
  }

  public retornarNombre() {
    return localStorage.getItem('usuario');
  }

  public idUSuario(id:any) {
    localStorage.setItem('ID', id);
  }

  public retornarId() {
    return localStorage.getItem('ID');
  }
  public getId(){
    return localStorage.getItem('ID');
  }

  public borrarStorage(){
    localStorage.clear();
  }

  public cambiarPorID(id:any, playload:UsuarioPartial):Observable<any>{
    return this.cliente.patch(`${this.urlUsuarios}/${id}`,playload,{
      headers:{
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  }



  public obtenerApadrinamiento(idUsuario:any,idAnimal:any):Observable<Apadrinamientos>{
    return this.cliente.get<Apadrinamientos>(`${this.urlApadrinamientos}?idUsuario=${idUsuario}&idAnimal=${idAnimal}`)
  }

}
