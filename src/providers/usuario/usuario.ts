import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  public usuarioLogueado: any;

  constructor(public http: HttpClient) {

  }

  crearUsuario(usuario) {;
    this.usuarioLogueado = usuario;
  }

}
