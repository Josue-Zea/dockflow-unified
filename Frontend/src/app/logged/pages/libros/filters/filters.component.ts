import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  stateOptions: any[] = [{label: 'Filtrado simple', value: 'simple'}, {label: 'Filtrado avanzado', value: 'advanced'}];

  value: string = 'simple';
}
