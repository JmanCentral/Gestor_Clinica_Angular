import { Component , OnInit } from '@angular/core';
import { HistoriaService } from '../../services/historia-service'; 
import { HistoriaClinica } from '../../models/historia'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente-service';

@Component({
  selector: 'app-agregar-historia',
  imports: [FormsModule , CommonModule],
  templateUrl: './agregar-historia.html',
  styleUrl: './agregar-historia.css'
})
export class AgregarHistoria implements OnInit {

  loading: boolean = false;

  historiaClinica: HistoriaClinica = {
    alergias: '',
    enfermedadesPrevias: '',
    observacionesGenerales: '',
    fechaCreacion: new Date(),
    antecedentes: '',
    idPaciente: 0
  };

  idPaciente?: number;
  nombrePaciente: string = '';

  constructor(
    private historiaService: HistoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.recuperarIdDeRuta();
    
  }

  recuperarIdDeRuta(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id) && id > 0) {
        this.idPaciente = id;
        this.historiaClinica.idPaciente = id;  
        this.cargarNombrePaciente(this.idPaciente);
      } else {
        console.error('❌ ID de paciente inválido en la ruta');
      }
    });
  }

  cargarNombrePaciente(id: number): void {
  this.pacienteService.getById(id).subscribe({
    next: (paciente) => {
      this.nombrePaciente = paciente.nombre;
      this.cdr.detectChanges();
    },
  });
}

  crearHistoriaForm(): void {

    this.loading = true; 
    this.historiaClinica.fechaCreacion = new Date(); 

    this.historiaService.add(this.historiaClinica).subscribe({
      next: () => {
          this.volver(this.historiaClinica.idPaciente);
          this.loading = false; 
      },
    });
  }

  volver(idPaciente: number): void {
    this.router.navigate(['/historia-clinica' , idPaciente]); 
  }

  volverListadoPacientes(): void {
    this.router.navigate(['/listpacientes']);
}
}

