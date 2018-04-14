import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the NuevoproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevoproducto',
  templateUrl: 'nuevoproducto.html',
})
export class NuevoproductoPage {

  currentItems: any = [];

  cbxProducto: any;

  marcas: any;
  categorias: any;
  unidades: any;
  form: FormGroup;
  form2: FormGroup;
  validador: boolean;
  idProducto: any;
  selectOptions: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,

    public servicio: ServicioProvider,
    formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {

      this.form2 = formBuilder.group({
        name: ['', Validators.required]
      });
  
      this.validador = false;
  
  
      this.form = formBuilder.group({
        codigo: ['', Validators.required],
        nombre: [null, Validators.required],
        marca: ['', Validators.required],
        categoria: ['', Validators.required],
        precio: ['', Validators.required],
        stock: ['1', Validators.required],
        minimo: ['0', Validators.required],
        unidad: ['', Validators.required],
        estado: ['1', Validators.required],
  
      });
  
      this.cargarCategorias();
      this.cargarMarcas();
      this.cargarUnidades();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoproductoPage');
  }

  cargarCategorias() {
    let seq = this.servicio.get("categoria?sort=nombre asc");
    seq.subscribe(res => {
      this.categorias = res;
    })
  }

  cargarMarcas() {
    let seq = this.servicio.get("marca?sort=nombre asc");

    seq.subscribe(res => {
      this.marcas = res;
    })
  }

  cargarUnidades() {
    let seq = this.servicio.get("unidad?sort=nombre asc");

    seq.subscribe(res => {
      this.unidades = res;
    })
  }

  registrar() {
    if (!this.form.valid) {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Todos los campos son obligatorios',
        buttons: ['OK']
      });
      alert.present();
    } else {
      let seq = this.servicio.post('producto', this.form.value);
     

      seq.subscribe((res: any) => {
        let alert = this.alertCtrl.create({
          title: 'Éxito!',
          subTitle: 'Se guardo el producto satisfactoriamente',
          buttons: ['OK']
        });
        alert.present();

        this.viewCtrl.dismiss(res);

      }, err => {
        console.log(err);

        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Comprueba que la información ingresada es correcta ',
          buttons: ['OK']
        });
        alert.present();
        // this.viewCtrl.dismiss(this.form.value);
      });

    }

  }


  

}
