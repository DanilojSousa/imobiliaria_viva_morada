import { Pageable } from '../../../../interface/imovel/pageable';
import { MatDialog } from '@angular/material/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule} from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Mensagem } from '../../../../utils/mensagem';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LocalizacaoPraia } from '../../../../interface/imovel/localizacaoPraia';
import { Paginacao } from '../../../../interface/imovel/paginacao';
import { LocalizacaoPraiaService } from '../../../../service/imovel/localizacao-praia.service';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { CadastroOpcoesComponent } from '../../cadastro/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';

@Component({
    selector: 'app-localizacao',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './localizacao.component.html',
    styleUrl: './localizacao.component.css'
})
export class LocalizacaoComponent implements OnInit  {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<LocalizacaoPraia>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private localizacaoService : LocalizacaoPraiaService,
              private mensagem: Mensagem,
              private sessaoServce: SessaoService){}

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.localizacaoService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar a localização")
        console.log(err.error?.message)
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

detalhe(lcpCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: lcpCodigo, tipo: TipoCadastro.LOCALIZACAO_PRAIA}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.LOCALIZACAO_PRAIA}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(lcpCodigo: number){
    this.localizacaoService.delete(lcpCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Localização deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error(err.error?.message+", favor validar se possui vinculação com outros cadastros")
        console.log(err.error?.message)
      }
    })
  }

  abrirDialogDeletar(localizacao: LocalizacaoPraia){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: localizacao.lcpDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(localizacao.lcpCodigo);
      }
    });
  }

  permissao(): boolean{
    return this.sessaoServce.permissao();
  }
}
