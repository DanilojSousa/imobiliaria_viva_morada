import { AreaLazer } from '../../../../interface/imovel/areaLazer';
import { Pageable } from '../../../../interface/imovel/pageable';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
import { TipoCadastro } from '../../../../interface/enum/tipoCadastro';
import { SessaoService } from '../../../../service/sessao/sessao.service';
import { AreaLazerService } from '../../../../service/imovel/area-lazer.service';
import { CadastroOpcoesComponent } from '../../cadastro/dialog/cadastro-opcoes/cadastro-opcoes.component';
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';


@Component({
    selector: 'app-area-lazer',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule],
    templateUrl: './area-lazer.component.html',
    styleUrl: './area-lazer.component.css'
})
export class AreaLazerComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<AreaLazer>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Ação'];
  constructor(private areaLazerService : AreaLazerService,
              private mensagem: Mensagem,
              private route: Router,
              private sessaoServce: SessaoService){}

  ngAfterViewInit(): void {
    this.pesquisaFiltrada();
  }

  ngOnInit(): void {

  }
  
  pesquisaFiltrada() {
    this.areaLazerService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro buscar a Area de Lazer")
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(arlCodigo: number | null){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{id: arlCodigo, tipo: TipoCadastro.AREA_LAZER}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  novo(){
    const dialogRef = this.dialog.open(CadastroOpcoesComponent, {
      width: '500px',
      data:{tipo: TipoCadastro.AREA_LAZER}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.pesquisaFiltrada();
    });
  }

  delete(arlCodigo: number){
    this.areaLazerService.delete(arlCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Àrea de Lazer do imovel deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao deletar a Área de Lazer, favor validar se possui vinculação com outros cadastros")
      }
    })
  }

  abrirDialogDeletar(arealazer: AreaLazer){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: arealazer.arlDescricao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(arealazer.arlCodigo);
      }
    });
  }

  permissao(): boolean{
    return this.sessaoServce.permissao();
  }
}

