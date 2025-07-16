import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente'; 
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.pacientes}`;

  constructor(private http: HttpClient) {}

  // Agregar nuevo paciente
  add(paciente: Paciente): Observable<Paciente> {
  return this.http.post<Paciente>(`${this.apiUrl}/register`, paciente);
  }

  // Obtener todos los pacientes
  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/all`);
  }

  // Buscar paciente por nombre
  getByName(nombre: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/getByName/${nombre}`);
  }

  // Eliminar paciente por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Actualizar paciente
  update(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/update/${id}`, paciente);
  }

  getById(id: number): Observable<Paciente> {
  return this.http.get<Paciente>(`${this.apiUrl}/getId/${id}`);
}
  
}

