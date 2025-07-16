import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente-service';
import { Paciente } from '../../models/paciente'; 
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación


@Component({
  selector: 'app-editar-paciente',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-paciente.html',
  styleUrl: './editar-paciente.css'
})
export class EditarPaciente implements OnInit {

  loading: boolean = false;

  paciente: Paciente = {

    id: 0,  
    nombre: '',
    documento: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    direccionCompleta: '',
    tipoSangre: ''
  };


  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pacienteService.getById(id).subscribe({
        next: (data) => {
          this.paciente = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  actualizarPaciente(): void {
    this.loading = true;
    this.pacienteService.update(this.paciente.id!, this.paciente).subscribe({
      next: () => {
        this.volverALista();
        this.loading = false;
      },
    });
  }

  volverALista(): void {
    this.router.navigate(['/listpacientes']);  
  }

}
