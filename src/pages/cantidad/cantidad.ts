import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the CantidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cantidad',
  templateUrl: 'cantidad.html',
})
export class CantidadPage {

  formCodigo: FormGroup;
  prod: any;
  items: any;
  unidad:any;
  nombre:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servicio: ServicioProvider,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController) {

      this.prod = navParams.get('producto');

      this.nombre=this.prod.nombre;

      this.formCodigo = formBuilder.group({
  
        unidad: ['', Validators.required],
        cantidad: ['', Validators.required]
      });
  
      this.obtenerPrecios();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CantidadPage');
  }

  obtenerPrecios() {
    let seq = this.servicio.get('precio?producto='+this.prod.id);
    seq.subscribe((res) => {
      this.items = res;
      var valor = res[0].unidad;
      this.formCodigo.setValue({
        unidad:res[0].id,
        cantidad: '1',
      })

     

  

    })
  }


  gestionar() {
    

    this.servicio.get('precio/'+this.formCodigo.value.unidad).subscribe((res: any) => {
      if (this.formCodigo.valid) {
        if (this.formCodigo.value.cantidad<=0) {
          alert("No se puede ingresar cantidades igual o menor a cero")
        } else {
          this.viewCtrl.dismiss({ cantidad: this.formCodigo.value.cantidad, precio: res });
        }
        
      } else {
        alert("Completa todos los campos")
      }
    })





  }

}
