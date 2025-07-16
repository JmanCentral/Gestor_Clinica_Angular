import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  constructor(private router: Router) {
    
  }
  
  irACrearPaciente() {
    this.router.navigate(['/listpacientes']);
  
  }

}
