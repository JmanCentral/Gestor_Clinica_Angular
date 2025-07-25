import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PacienteService } from '../../services/paciente-service';
import { Paciente } from '../../models/paciente'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router'; // Importa Router para la navegación
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { FormBuilder , ReactiveFormsModule , FormGroup , FormControl, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-agregar-paciente',
  imports: [CommonModule , SelectButtonModule , ButtonModule , ReactiveFormsModule],  
  templateUrl: './agregar-paciente.html',
  styleUrl: './agregar-paciente.css'
})

export class AgregarPaciente implements OnInit {

  constructor(private pacienteService: PacienteService , private router: Router , private formBuilder: FormBuilder) {}

  loading:boolean = false;

  formPaciente!: FormGroup;

  ngOnInit(): void {
    initFlowbite(); 
    this.formPaciente = this.formBuilder.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccionCompleta: ['', Validators.required],
      tipoSangre: ['', Validators.required]
    });
  }

  agregarPaciente(): void {

    if (this.formPaciente.invalid) return;
    this.loading = true;
    const nuevoPaciente: Paciente = this.formPaciente.value;

    this.pacienteService.add(nuevoPaciente).subscribe({
      next: () => {
        this.formPaciente.reset();
        this.volverALista();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

volverALista(): void {
    this.router.navigate(['/listpacientes']);  
  }

  tiposSangre: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Opción 1: Usando Reactive Forms (Recomendado)
  miFormulario = new FormGroup({
    tipoSangre: new FormControl(''), // Valor inicial vacío
  });

  onTipoSangreChange() {
  const valorSeleccionado = this.miFormulario.get('tipoSangre')?.value;
  console.log('Tipo de sangre seleccionado:', valorSeleccionado);
}


}