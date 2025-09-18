import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit{
  user: User | undefined;
  // stateOptions: any[] = [{label: 'Filtrado simple', value: 'simple'}, {label: 'Filtrado avanzado', value: 'advanced'}];
  stateOptions: any[] = [{label: 'Filtrado simple', value: 'simple'}];

  value: string = 'simple';

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    this.user = this.authService.usuario;
  }
}
