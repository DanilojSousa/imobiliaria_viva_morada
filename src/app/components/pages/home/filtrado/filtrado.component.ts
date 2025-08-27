import { Pageable } from '../../../interface/imovel/pageable';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ImovelService } from '../../../service/imovel/imovel.service';
import { PesquisaFiltradaImovel } from '../../../interface/imovel/pesquisaFiltradaImovel';
import { Imovel } from '../../../interface/imovel/imovel';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Imagens } from '../../../interface/imovel/imagens';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { FiltroSelecionado } from '../../../interface/imovel/filtroSelecionado';
import { FiltroEnum } from '../../../interface/enum/filtroEnum';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LocalizacaoPraia } from '../../../interface/imovel/localizacaoPraia';
import { SituacaoImovel } from '../../../interface/imovel/situacaoImovel';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskDirectiveDirective } from '../../../diretivas/currency-mask-directive.directive';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MetragemMaskDirective } from '../../../diretivas/metragem-mask-directive.directive';
import { TipoImovel } from '../../../interface/imovel/tipoImovel';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BlocosCaroucelComponent } from "../blocos-caroucel/blocos-caroucel.component";
import { BreakpointObserver } from '@angular/cdk/layout'
import { OrdenarEnum } from '../../../interface/enum/ordenarImovel';
import { HomeComponent } from "../cabecalho/home.component";
import { EmpresaService } from '../../../service/geral/empresa.service';
import { Empresa } from '../../../interface/geral/empresa';
import { RodapeComponent } from "../../rodape/rodape.component";

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-filtrado',
    imports: [MatIcon, CommonModule, MatGridListModule, MatDividerModule, MatPaginatorModule,
    MatInputModule, MatProgressSpinnerModule, MatSelectModule, FormsModule, CurrencyMaskDirectiveDirective,
    MetragemMaskDirective, MatCheckboxModule, BlocosCaroucelComponent, HomeComponent, RodapeComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './filtrado.component.html',
    styleUrl: './filtrado.component.css'
})
export class FiltradoComponent implements OnInit {

  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();
  pageable!: Pageable<Imovel>
  empresa: Empresa = new Empresa();
  maiorPreco: boolean = false;
  menorPreco: boolean = false;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = true;
  pageSize = 12;
  spinner: boolean = false;
  filtro: boolean = false;
  pageEvent!: PageEvent;
  listaFiltroSelecionado: FiltroSelecionado[] = [];
  listaLocalizacaoPraia: LocalizacaoPraia[] = [];
  listaSituacaoImovel: SituacaoImovel[] = [];
  listaTipoImovel: TipoImovel[] = [];
  showFilters = false;
  buttonTogle = false;
  bloco = true;
  constructor(private imovelService : ImovelService, 
              private breakpointObserver: BreakpointObserver,
              private empresaService: EmpresaService){}

  ngOnInit(): void {
    this.checkScreenSize();
    this.spinner = true;
    const pesquisa = localStorage.getItem('pesquisaFiltradaImovel');
    if(pesquisa != null){
      this.pesquisaFiltradaImovel = JSON.parse(pesquisa);
      this.pesquisaFiltrada();
      this.carregaEmpresa();
    }
  }
  carregaEmpresa(){
    this.empresaService.selecionarAtivo().subscribe({
      next:(res)=>{
        this.empresa = res;
      }
    })
}

