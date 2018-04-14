import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';

/**
 * Generated class for the PreciosproductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preciosproducto',
  templateUrl: 'preciosproducto.html',
})
export class PreciosproductoPage {

  form: FormGroup;
  checked: boolean;
  formCodigo: FormGroup;
  prod: any;
  unidad: any;
  precio: any;
  tamano: any;
  unidades: any;
  items: any;
  id: any;
  accion: any;
  producto: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public servicio: ServicioProvider) {

    this.prod = navParams.get('producto');
    this.obtenerPrecios();
    this.obtenerUnidades();
    this.accion = 'nuevo';
    this.checked = false;



    this.formCodigo = formBuilder.group({
      id: [''],
      unidad: ['', Validators.required],
      precio: ['', Validators.required],
      tamano: ['', Validators.required],
      producto: [this.prod.id, Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreciosproductoPage');
  }

  obtenerPrecios() {
    let seq = this.servicio.get('precio?producto=' + this.prod.id);
    seq.subscribe((res) => {
      this.items = res;
    })
  }

  obtenerUnidades() {
   

    this.servicio.get('unidad?sort=nombre').subscribe(resultado => {
  
      this.unidades = resultado;
    })
  }

  gestionar() {
    if (this.formCodigo.invalid) {
    }
    else {
      switch (this.accion) {
        case 'editar':
        if (this.formCodigo.value.tamano<=0 || this.formCodigo.value.precio<=0) {
          alert("No se puede ingresar valores igual o menores a cero")
        } else {
          let seq = this.servicio.put('precio/'+this.formCodigo.value.id,this.formCodigo.value);
      
          seq.subscribe((res) => {
            this.obtenerPrecios();
            this.unidad = "";
            this.precio = "";
            this.tamano = "";
            this.id = "";
            this.nuevo();
          })
        }
          break;
        case 'nuevo':
          if (this.formCodigo.value.tamano<=0 || this.formCodigo.value.precio<=0) {
            alert("No se puede ingresar valores igual o menores a cero")
          } else {


            let seq2 = this.servicio.post('precio',{
              producto: this.formCodigo.value.producto,
              unidad: this.formCodigo.value.unidad,
              tamano: this.formCodigo.value.tamano,
              precio: this.formCodigo.value.precio,
            });
          
              seq2.subscribe((res) => {
           
                this.obtenerPrecios();
                this.unidad = "";
                this.precio = "";
                this.tamano = "";
                this.id = "";
              })
            
          }

        
          break;
      }

    }
  }

  nuevo() {
    
    this.accion = "nuevo"
    this.unidad = "";
    this.precio = "";
    this.tamano = "";
    this.id = "";
  }

  editar(producto) {
    
    this.accion = "editar";

    this.checked = true;
    this.id = producto.id;
    this.producto = producto.producto;
    this.unidad = producto.unidad.id;
    this.precio = producto.precio;
    this.tamano = producto.tamano;
  }

  eliminar(producto) {
    let seq = this.servicio.delete('precio/'+producto.id);
   
    seq.subscribe((res)=>{
      this.obtenerPrecios();
    })
  }

}
