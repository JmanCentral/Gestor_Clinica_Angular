import { Routes } from '@angular/router';

export const routes: Routes = [
  
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login)},
  { path: 'registro', loadComponent: () => import('./components/registro/registro').then(m => m.Registro)},

  {
    path: '',
    loadComponent: () => import('./components/dashboardlayout/dashboardlayout').then(m => m.Dashboardlayout),
    children: [
      { path: 'listpacientes', loadComponent: () => import('./components/listar-paciente/listar-paciente').then(m => m.ListarPaciente) },
      { path: 'pacientes/nuevo', loadComponent: () => import('./components/agregar-paciente/agregar-paciente').then(m => m.AgregarPaciente)},
      { path: 'pacientes/editar/:id', loadComponent: () => import('./components/editar-paciente/editar-paciente').then(m => m.EditarPaciente)},
      { path: 'historia-clinica/:id', loadComponent: () => import('./components/listar-historia/listar-historia').then(m => m.ListarHistoria) },
      { path: 'historia-clinica/nueva/:id', loadComponent: () => import('./components/agregar-historia/agregar-historia').then(m => m.AgregarHistoria) },
      { path: 'historia-clinica/editar/:id', loadComponent: () => import('./components/editar-historia/editar-historia').then(m => m.EditarHistoria)},
    ]
  },

  
  { path: '**', redirectTo: 'login' }
];
