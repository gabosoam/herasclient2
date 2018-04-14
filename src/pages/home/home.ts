import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ConsultaPage } from '../../pages/consulta/consulta';
import { VentaPage } from '../../pages/venta/venta';
import { HistorialPage } from '../historial/historial';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { IniciarventaPage } from '../iniciarventa/iniciarventa';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  consulta: any;
  venta: any;
  historial: any;
  usuarioLogueado:any;
  iniciarventa:any;

  constructor(public navCtrl: NavController,public usuario: UsuarioProvider, public alertCtrl: AlertController) {
   
  
    this.consulta = ConsultaPage;
    this.venta = VentaPage;
    this.historial = HistorialPage;
    this.iniciarventa = IniciarventaPage;

    this.usuarioLogueado= usuario.usuarioLogueado;

   
  }

  cerrarSesion(){
    let confirm = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: 'Desea continuar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
           this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
