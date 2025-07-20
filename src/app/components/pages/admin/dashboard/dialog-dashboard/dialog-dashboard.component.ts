import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Imovel } from '../../../../interface/imovel/imovel';
import { Pageable } from '../../../../interface/imovel/pageable';
import { ImovelService } from '../../../../service/imovel/imovel.service';
import { Mensagem } from '../../../../utils/mensagem';
import { Paginacao } from '../../../../interface/imovel/paginacao';

@Component({
  selector: 'app-dialog-dashboard',
  imports: [MatDialogModule, MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
    CommonModule],
  templateUrl: './dialog-dashboard.component.html',
  styleUrl: './dialog-dashboard.component.css'
})
export class DialogDashboardComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<DialogDashboardComponent>);
  paginacao: Paginacao = new Paginacao(0, 5);
  pageable!: Pageable<Imovel>;
  isLoadingResults = true;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Ref:', 'Descrição', 'Situação', 'Visualização', 'Compartilhamento', 'Favorito'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { acao: string },
              private imovelService: ImovelService,
              private mensagem: Mensagem){}

  ngOnInit(): void {
    this.populaDisplayColumns();
    this.pesquisaFiltrada();
  }
  populaDisplayColumns() {
    switch(this.data.acao){
      case 'Favorito': 
        this.displayedColumns = ['Ref:', 'Descrição', 'Situação', 'Favorito'];
        break;
      case 'Visualizacao': 
        this.displayedColumns = ['Ref:', 'Descrição', 'Situação', 'Visualização'];
        break;
      case 'Compartilhamento': 
        this.displayedColumns = ['Ref:', 'Descrição', 'Situação', 'Compartilhamento'];
        break;
      case 'Ativo': 
      case 'Inativo': 
      case 'Total': 
        this.displayedColumns = ['Ref:', 'Descrição', 'Situação'];
        break;
    }
  }

  pesquisaFiltrada() {
    switch(this.data.acao){
      case 'Favorito': 
        this.imovelService.pesquisaImovelFavorito(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
        break;
      case 'Compartilhamento': 
        this.imovelService.pesquisaImovelCompartilhamento(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
        break;
      case 'Visualizacao': 
        this.imovelService.pesquisaImovelVisualizacao(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
        break;
      case 'Ativo': 
        this.imovelService.pesquisaImovelAtivo(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
        break;
      case 'Inativo': 
        this.imovelService.pesquisaImovelInativo(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
        break;
      case 'Total': 
        this.imovelService.pesquisaImovelTotal(this.paginacao).subscribe({
          next:(res)=>{
            this.pageable = res;
            this.isLoadingResults = false;
          },error: (err) => {
            this.mensagem.error("Erro buscar imóvel cadastrado")
            this.isLoadingResults = false;
          }
        })
    }
  }

  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

}
