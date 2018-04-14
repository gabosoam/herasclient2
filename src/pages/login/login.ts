import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { nombre: string, contrasena: string } = {
    nombre: '',
    contrasena: ''
  };

  public usuario: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servicio: ServicioProvider,
    public usuarioLogueado: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {


    let seq = this.servicio.post('login', this.account);

    seq.subscribe((res: any) => {
      this.usuarioLogueado.crearUsuario(res);
      this.navCtrl.setRoot(HomePage);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
