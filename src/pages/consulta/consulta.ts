import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { AgregarstockPage } from '../../pages/agregarstock/agregarstock';
import { ModificarproductoPage } from '../../pages/modificarproducto/modificarproducto';
import { PreciosproductoPage } from '../preciosproducto/preciosproducto';
import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the ConsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {

  marcas: any;
  // Our local settings object
  options: any;
  cbxProducto: any;
  cbxCodigo: any;
  settingsReady = false;
  categorias: any;
  filtro: any
  filtroCategoria: any
  filtroMarca: any
  resultado: any

  form: FormGroup;
  formCodigo: FormGroup;
  codigo: any;
  productos: any;
  usuarioLogueado:any;

  buscador: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private servicio: ServicioProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public usuario: UsuarioProvider) {

      this.usuarioLogueado= usuario.usuarioLogueado;

 

      

    this.form = formBuilder.group({
      name: ['', Validators.required]
    });

    this.formCodigo = formBuilder.group({
      name: ['', Validators.required]
    });
    this.filtro = '';
    this.filtroCategoria = '';
    this.filtroMarca = '';
    this.resultado = 'Realice una búsqueda'

    this.cargarCategorias();
    this.cargarMarcas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultaPage');
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


  buscarCodigo() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.buscador = "codigo";
    let seq = this.servicio.get('producto?codigo=' + this.formCodigo.value.name + '&estado=1');
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      loader.dismiss();
      this.productos = res;
    }, err => {
      console.error('ERROR', err);
      loader.dismiss();
    });

  }


  buscarPorNombre() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    this.buscador = "nombre";
    let seq = this.servicio.get('producto?where={"nombre":{"contains":"' + this.form.value.name + '"},"estado":{"contains":"1"}}');
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      this.productos = res;
      loader.dismiss();
    }, err => {
      loader.dismiss();
      console.error('ERROR', err);
    });
  }


  filtrar() {

    switch (this.filtro) {
      case '':

        break;

      case "1":


        this.cargarCero();
        break;

      case "2":
        alert('caso 2');
        break;

      case "3":
        this.todosProductos();
        break;

      case "4":
        this.productosSinPrecio();
        break;

      default:
        break;
    }
  }

  cargarCero() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    let seq = this.servicio.get('producto?stock=0 ');
    seq.subscribe((res: any) => {
      this.productos = res;
      this.resultado = res.length + " resultado(s)"
      loader.dismiss();
    })
  }

  todosProductos() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    let seq = this.servicio.get('producto');
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      this.productos = res;
      loader.dismiss();
    })
  }

  productosSinPrecio() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();
    let seq = this.servicio.get('producto?precio=0');
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      this.productos = res;
      loader.dismiss();
    })
  }

  cargarPorCategoria() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();

    let seq = this.servicio.get('producto?categoria= ' + this.filtroCategoria);
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      this.productos = res;
      loader.dismiss();
    })
  }

  cargarPorMarca() {
    let loader = this.loadingCtrl.create({
      content: "Espere por favor.",
    });
    loader.present();

    let seq = this.servicio.get('producto?marca= ' + this.filtroMarca);
    seq.subscribe((res: any) => {
      this.resultado = res.length + " resultado(s)"
      this.productos = res;
      loader.dismiss();
    })
  }

  public print() {

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById('boleta').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

  }

  crearProducto() {
    //  let addModal = this.modalCtrl.create('ItemCreatePage');
    let addModal = this.modalCtrl.create('NuevoproductoPage');
    addModal.onDidDismiss(producto => {
      if (producto) {

        this.codigo = producto.codigo
        this.buscarCodigo2(producto.codigo);

      }
    })
    addModal.present();
  }

  agregarStock(producto) {

    //  let addModal = this.modalCtrl.create('ItemCreatePage');
    let addModal = this.modalCtrl.create(AgregarstockPage, { producto: producto });
    addModal.onDidDismiss(data => {
      if (data) {
        let seq = this.servicio.get('producto/modificarstock?id=' + data.id + '&stock=' + data.stock);

        seq.subscribe(res => {
          this.buscarCodigo2(producto.codigo);
        })
      }
    })
    addModal.present();
  }

  buscarCodigo2(codigo) {
    console.log(codigo)
    this.buscador = "codigo";
    let seq = this.servicio.get('producto?codigo=' + codigo + '&estado=1');
    seq.subscribe((res: any) => {

      this.resultado = res.length + " resultado(s)"
      this.productos = res;
    }, err => {
      console.error('ERROR', err);
    });

  }

  modificarItem(producto) {
    //  let addModal = this.modalCtrl.create('ItemCreatePage');
    let addModal = this.modalCtrl.create(ModificarproductoPage, { producto: producto });
    addModal.onDidDismiss(producto => {
      if (producto) {
        let seq = this.servicio.put('producto/' + producto.id, producto);

        seq.subscribe((res: any) => {
          if (res) {
            this.buscarCodigo2(res.codigo);
          }
        })
      }
    })
    addModal.present();
  }

  listarPrecios(producto) {
    //  let addModal = this.modalCtrl.create('ItemCreatePage');
    let addModal = this.modalCtrl.create(PreciosproductoPage, { producto: producto });
    addModal.onDidDismiss(producto => {
      if (producto) {

        let seq = this.servicio.put('producto/' + producto.id, producto);

        seq.subscribe(res => {


        })
      }
    })
    addModal.present();
  }

  desactivarItem(producto) {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar este producto?',
      message: 'Está seguro que desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            if (producto) {

              let seq = this.servicio.put('producto/' + producto.id, { estado: 0 });


              seq.subscribe(res => {


                this.buscarCodigo2(producto.codigo);



              })
            }

          }
        }
      ]
    });
    confirm.present();




  }



}
