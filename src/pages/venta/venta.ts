import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { CantidadPage } from '../cantidad/cantidad';
import { BuscarproductoPage } from '../buscarproducto/buscarproducto';
import { UsuarioProvider } from '../../providers/usuario/usuario';



/**
 * Generated class for the VentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venta',
  templateUrl: 'venta.html',
})
export class VentaPage {


  currentItems: any;
  public items: any;
  cantidad: any;
  factura: any;
  fecha: any;
  cliente: any;
  cbxProducto: any;
  detalles: any;
  total: any;
  recibido: any;
  vuelto: any;
  isReadyToSave: boolean;
  form: FormGroup;
  form2: FormGroup;
  usuarioLogueado:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    public servicio: ServicioProvider,
    public modalCtrl: ModalController,
    public usuario: UsuarioProvider,
    public alertCtrl: AlertController, ) {
      this.usuarioLogueado= usuario.usuarioLogueado;
    this.factura = { id: 0 };
    this.cliente = "1";




    this.form = formBuilder.group({
      name: ['', Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.refrescar();

   


  }

  ionViewDidLoad() {

  }

  refrescar() {
    var data = [];
    this.detalles = data;
    this.servicio.post('factura', { usuario: this.usuarioLogueado.id.nombre }).subscribe((res) => {
      this.factura = res;
      this.obtenerDetalles(this.factura.id).subscribe(res => {
        this.detalles = res;
        this.calcularTotal();
      });
      var fecha = new Date(this.factura.createdAt);
      this.fecha = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    });
  }


  obtenerDetalles(factura) {

    this.form.setValue({
      name: ''
    })


    let seq = this.servicio.get('detalle/obtenerdetalle?factura=' + factura);
    seq.subscribe((res: any) => {
      this.detalles = res;
      this.calcularTotal();
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
      } else {
      }
    }, err => {
    });
    return seq;
  }

  calcularTotal() {
    var detalle = this.detalles;
    var aux = 0.00;
    for (let index = 0; index < detalle.length; index++) {
      aux += parseFloat(detalle[index].rawtotal);
    }
    this.total = 0.00;
    this.total = aux.toFixed(2);

  }

  cambiarCliente() {

    let seq = this.servicio.put('factura/' + this.factura.id, { cliente: this.cliente });

    seq.subscribe((res: any) => {

    }, error => {

    })

  }

  buscarCodigo() {
    if (!this.form.valid) { return; }

    this.servicio.get('producto?codigo=' + this.form.value.name + '&estado=1').subscribe((resultado: any) => {
      if (resultado.length > 0) {

        //  let addModal = this.modalCtrl.create('ItemCreatePage');
        let addModal = this.modalCtrl.create(CantidadPage, { producto: resultado[0] });
        addModal.onDidDismiss(data => {
          if (data) {
            var detalle = {
              factura: this.factura.id,
              cantidad: data.cantidad,
              producto: resultado[0].id,
              precio: data.precio.precio,
              unidad: data.precio.unidad.nombre,
              reducir: data.cantidad / data.precio.tamano
            }


            if (data.cantidad / data.precio.tamano > resultado[0].stock) {

              let confirm = this.alertCtrl.create({
                title: 'Atención!',
                message: 'Tienes menos stock del solicitado. Deseas continuar?',
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: () => {
                      this.servicio.post('detalle/', detalle).subscribe((res: any) => {

                        this.obtenerDetalles(this.factura.id);
                      })
                    }
                  },
                  {
                    text: 'Cancelar',
                    handler: () => {
                      
                    }
                  }
                ]
              });
              confirm.present();
            } else {


              this.servicio.post('detalle/', detalle).subscribe((res: any) => {

                this.obtenerDetalles(this.factura.id);
              })
            }



          }


        })
        addModal.present();
      } else {
        alert('No existe el código ingresado')
      }
    })




  }

  borrarDetalle(detalle) {

    let confirm = this.alertCtrl.create({
      title: 'Eliminar ítem',
      message: 'Está seguro que desea eliminar el ítem?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.servicio.delete('detalle/' + detalle).subscribe(data => {
              this.obtenerDetalles(this.factura.id);
            });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        }
      ]
    });
    confirm.present();

   


  }


  buscar() {
    //  let addModal = this.modalCtrl.create('ItemCreatePage');
    let addModal = this.modalCtrl.create(BuscarproductoPage);
    addModal.onDidDismiss(producto => {
      if (producto) {
        let addModal = this.modalCtrl.create(CantidadPage, { producto: producto });
        addModal.onDidDismiss(data => {
          if (data) {
            var detalle = {
              factura: this.factura.id,
              cantidad: data.cantidad,
              producto: producto.id,
              precio: data.precio.precio,
              unidad: data.precio.unidad.nombre,
              reducir: data.cantidad / data.precio.tamano
            }

            this.servicio.post('detalle/', detalle).subscribe((res: any) => {

              this.obtenerDetalles(this.factura.id);
            })
          }


        })
        addModal.present();

      }
    })
    addModal.present();
  }



  comprobante() {
    if (this.total == 0) {
      let alert = this.alertCtrl.create({
        title: 'Alerta!',
        subTitle: JSON.stringify('No se puede imprimir un comprobante sin detalle '),
        buttons: ['OK']
      });
      alert.present();
    } else {

      let confirm = this.alertCtrl.create({
        title: 'Desea continuar?',
        message: 'Al cerrar la venta no podrás agregar o quitar productos',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.print();
              this.refrescar();
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              
            }
          }
        ]
      });
      confirm.present();







    }

  }

  sincomprobante() {
    if (this.total == 0) {
      let alert = this.alertCtrl.create({
        title: 'Alerta!',
        subTitle: JSON.stringify('No se puede imprimir un comprobante sin detalle '),
        buttons: ['OK']
      });
      alert.present();
    } else {

      let confirm = this.alertCtrl.create({
        title: 'Desea continuar?',
        message: 'Al cerrar la venta no podrás agregar o quitar productos',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.refrescar();
            }
          },
          {
            text: 'Cancelar',
            handler: () => {

             
            }
          }
        ]
      });
      confirm.present();

    }


  }

  calcular() {

    this.vuelto = (this.recibido - this.total).toFixed(2);

  }


  public print() {

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');


    mywindow.document.write('</head><body >');

    mywindow.document.write(document.getElementById('boleta2').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;

  }


}
