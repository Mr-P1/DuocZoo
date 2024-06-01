export interface Usuarios {
    nombre:string;
    contraseña:string;
    correo:string;
    rut:string
}

export interface UsuarioID extends Usuarios {
    id:number;
}
export interface UsuarioPartial extends Partial<Usuarios>{}
