import { Component , OnInit  } from '@angular/core';
import { PacienteService } from '../../services/paciente-service';
import { Paciente } from '../../models/paciente'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-paciente',
  imports: [FormsModule , CommonModule, ReactiveFormsModule],  
  templateUrl: './listar-paciente.html',
  styleUrl: './listar-paciente.css'
})
export class ListarPaciente implements OnInit {

  private suscripciones: Subscription = new Subscription();

  pacientes: Paciente[] = [];
  busquedaNombre: string = '';
  busquedaControl = new FormControl('');
  loading: boolean = false;

  constructor(private pacienteService: PacienteService , private router: Router,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { 
    console.log('Inicializando ListarPaciente');
    this.cargarPacientes();
    this.inicializarBusquedaReactiva();
    
  }

 cargarPacientes(): void {
  this.loading = true;

   const sub1  = this.pacienteService.getAll()
    .pipe(finalize(() => {
      this.loading = false;
      this.cdr.detectChanges(); 
    }))
    .subscribe({
      next: data => {
        this.pacientes = data;
      }
    });
    this.suscripciones.add(sub1);
}


inicializarBusquedaReactiva(): void {
  const sub2 = this.busquedaControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(nombre => {
      const termino = nombre?.trim();
      if (!termino) {
        return this.pacienteService.getAll(); 
      }
      return this.pacienteService.getByName(termino);
    })
  ).subscribe({
    next: data => {
      this.pacientes = data;
      this.cdr.detectChanges();
    },

  });
  this.suscripciones.add(sub2);
}


  buscarPaciente(nombre: string): void {
    if (!nombre.trim()) {
      this.cargarPacientes();
      return;
    }

    const sub3 = this.pacienteService.getByName(nombre).subscribe({
      next: data => { this.pacientes = data;
      this.cdr.detectChanges();
      },

    });

    this.suscripciones.add(sub3);
  }


    confirmarEliminacion(id: number): void {
      Swal.fire({
        title: '¿Estás seguro de eliminar esta historia clínica?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          this.eliminarPaciente(id);
        }
      });
  }

  mensajeConfirmacion(): void {
    Swal.fire({
      title: 'Paciente eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  eliminarPaciente(id: number): void {

   const sub4 = this.pacienteService.delete(id).subscribe({
      next: () => {
        this.mensajeConfirmacion();
        this.cargarPacientes();
      },

    });
    this.suscripciones.add(sub4);
  }

  modificarPaciente(id: number): void {
    this.router.navigate(['/pacientes/editar', id]);
  }

  verHistoriaClinica(id: number ,  nombre: string): void {
    this.router.navigate(['/historia-clinica', id], {queryParams: { nombre}});
  }
  
  nuevoPaciente(): void {
    this.router.navigate(['/pacientes/nuevo']);
  }

  volverAlMenu(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.suscripciones.unsubscribe();
    console.log('Suscripciones canceladas');
  }

}
