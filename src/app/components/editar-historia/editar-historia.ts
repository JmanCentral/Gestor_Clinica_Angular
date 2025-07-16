import { Component , OnInit } from '@angular/core';
import { HistoriaService } from '../../services/historia-service'; // Asegúrate de que la ruta sea correcta 
import { HistoriaClinica } from '../../models/historia'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-historia',
  imports: [FormsModule , CommonModule],
  templateUrl: './editar-historia.html',
  styleUrl: './editar-historia.css'
})
export class EditarHistoria implements OnInit {

    loading: boolean = false;
    submitting: boolean = false;
    historiaClinica: HistoriaClinica = {
    alergias: '',
    enfermedadesPrevias: '',
    observacionesGenerales: '',
    fechaCreacion: new Date(),
    antecedentes: '',
    idPaciente: 0
  };

   constructor(
    private historiaService: HistoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.historiaService.getById(id).subscribe({
        next: (data) => {
          this.historiaClinica = data;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
  
  actualizarHistoria(): void {

    this.submitting = true;
    this.historiaClinica.fechaCreacion = new Date(); 
    this.historiaService.update(this.historiaClinica.id!, this.historiaClinica).subscribe({
      next: () => {
        this.submitting = false;
        this.volver(this.historiaClinica.idPaciente);
      }
    });

  }

  volver(idPaciente:number): void {
    this.router.navigate(['/historia-clinica' , idPaciente]); 
  }

}
