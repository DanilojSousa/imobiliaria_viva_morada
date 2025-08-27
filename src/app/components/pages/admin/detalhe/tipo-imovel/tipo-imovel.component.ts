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
import { TipoImovel } from '../../../../interface/imovel/tipoImovel';
import { TipoImovelService } from '../../../../service/imovel/tipo-imovel.service';
import { CadastroOpcoesComponent } from '../../cadastro/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';

@Component({
    selector: 'app-tipo-imovel',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './tipo-imovel.component.html',
    styleUrl: './tipo-imovel.component.css'
})
export class TipoImovelComponent implements OnInit {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<TipoImovel>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private tipoImovelService : TipoImovelService,
              private mensagem: Mensagem,
              private sessaoServce: SessaoService){}

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  pesquisaFiltrada() {
    this.tipoImovelService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro ao buscar o tipo imovel")
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

  detalhe(tpiCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: tpiCodigo, tipo: TipoCadastro.TIPO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.TIPO_IMOVEL}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(tpiCodigo: number){
    this.tipoImovelService.delete(tpiCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Tipo imovel deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error(err.error?.message+", favor validar se possui vinculação com outros cadastros");
        console.log(err.error?.message);
      }
    })
  }

  abrirDialogDeletar(tipoImovel: TipoImovel){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: tipoImovel.tpiDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(tipoImovel.tpiCodigo);
      }
    });
  }

  permissao(): boolean{
    return this.sessaoServce.permissao();
  }
}
