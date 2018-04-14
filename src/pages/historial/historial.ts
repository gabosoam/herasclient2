import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  filtro: any;
  facturas: any;
  total: any;
  estado: any;
  usuarioLogueado:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public servicio: ServicioProvider,
    public usuario: UsuarioProvider) {
      this.usuarioLogueado= usuario.usuarioLogueado;
      this.filtro = '1';
      this.cargarFacturasHoy();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }
  cargarFacturas() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.estado = 'Todas las ventas';
    let seq = this.servicio.get('factura/todas');
    
    seq.subscribe((res: any) => {
      this.facturas = res;

      var aux = 0;
      for (let i = 0; i < res.length; i++) {
        aux += res[i].rawtotal;
      }
      this.total = aux.toFixed(2);
      loader.dismiss();
    })
  }

  cargarFacturasHoy() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.estado = 'Ventas del día de hoy';
    let seq = this.servicio.get('factura/deldia');
    seq.subscribe((res: any) => {
      this.facturas = res;

      var aux = 0;
      for (let i = 0; i < res.length; i++) {
        aux += res[i].rawtotal;
      }
      this.total = aux.toFixed(2);
      loader.dismiss();
    })
  }

  cargarFacturasSemana() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.estado = 'Ventas de la semana';
    let seq = this.servicio.get('factura/delasemana');
    seq.subscribe((res: any) => {
      this.facturas = res;

      var aux = 0;
      for (let i = 0; i < res.length; i++) {
        aux += res[i].rawtotal;
      }
      this.total = aux.toFixed(2);
      loader.dismiss();
    })
  }

  cargarFacturasMes() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.estado = 'Ventas del mes';
    let seq = this.servicio.get('factura/delmes');
    seq.subscribe((res: any) => {
      this.facturas = res;

      var aux = 0;
      for (let i = 0; i < res.length; i++) {
        aux += res[i].rawtotal;
      }
      this.total = aux.toFixed(2);
      loader.dismiss();
    })
  }

  public print() {

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + this.estado + '</h1>');
    mywindow.document.write(document.getElementById('boleta3').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

  }

  filtrar() {

    switch (this.filtro) {
      case '':

        break;

      case "1":


        this.cargarFacturasHoy();
        break;

      case "2":
        this.cargarFacturasSemana()
        break;

      case "3":
        this.cargarFacturasMes();
        break;

      case "4":
        this.cargarFacturas();
        break;

      default:
        break;
    }
  }

}
