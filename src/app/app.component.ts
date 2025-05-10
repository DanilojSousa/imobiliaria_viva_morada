import { Component} from '@angular/core';
import { InicioComponent } from "./components/pages/home/inicio.component";

@Component({
    selector: 'app-root',
    imports: [InicioComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{

}
