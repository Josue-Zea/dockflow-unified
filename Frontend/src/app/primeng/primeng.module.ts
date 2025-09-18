import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    RadioButtonModule,
    ScrollPanelModule,
    SelectButtonModule,
    SidebarModule,
    TableModule,
    TieredMenuModule,
    ToastModule,
    ToolbarModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    ImageModule
  ]
})
export class PrimengModule { }
