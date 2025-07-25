import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { SidebarService } from '../../services/layout/sidebar-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-dashboardlayout',
  imports: [RouterOutlet, FormsModule, Header, Sidebar, CommonModule, Footer],
  templateUrl: './dashboardlayout.html',
  styleUrl: './dashboardlayout.css'
})
export class Dashboardlayout implements OnInit, OnDestroy {

isSidebarVisible = false;
  private sidebarSubscription!: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarSubscription = this.sidebarService.sidebarVisible$.subscribe(
      (isVisible) => {
        this.isSidebarVisible = isVisible;
      }
    );
  }

  ngOnDestroy() {
    if (this.sidebarSubscription) {
      this.sidebarSubscription.unsubscribe();
    }
  }

}
