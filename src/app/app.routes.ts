import { Routes } from '@angular/router';
import { ListarPaciente } from './components/listar-paciente/listar-paciente';  
import { EditarPaciente } from './components/editar-paciente/editar-paciente';
import { AgregarPaciente } from './components/agregar-paciente/agregar-paciente';
import { ListarHistoria } from './components/listar-historia/listar-historia';
import { AgregarHistoria } from './components/agregar-historia/agregar-historia';
import { EditarHistoria } from './components/editar-historia/editar-historia';
import { Main } from './components/main/main';        

export const routes: Routes = [

  { path: '', component:Main , pathMatch: 'full' },
  { path: 'listpacientes', component: ListarPaciente},
  { path: 'pacientes/nuevo', component: AgregarPaciente},
  { path: 'pacientes/editar/:id', component: EditarPaciente},
  { path: 'historia-clinica/:id', component: ListarHistoria},
  { path: 'historia-clinica/nueva/:id', component: AgregarHistoria},
  { path: 'historia-clinica/editar/:id', component: EditarHistoria},

];
