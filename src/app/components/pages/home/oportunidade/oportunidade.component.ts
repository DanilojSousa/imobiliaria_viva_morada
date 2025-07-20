import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ImovelService } from '../../../service/imovel/imovel.service';
import { Util } from '../../../utils/util';
import { Router } from '@angular/router';
import { ImovelOportunidade } from '../../../interface/imovel/imovelOportunidade';
import { Paginacao } from '../../../interface/imovel/paginacao';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-oportunidade',
    imports: [CommonModule],
    templateUrl: './oportunidade.component.html',
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    styleUrl: './oportunidade.component.css'
})
export class OportunidadeComponent implements OnInit {

  listaImovelOportunidade: ImovelOportunidade[] = [];
  constructor(private imovelService: ImovelService,
              private router: Router){

  }
  ngOnInit(): void {
    this.carregaLista();
  }

  carregaLista() {
    const page = new Paginacao(0, 3);
    this.imovelService.getAllOportunidade(page).subscribe({
      next:(res)=>{
        this.listaImovelOportunidade = res;
      }
    })
  }

  detalhes(imvCodigo : number){
    this.router.navigate(['imovel/detalhes/'+imvCodigo])
  }

  mostraImagem(imgCodigo: number): string{
    return Util.getImagemImovel(imgCodigo);
  }
}
