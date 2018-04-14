import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the AgregarstockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregarstock',
  templateUrl: 'agregarstock.html',
})
export class AgregarstockPage {

  formCodigo: FormGroup;
  prod: any;
  items: any;
  nombre: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public servicio: ServicioProvider,
    public viewCtrl: ViewController
  ) {

    this.prod = navParams.get('producto');
    this.nombre=this.prod.nombre;

    this.formCodigo = formBuilder.group({
   
      unidad: ['', Validators.required,],
      cantidad: ['1', Validators.required]
    });

    this.obtenerPrecios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarstockPage');
  }

  obtenerPrecios() {

    let seq = this.servicio.get('precio?producto='+this.prod.id);

    seq.subscribe((res:any) => {
    


      this.items = res;

      this.formCodigo.setValue({
        unidad: this.items[0].tamano,
        cantidad: '1',
      })
    })
  }

  gestionar(){
    var total = this.formCodigo.value.cantidad/this.formCodigo.value.unidad;
  

    if (this.formCodigo.valid) {
      this.viewCtrl.dismiss({id: this.prod.id, stock: total});
    } else {
      
    }
    
  }

}
