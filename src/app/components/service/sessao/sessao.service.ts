import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Util } from '../../utils/util';
import { Router } from '@angular/router';
import { Mensagem } from '../../utils/mensagem';
import { EmpresaService } from '../geral/empresa.service';
import { Empresa } from '../../interface/geral/empresa';
import { PesquisaFiltradaImovel } from '../../interface/imovel/pesquisaFiltradaImovel';
import { Imovel } from '../../interface/imovel/imovel';
import { Pageable } from '../../interface/imovel/pageable';

@Injectable({
  providedIn: 'root'
})
export class SessaoService{

  private token!: string;
  private empresa: Empresa = new Empresa;
  private pesquisaFiltradaImovel = new PesquisaFiltradaImovel()
  private pageable!: Pageable<Imovel>
  private imovel: Imovel = new Imovel();
  constructor(private cookieService: CookieService,
              private router: Router, 
              private mensagem: Mensagem,
              private empresaService: EmpresaService){
                this.carregaEmpresa()
              }

  getUsrLogin(): string{
    const user = this.cookieService.get('user');
    return this.valida(user);
  }
  getRole(): string{
    const role = this.cookieService.get('role')
    const roleFormatado = this.valida(role);
    return roleFormatado === 'ADMIN' ? 'Admin' : 'User'; 
  }

  getEmpresa(): Empresa{
    return this.empresa;
  }
  obterToken(): any {
    return this.token;
  }
  valida(valor: any): any {
    if(valor != ''){
      return Util.decode(valor);
    }
    this.limparCookies();
    return valor;
  }
  sair(): void{
    this.mensagem.sucesso("Deslogado com sucesso")
    this.limparCookies();
  }
  limparCookies(): void{
    this.cookieService.deleteAll();
    this.cookieService.delete('XAuthorization')
    this.router.navigate(['home'])
  }
  logado(): boolean {
    if(this.token != undefined){
      return true;
    }
    return false;
  }

  setPesquisaFiltradaImovel(pesquisaFiltradaImovel: PesquisaFiltradaImovel){
    this.pesquisaFiltradaImovel = pesquisaFiltradaImovel;
  }
  getPesquisaFiltradaImovel(): PesquisaFiltradaImovel{
  return this.pesquisaFiltradaImovel;
  }
  setPageable(pageable: Pageable<Imovel>){
  this.pageable = pageable;
  }
  getPageable(): Pageable<Imovel>{
    return this.pageable;
  }

  permissao(): boolean{
    const valor = this.cookieService.get('role');
    const role = this.valida(valor)
    if(role === null || role === 'USER'){
      return false;
    }
    return true;
  }

  getUsrCodigo(){
    const usrCodigo = this.cookieService.get('codUser')
    return this.valida(usrCodigo)
  }

  carregaEmpresa() {
    this.empresaService.selecionarAtivo().subscribe({
      next:(res)=>{
         this.empresa = res;
      }, error:(err)=>{
          this.mensagem.error("Erro ao buscar a empresa: "+ err.error?.message);
      }
    });
  }
  
  setImovel(imovel: Imovel){
    this.imovel = imovel;
  }
  getImovel(): Imovel{
    return this.imovel;
  }
}