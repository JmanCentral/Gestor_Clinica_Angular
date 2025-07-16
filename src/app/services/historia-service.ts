import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoriaClinica } from '../models/historia'; 
import { API_CONFIG } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.historia}`;

  constructor(private http: HttpClient) { 
  }

  // Agregar nueva historia clínica
  add(historia: HistoriaClinica): Observable<HistoriaClinica> {
    return this.http.post<HistoriaClinica>(`${this.apiUrl}/register`, historia);
  }

  // Obtener todas las historias clínicas poe paciente
  getAllByPacienteId(pacienteId: number): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(`${this.apiUrl}/getIdPaciente/${pacienteId}`);
  }

  // Buscar historia clínica por ID
  getById(id: number): Observable<HistoriaClinica> {
    return this.http.get<HistoriaClinica>(`${this.apiUrl}/get/${id}`);
  }

  // Actualizar historia clínica
  update(id: number, historia: HistoriaClinica): Observable<HistoriaClinica> {
    return this.http.put<HistoriaClinica>(`${this.apiUrl}/update/${id}`, historia);
  }

  // Eliminar historia clínica por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  
}
