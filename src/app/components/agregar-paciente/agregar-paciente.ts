import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { PacienteService } from '../../services/paciente-service';
import { Paciente } from '../../models/paciente'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para la navegación


@Component({
  selector: 'app-agregar-paciente',
  imports: [FormsModule , CommonModule],  
  templateUrl: './agregar-paciente.html',
  styleUrl: './agregar-paciente.css'
})

export class AgregarPaciente implements OnInit {

  loading:boolean = false;

  paciente: Paciente = {
    
    nombre: '',
    documento: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    direccionCompleta: '',
    tipoSangre: ''
  };


  constructor(private pacienteService: PacienteService , private router: Router) {}

  ngOnInit(): void {}

  agregarPaciente(): void {
    this.loading = true;
    this.pacienteService.add(this.paciente).subscribe({
      next: () => {
        this.paciente = {
          nombre: '',
          documento: '',
          correo: '',
          telefono: '',
          fechaNacimiento: '',
          direccionCompleta: '',
          tipoSangre: ''
        };

        this.volverALista();
        this.loading = false;
      },
    });
  }

volverALista(): void {
    this.router.navigate(['/listpacientes']);  
  }


}