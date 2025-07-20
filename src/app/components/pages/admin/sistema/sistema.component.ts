import { Component, LOCALE_ID } from '@angular/core';
import { MatTableModule} from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-sistema',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatTableModule, MatPaginatorModule, CommonModule, MatSlideToggleModule, MatButtonModule, SidebarComponent, RouterOutlet, ToolbarComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './sistema.component.html',
    styleUrl: './sistema.component.css'
})
export class SistemaComponent {

  constructor(){}

}
