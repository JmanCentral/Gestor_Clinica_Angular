import { Component } from '@angular/core';
import { SidebarService } from '../../services/layout/sidebar-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {

  constructor(private sidebarService: SidebarService , private router: Router) {}

 toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

    Dashboard(): void {
    this.router.navigate(['/listpacientes']);
  }


}
