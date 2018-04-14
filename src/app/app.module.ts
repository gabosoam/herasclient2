import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConsultaPage } from '../pages/consulta/consulta';
import { VentaPage } from '../pages/venta/venta';
import { NuevoproductoPage } from '../pages/nuevoproducto/nuevoproducto';
import { AgregarstockPage } from '../pages/agregarstock/agregarstock';
import { ModificarproductoPage } from '../pages/modificarproducto/modificarproducto';
import { ServicioProvider } from '../providers/servicio/servicio';
import { PreciosproductoPage } from '../pages/preciosproducto/preciosproducto';
import { CantidadPage } from '../pages/cantidad/cantidad';
import { BuscarproductoPage } from '../pages/buscarproducto/buscarproducto';
import { HistorialPage } from '../pages/historial/historial';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { IniciarventaPage } from '../pages/iniciarventa/iniciarventa';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConsultaPage,
    VentaPage,
    AgregarstockPage,
    ModificarproductoPage,
    PreciosproductoPage,
    CantidadPage,
    BuscarproductoPage,
    HistorialPage,
    LoginPage,
    IniciarventaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConsultaPage,
    VentaPage,
    AgregarstockPage,
    ModificarproductoPage,
    PreciosproductoPage,
    CantidadPage,
    BuscarproductoPage,
    HistorialPage,
    LoginPage,
    IniciarventaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicioProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
