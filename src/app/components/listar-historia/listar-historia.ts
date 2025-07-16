import { Component , OnInit , Input } from '@angular/core';
import { HistoriaService } from '../../services/historia-service'; // Asegúrate de que la ruta sea correcta 
import { HistoriaClinica } from '../../models/historia'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PacienteService } from '../../services/paciente-service';


@Component({
  selector: 'app-listar-historia',
  imports: [FormsModule , CommonModule],
  templateUrl: './listar-historia.html',
  styleUrl: './listar-historia.css'
})

export class ListarHistoria implements OnInit {

   historiaClinica?: HistoriaClinica;
   idPaciente?: number;
   mostrarInfoHistoria = false;
   loading: boolean = false;
   nombrePaciente: string = '';
   
  constructor(
    private historiaService: HistoriaService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.recuperarIdDeRuta();
  }

  recuperarIdDeRuta(): void {

    this.route.params.subscribe(params => {
      this.idPaciente = +params['id']; 
      if (this.idPaciente) {
        this.cargarHistoriaClinicaDelPaciente(this.idPaciente);
      } else {
        console.error('❌ ID de historia clínica no proporcionado en la ruta');
      }
    });
    
    this.route.queryParams.subscribe(params => {
    this.nombrePaciente = params['nombre'];
  });
  }


  cargarHistoriaClinicaDelPaciente(idPaciente: number):void {
    this.loading = true; 
    this.historiaService.getAllByPacienteId(idPaciente).subscribe({
      next: (historia) => {
        if (historia) {
          this.historiaClinica = historia;
          this.mostrarInfoHistoria = true;
          this.loading = false; 
          this.cdr.detectChanges();
        } else {
          this.crearNuevaHistoria(idPaciente);
        }
      },
    });
  }

  editarHistoria(id: number) {
    if (id) {
    this.router.navigate(['/historia-clinica/editar', id]);
  } else {
    console.error('❌ ID de paciente no proporcionado para crear nueva historia clínica');
  }
  }

  confirmarEliminacion(id: number, idPaciente: number): void {
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
        this.eliminarHistoria(id, idPaciente);
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


  eliminarHistoria(id: number, idPaciente: number): void {
    this.historiaService.delete(id).subscribe({
      next: () => {
        this.volverALista(idPaciente);
        this.cdr.detectChanges(); 
      },
    });
}


  crearNuevaHistoria(idPaciente: number) {
  if (idPaciente) {
    this.router.navigate(['/historia-clinica/nueva', idPaciente]);
  } else {
    console.error('❌ ID de paciente no proporcionado para crear nueva historia clínica');
  }
}

  volver() {
    this.router.navigate(['/listpacientes']);
  }

  volverALista(idPaciente: number) {
    this.router.navigate(['/historia-clinica', idPaciente]);
  }
}
