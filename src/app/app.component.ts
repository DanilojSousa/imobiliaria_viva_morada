import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessaoService } from './components/service/sessao/sessao.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    constructor(private sessaoService: SessaoService){}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
