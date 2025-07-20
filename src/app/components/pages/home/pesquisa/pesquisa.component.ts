import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Negocio } from '../../../interface/imovel/negocio';
import { TipoImovel } from '../../../interface/imovel/tipoImovel';
import { EnderecoDTO } from '../../../interface/pessoa/endereco';
import { EstadoService } from '../../../service/pessoa/estado.service';
import { EnderecoService } from '../../../service/pessoa/endereco.service';
import { PesquisaFiltradaImovel } from '../../../interface/imovel/pesquisaFiltradaImovel';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EstadoCidade } from '../../../interface/pessoa/estadoCidade';
import { CurrencyMaskDirectiveDirective } from '../../../diretivas/currency-mask-directive.directive';
import { Cidade } from '../../../interface/pessoa/cidade';
import { Router } from '@angular/router';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { NegocioService } from '../../../service/imovel/negocio.service';
import { TipoImovelService } from '../../../service/imovel/tipo-imovel.service';
import { Util } from '../../../utils/util';
import { Empresa } from '../../../interface/geral/empresa';

@Component({
    selector: 'app-pesquisa',
    imports: [MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, CurrencyMaskDirectiveDirective],
    templateUrl: './pesquisa.component.html',
    styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent implements OnInit{

  empresa: Empresa = new Empresa();
  listaNegocio: Negocio[] = [];
  listaTipoImovel: TipoImovel[] = [];
  listaEstadoCidade: EstadoCidade[] = [];
  listaEnderecoSelecionado = new FormControl<EnderecoDTO[] | null>(null);
  listaNegocioSelecionado = new FormControl<Negocio | null>(null);
  listaTipoImovelSelecionado = new FormControl<TipoImovel | null>(null);
  listaCidadeSelecionado = new FormControl<Cidade | null>(null);
  listaEndereco: EnderecoDTO[] = [];
  pesquisaFiltradaImovel: PesquisaFiltradaImovel = new PesquisaFiltradaImovel();

  constructor(private estadoService: EstadoService,
              private enderecoService: EnderecoService,
              private sessaoService: SessaoService,
              private negocioService: NegocioService,
              private tipoImovelService: TipoImovelService,
              private router: Router){}
  ngOnInit(): void {
    this.empresa = this.sessaoService.getEmpresa();
    this.carregaNegocio();
    this.carregaTipoImovel();
    this.carregaEstado();
    this.carregaEndereco();
  }

  pesquisaFiltrada(){
    if(this.listaNegocioSelecionado.value != null){
      this.pesquisaFiltradaImovel.ngcCodigo = this.listaNegocioSelecionado.value.ngcCodigo;
    }
    if(this.listaTipoImovelSelecionado.value != null){
      this.pesquisaFiltradaImovel.tpiCodigo!.push(this.listaTipoImovelSelecionado.value.tpiCodigo);
    }
    if(this.listaCidadeSelecionado.value != null){
      this.pesquisaFiltradaImovel.cidCodigo = this.listaCidadeSelecionado.value.cidCodigo;
    }
    if(this.listaEnderecoSelecionado.value != null){
       this.pesquisaFiltradaImovel.endCodigo = this.listaEnderecoSelecionado.value.map(x => x.endCodigo);
    }
    localStorage.setItem('pesquisaFiltradaImovel', JSON.stringify(this.pesquisaFiltradaImovel));
    this.sessaoService.setPesquisaFiltradaImovel(this.pesquisaFiltradaImovel);
    this.router.navigate(['imovel/filtro'])
  }

  carregaNegocio(){
    this.negocioService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaNegocio = res;
      }
    })
  }
  carregaTipoImovel(){
    this.tipoImovelService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaTipoImovel = res;
      }
    })
  }
  carregaEstado(){
    this.estadoService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaEstadoCidade = res;
      }
    })
  }

  carregaEndereco(){
    this.enderecoService.getAllPorImovelAtivo().subscribe({
      next:(res)=>{
        this.listaEndereco = res;
      }
    })
  }
  carregaEnderecoSelecionado(){
    this.enderecoService.getAllPorCidCodigo(this.listaCidadeSelecionado.value!.cidCodigo).subscribe({
      next:(res)=>{
        this.listaEndereco = res;
      }
    })
  }

  valorMaximo(value: number | null){
    if(value != null){
      this.pesquisaFiltradaImovel.valorMaximo = value;
    }
  }
  valorMinimo(value: number | null){
    if(value != null){
      this.pesquisaFiltradaImovel.valorMinimo = value;
    }
  }
  mostraImagem(empCodigo : number): string {
    return Util.mostraImagemEmpresa(empCodigo);
  }
}
