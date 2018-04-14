import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the ModificarproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarproducto',
  templateUrl: 'modificarproducto.html',
})
export class ModificarproductoPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  producto: any;
  marcas: any;
  categorias: any;
  unidades: any

  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicio: ServicioProvider,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,) {

    this.cargarMarcas();
    this.cargarCategorias();
    this.cargarUnidades();

    this.producto = navParams.get('producto');
    this.form = formBuilder.group({
      id: [this.producto.id, Validators.required],
      codigo: [this.producto.codigo, Validators.required],
      nombre: [this.producto.nombre, Validators.required],
      precio: [this.producto.precio, Validators.required],
      marca: [this.producto.marca.id, Validators.required],
      categoria: [this.producto.categoria.id, Validators.required],
      minimo: [this.producto.minimo, Validators.required],
      unidad: [this.producto.unidad.id, Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarproductoPage');
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

  modificarProducto() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

}
