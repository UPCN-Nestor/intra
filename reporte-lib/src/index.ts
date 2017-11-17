import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GridComponent } from './grid/grid.component';
import { ChartComponent } from './chart/chart.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {DpDatePickerModule} from 'ng2-date-picker';

import { BlockUIModule } from 'ng-block-ui';

import { ConfirmDialogModule, DataTableModule,SharedModule, DataTable, DropdownModule, SelectItem, GrowlModule, Message, CheckboxModule, DragDropModule, MessagesModule,
    PanelModule, InputTextModule, SliderModule, ButtonModule, DialogModule, OverlayPanelModule, MultiSelectModule, ToolbarModule, PasswordModule, DataGridModule, TooltipModule, InputMaskModule,
    DataListModule, ChartModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BlockUIModule,
    DataListModule,
    DataGridModule,
    MultiSelectModule,
    OverlayPanelModule,
    MessagesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    DropdownModule,
    GrowlModule,
    CheckboxModule,
    DragDropModule,
    PanelModule,
    InputTextModule,
    PasswordModule,
    SliderModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    TooltipModule,    
    InputMaskModule,
    ChartModule,
    DpDatePickerModule
  ],
  declarations: [
    SidebarComponent,
    ChartComponent,
    GridComponent
  ],
  exports: [
    SidebarComponent,
    ChartComponent,
    GridComponent
  ]
})
export class GridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GridModule
    };
  }
}
