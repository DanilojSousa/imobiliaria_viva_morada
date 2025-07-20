import { Component, OnInit } from '@angular/core';
import { CardsComponent } from "./cards/cards.component";
import { PesquisaComponent } from "./pesquisa/pesquisa.component";
import { OportunidadeComponent } from "./oportunidade/oportunidade.component";
import { DestaquesComponent } from "./destaques/destaques.component";
import { SobreComponent } from "./sobre/sobre.component";
import { ContatoComponent } from "./contato/contato.component";
import { RodapeComponent } from "../rodape/rodape.component";
import { HomeComponent } from "./cabecalho/home.component";
import { EmpresaService } from '../../service/geral/empresa.service';
import { Empresa } from '../../interface/geral/empresa';

@Component({
    selector: 'app-inicio',
    imports: [CardsComponent, PesquisaComponent, SobreComponent, RodapeComponent, HomeComponent, OportunidadeComponent, DestaquesComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

    empresa: Empresa = new Empresa();
    constructor(private empresaService: EmpresaService,){

    }
    ngOnInit(): void {
        this.carregaEmpresa();
    }
    carregaEmpresa(){
        this.empresaService.selecionarAtivo().subscribe({
          next:(res)=>{
            this.empresa = res;
          }
        })
    }
}
