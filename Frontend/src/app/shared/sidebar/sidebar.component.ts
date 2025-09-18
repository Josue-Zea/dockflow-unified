import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from "../../interfaces/options.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Input() sidebarVisible!: boolean;
  @Output() sidebarVisibleChange = new EventEmitter<boolean>();
  @Input() optionsSidebar!: Option[];
  seleccionado: Option = {name: "", prefix: "", ruta: ""};

  constructor(private router: Router){}

  ngOnInit(): void {
    this.seleccionado = this.optionsSidebar[0];
  }

  setSidebarVisible() {
    this.sidebarVisible = false;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  seleccionar(seleccionado: Option){
    this.seleccionado = seleccionado;
    this.router.navigate([seleccionado.ruta]);
  }
}
