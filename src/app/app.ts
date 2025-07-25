import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { SidebarService } from './services/layout/sidebar-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Header, Sidebar, CommonModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}

