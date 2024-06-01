export interface Compra {
    fecha:string,
    total :number,
    detalles :Detalle[],
    idUsuario:number,
    id:number

}

export interface CompraID extends Compra {
  id: number;
}

export interface Detalle {
    id: number;
    nombre: string;
    cantidad: number;
    subtotal: number;
  }

export interface CompraPartial extends Partial<Compra>{}
  
