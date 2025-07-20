import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Condominio } from '../../../../interface/pessoa/condominio';
import { Pageable } from '../../../../interface/imovel/pageable';
import { Paginacao } from '../../../../interface/imovel/paginacao';
import { CondominioService } from '../../../../service/pessoa/condominio.service';
import { Mensagem } from '../../../../utils/mensagem';
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { BreakpointObserver } from '@angular/cdk/layout'
import { CadastroOpcoesComponent } from '../../cadastro/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';

@Component({
    selector: 'app-condominio',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './condominio.component.html',
    styleUrl: './condominio.component.css'
})
export class CondominioComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<Condominio>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição','Endereço','Ação'];
  constructor(private condominioService : CondominioService,
              private mensagem: Mensagem,
              private breakpointObserver: BreakpointObserver,
              private sessaoServce: SessaoService){}

  ngAfterViewInit(): void {
    this.atualizaColunaTabela();
  }

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }

  atualizaColunaTabela(){
    this.breakpointObserver.observe(['(max-width: 540px)']).subscribe(result => {
      if (result.matches) {
        // Remova a coluna "Valor" se a tela for menor que 750px
        this.displayedColumns = ['Ref:', 'Descrição','Ação'];
      } else {
        // Adicione novamente a coluna "Valor" se a tela for maior que 750px
        this.displayedColumns = ['Ref:', 'Descrição','Endereço','Ação'];
      }
    });
  }

  pesquisaFiltrada() {
    this.condominioService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        console.log("Erro ao buscar o condomínio: "+err)
        this.mensagem.error("Erro ao buscar o condomínio")
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(conCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: conCodigo, tipo: TipoCadastro.CONDOMINIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.CONDOMINIO}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(conCodigo: number){
    this.condominioService.delete(conCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Condomínio deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar condomínio, favor validar se possui vinculação com outros cadastros")
      }
    })
  }

  abrirDialogDeletar(condominio: Condominio){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: condominio.conDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(condominio.conCodigo);
      }
    });
  }
  permissao(): boolean{
    return this.sessaoServce.permissao();
  }
}
