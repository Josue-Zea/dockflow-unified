import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  @Input() sidebarVisible!: boolean;
  @Input() items!: MenuItem[] | undefined;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();
  userName: string = "";

  setSidebarVisible() {
    this.sidebarVisible = true;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  constructor (private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.usuario.nombre;
  }
}
