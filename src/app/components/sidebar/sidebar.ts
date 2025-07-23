import { Component ,  OnInit , OnDestroy} from '@angular/core';
import { SidebarService } from '../../services/layout/sidebar-service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-sidebar',
  imports: [FormsModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit , OnDestroy {

  isVisible: boolean = false;
  private subscription!: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    initFlowbite();
    this.subscription = this.sidebarService.sidebarVisible$.subscribe(
      (visible) => {
        this.isVisible = visible;
      }
    );
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeSidebar(): void {
    this.sidebarService.setSidebarVisibility(false);
  }

}
