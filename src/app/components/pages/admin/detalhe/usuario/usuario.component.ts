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
import { DeletarComponent } from '../../cadastro/dialog/deletar/deletar.component';
import { Usuario } from '../../../../interface/acesso/usuario';
import { UsuarioService } from '../../../../service/acesso/usuario.service';
import { BreakpointObserver } from '@angular/cdk/layout'
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Util } from '../../../../utils/util';

@Component({
    selector: 'app-usuario',
    imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule,
        MatTableModule, MatPaginatorModule, CommonModule, MatIcon, MatSlideToggleModule, MatButtonModule,
        MatInputModule, FormsModule],
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  readonly dialog = inject(MatDialog);
  pageable!: Pageable<Usuario>;
  paginacao: Paginacao = new Paginacao(0, 5);
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['Foto','Ref:', 'Nome','Nível','Situação','Ação'];
  constructor(private usuarioService : UsuarioService,
              private mensagem: Mensagem,
              private route: Router, 
              private breakpointObserver: BreakpointObserver){}

  ngAfterViewInit(): void {
    this.atualizaColunaTabela();
    this.observaMudancasDeTamanho();
  }

  ngOnInit(): void {
    this.pesquisaFiltrada();
  }
  atualizaColunaTabela() {
    const isSmall = this.breakpointObserver.isMatched('(max-width: 508px)');
    const isMedium = this.breakpointObserver.isMatched('(max-width: 582px)');

    if (isSmall) {
      this.displayedColumns = ['Ref:', 'Nome', 'Ação'];
    } else if (isMedium) {
      this.displayedColumns = ['Ref:', 'Nome', 'Situação', 'Ação'];
    } else {
      this.displayedColumns = ['Foto','Ref:', 'Nome', 'Nível', 'Situação', 'Ação'];
    }
  }

  observaMudancasDeTamanho() {
    this.breakpointObserver.observe(['(max-width: 582px)', '(max-width: 508px)'])
      .subscribe(() => {
        this.atualizaColunaTabela();
      });
  }

  pesquisaFiltrada() {
    this.usuarioService.getAllPaginado(this.paginacao).subscribe({
      next:(res)=>{
        this.pageable = res;
        this.isLoadingResults = false;
      },error: (err) => {
        this.mensagem.error("Erro ao buscar o usuário");
        console.log(err.error?.message);
        this.isLoadingResults = false;
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    this.paginacao.page = e.pageIndex;
    this.pageEvent = e;
    this.pesquisaFiltrada();
  }

  detalhe(usrCodigo: number){
    this.route.navigate(['acesso/sistema/cadastro/usuario/'+usrCodigo]);
  }

  delete(usrCodigo: number){
    this.usuarioService.delete(usrCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Usuário deletado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error(err.error?.message+", favor validar se possui vinculação com outros cadastros");
        console.log(err.error?.message);
      }
    })
  }
  desativar(usrCodigo: number){
    this.usuarioService.desativar(usrCodigo).subscribe({
      next:(res)=>{
        this.mensagem.sucesso("Usuário alterado com sucesso")
        this.pesquisaFiltrada();
      },
      error: (err) => {
        this.mensagem.error("Erro ao alterar o Usuário")
        console.log(err.error?.message)
      }
    })
  }
  novo(){
    this.route.navigate(['acesso/sistema/cadastro/usuario']);
  }

  abrirDialogDeletar(usuario: Usuario){
    const dialogRef = this.dialog.open(DeletarComponent, {
      width: '250px',
      data:{valor: usuario.usrNome}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(usuario.usrCodigo);
      }
    });
  }

  onInputChange(event: any) {
    this. pesquisaFiltrada();
  }

  mostrarImagens(usrImagem: string): string {
    return Util.mostraImagemString(usrImagem);
  }
}