  checkScreenSize() {
    this.breakpointObserver.observe(['(max-width: 988px)']).subscribe(result => {
      if (result.matches) {
        this.showFilters = true;
        this.buttonTogle = this.showFilters;
      }else{
        this.showFilters = false;
        this.buttonTogle = this.showFilters;
      }
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.breakpointObserver.observe(['(max-width: 604px)']).subscribe(result => {
      if (result.matches) {
        this.bloco = this.showFilters;
      }
    });
  }

  indexImagem(imagens: Imagens[]): number {
    if(imagens[0].index === null || imagens[0].index === undefined){
      imagens[0].index = 0;
    }
    return imagens[0].index < imagens.length ? imagens[0].index : 0;
  }

  pesquisaFiltrada() {
    this.imovelService.pesquisaFiltrada(this.pesquisaFiltradaImovel).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.carregaFiltro();       
      },error: (err) => {
        console.log(err.error?.message);
        this.spinner = false;
      }
    })
  }

  carregaFiltro() {
    if(this.listaFiltroSelecionado.length === 0){
      this.listaFiltroSelecionado = [];
      const filtro = new FiltroSelecionado();
      filtro.descricao = FiltroEnum.dormitorio
      filtro.quantidade = Math.max(...this.pageable.content.map(item => item.imvDormitorio));
      this.listaFiltroSelecionado.push(filtro);
      const filtro1 = new FiltroSelecionado()
      filtro1.descricao = FiltroEnum.garagem;
      filtro1.quantidade = Math.max(...this.pageable.content.map(item => item.imvGaragem));
      this.listaFiltroSelecionado.push(filtro1);
      const filtro2 = new FiltroSelecionado()
      filtro2.descricao = FiltroEnum.suite
      filtro2.quantidade = Math.max(...this.pageable.content.map(item => item.imvSuite));
      this.listaFiltroSelecionado.push(filtro2);

      this.listaLocalizacaoPraia = [];
      this.listaLocalizacaoPraia = this.pageable.content.filter(item => item.localizacaoPraia != null)
                                                        .map(item => item.localizacaoPraia)
                                                        .filter((value, index, self) => 
                                                          index === self.findIndex(v => JSON.stringify(v) === JSON.stringify(value))
                                                        );
      this.listaSituacaoImovel = [];
      this.listaSituacaoImovel = this.pageable.content.filter(item => item.localizacaoPraia != null)
                                                      .map(item => item.situacaoImovel)
                                                      .filter((value, index, self) => 
                                                        index === self.findIndex(v => JSON.stringify(v) === JSON.stringify(value))
                                                      );
      this.listaTipoImovel = [];
      this.listaTipoImovel = this.pageable.content.map(item => item.tipoImovel)
                                                  .filter((value, index, self) => 
                                                    index === self.findIndex(v => JSON.stringify(v) === JSON.stringify(value))
                                                  );
      this.filtro = true;
    }
    this.spinner = false;
  }

  ordenarMaiorPreco(){
    this.pesquisaFiltradaImovel.ordenar = OrdenarEnum.VALOR;
    this.pesquisaFiltradaImovel.filter = OrdenarEnum.DESC;
    this.menorPreco = true;
    this.maiorPreco = false;
    this.pesquisaFiltrada();
  }

  ordenarMenorPreco(){
    this.pesquisaFiltradaImovel.ordenar =  OrdenarEnum.VALOR;
    this.pesquisaFiltradaImovel.filter = OrdenarEnum.ASC;
    this.maiorPreco = true;
    this.menorPreco = false;
    this.pesquisaFiltrada();

  }
 
  generateSequence(max: number): number[] {
    return Array.from({ length: max }, (_, i) => i+1);
  }
  selecionarValorFiltro(index: number, valor: number){
    if(this.listaFiltroSelecionado[index].selecionado === valor){
      this.listaFiltroSelecionado[index].selecionado = 0;
      this.atulisapesquisaFiltroImvel(this.listaFiltroSelecionado[index], null);
    }else{
      this.listaFiltroSelecionado[index].selecionado = valor;
      this.atulisapesquisaFiltroImvel(this.listaFiltroSelecionado[index], valor);
    }
  }
  atulisapesquisaFiltroImvel(filtroSelecionado : FiltroSelecionado, valor: number | null){
    switch(filtroSelecionado.descricao){
      case FiltroEnum.dormitorio:
        this.pesquisaFiltradaImovel.imvDormitorio = valor;
        break;
      case FiltroEnum.suite: 
        this.pesquisaFiltradaImovel.imvSuite = valor;
        break;
      case FiltroEnum.garagem:  
        this.pesquisaFiltradaImovel.imvGaragem = valor;
    }
    this.pesquisaFiltrada();
  }

  selecionarSimNao(text: string, valor: boolean){
    switch(text){
      case "minhaCasaMinhaVida":
        if(this.pesquisaFiltradaImovel.imvMinhaCasaMinhaVida === valor){
          this.pesquisaFiltradaImovel.imvMinhaCasaMinhaVida = null;
        }else{
          this.pesquisaFiltradaImovel.imvMinhaCasaMinhaVida = valor;
        }
        this.pesquisaFiltrada();
        break;
      case "financiamento": 
      if(this.pesquisaFiltradaImovel.imvAceitaFinanciamento === valor){
        this.pesquisaFiltradaImovel.imvAceitaFinanciamento = null;
      }else{
        this.pesquisaFiltradaImovel.imvAceitaFinanciamento = valor;
      }
        this.pesquisaFiltrada();
        break;
      case "mobiliado": 
      if(this.pesquisaFiltradaImovel.imvMobiliado === valor){
        this.pesquisaFiltradaImovel.imvMobiliado = null;
      }else{ 
        this.pesquisaFiltradaImovel.imvMobiliado = valor;
      }
      this.pesquisaFiltrada();
    }
  }
  valorMaximoMinimo(value: number | null, tipo: string){
    if(value != null){
      if(tipo === 'maximo'){
        this.pesquisaFiltradaImovel.valorMaximo = value;
      }else{
        this.pesquisaFiltradaImovel.valorMinimo = value;
      }
      this.pesquisaFiltrada();                                              
    }
  }
  valorAreaMaximoMinimo(value: number | null, tipo: string){
    if(value != null){
      if(tipo === 'maximo'){
        this.pesquisaFiltradaImovel.areaTotalMaximo = value;
      }else{
        this.pesquisaFiltradaImovel.areaTotalMinimo = value;
      }
      this.pesquisaFiltrada();                                              
    }
  }
  tipoImovelSelecionado(){
    this.pesquisaFiltradaImovel.tpiCodigo = [];
    this.pesquisaFiltradaImovel.tpiCodigo = this.listaTipoImovel.filter(item => item.selecionado === true)
                                                                 .map(x => x.tpiCodigo);

    if(this.pesquisaFiltradaImovel.tpiCodigo.length === 0){
      this.pesquisaFiltradaImovel.tpiCodigo  = null;
    }                                                
    this.pesquisaFiltrada();
  }
  situacaoImovelSelecionado(){
    this.pesquisaFiltradaImovel.stiCodigo = [];
    this.pesquisaFiltradaImovel.stiCodigo = this.listaSituacaoImovel.filter(item => item.selecionado === true)
                                                                 .map(x => x.stiCodigo);

    if(this.pesquisaFiltradaImovel.stiCodigo.length === 0){
      this.pesquisaFiltradaImovel.stiCodigo  = null;
    }                                                
    this.pesquisaFiltrada();
  }

}

