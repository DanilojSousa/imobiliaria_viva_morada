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
import { Paginacao } from '../../../../interface/imovel/paginacao';
import { SituacaoImovel } from '../../../../interface/imovel/situacaoImovel';
import { SituacaoImovelService } from '../../../../service/imovel/situacao-imovel.service';
import { CadastroOpcoesComponent } from '../../cadastro/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';

@Component({
    selector: 'app-situacao',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './situacao.component.html',
    styleUrl: './situacao.component.css'
})
export class SituacaoComponent implements OnInit {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<SituacaoImovel>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private situacaoImovelService : SituacaoImovelService,
              private mensagem: Mensagem,
              private route: Router,
              private sessaoServce: SessaoService){}

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.situacaoImovelService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar a situação do Imovel")
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(stiCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: stiCodigo, tipo: TipoCadastro.SITUACAO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.SITUACAO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(stiCodigo: number){
    this.situacaoImovelService.delete(stiCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Situação do imovel deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar a situação do Imovel, favor validar se possui vinculação com outros cadastros")
      }
    })
  }

  abrirDialogDeletar(situacao: SituacaoImovel){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: situacao.stiDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(situacao.stiCodigo);
      }
    });
  }

  permissao(): boolean{
    return this.sessaoServce.permissao();
  }
}
