import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { EmpresaService } from '../../../service/geral/empresa.service';
import { Empresa } from '../../../interface/geral/empresa';
import { Util } from '../../../utils/util';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  hover = false;
  readonly dialog = inject(MatDialog);
  isLoadingResults = false;
  empresa: Empresa = new Empresa();

  constructor(private route: Router, 
              private sessaoServce: SessaoService,
              private empresaService: EmpresaService){}

  ngOnInit(): void {
    this.carregaEmpresa();
  }

  carregaEmpresa(){
    this.empresaService.getByAtivo().subscribe({
      next:(res)=>{
        this.empresa = res;
      }

    })
  }

  navegar(valor: string) {
    this.route.navigate([`acesso/sistema/detalhe/${valor}`]);
  }

  permissao(): boolean{
    return this.sessaoServce.permissao();
  }

  mostrarLogo(): string{
    return Util.mostrarLogo(this.empresa.empCodigo);
  }

  paginaPrincipal(){
    this.route.navigate([`home`]);
  }
}
