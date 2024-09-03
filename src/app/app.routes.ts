import { Routes } from '@angular/router';
import { DatosClienteComponent } from './components/datos-cliente/datos-cliente.component';
import { BuscarClienteComponent } from './components/buscar-cliente/buscar-cliente.component';

export const routes: Routes = [
  {
    path: 'buscar-cliente',
    component: BuscarClienteComponent
  },
  {
    path: 'cliente',
    component: DatosClienteComponent
  },
  {
    path: '**',
    redirectTo: '/buscar-cliente'
  }
];
