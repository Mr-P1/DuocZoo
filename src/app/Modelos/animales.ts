export interface Animales {
    imagen: string;
    nombre: string;
    raza: string;
    edad: number;
    altura: number;
    peso:number;
    alimentacion:string;
    grupo:string;
    recinto:string;

}


export interface AnimalID extends Animales {
    id: number;
}
  
export interface AnimalParcial extends Partial<Animales>{}
  
