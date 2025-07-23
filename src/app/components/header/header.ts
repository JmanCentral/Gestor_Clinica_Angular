import { Component } from '@angular/core';
import { SidebarService } from '../../services/layout/sidebar-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor(private sidebarService: SidebarService) {}

 toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
