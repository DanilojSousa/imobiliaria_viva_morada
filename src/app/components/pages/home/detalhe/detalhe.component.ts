import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { Imagens } from '../../../interface/produto/imagens';
import localePt from '@angular/common/locales/pt';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagensService } from '../../../service/imovel/imagens.service';
import { Imovel } from '../../../interface/produto/imovel';
import { ImovelService } from '../../../service/imovel/imovel.service';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UsuarioService } from '../../../service/acesso/usuario.service';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailService } from '../../../service/geral/email.service';
import { Email } from '../../../interface/geral/email';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ProximidadeService } from '../../../service/imovel/proximidade.service';
import { MatDividerModule } from '@angular/material/divider';
import { VisualizarImagemDialogComponent } from '../dialog/visualizar-imagem/visualizar-imagem-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AreaLazerService } from '../../../service/imovel/area-lazer.service';
import { AreaLazer } from '../../../interface/produto/areaLazer';
import { Proximidade } from '../../../interface/produto/proximidade';
import { environment } from '../../../../../environments/environment.prod';
import { EmpresaService } from '../../../service/geral/empresa.service';
import { Empresa } from '../../../interface/geral/empresa';

registerLocaleData(localePt, 'pt-BR');

@Component({
    selector: 'app-detalhe',
    imports: [MatGridListModule, MatButtonModule,
        MatProgressSpinnerModule, MatIconModule, CommonModule,
        FormsModule, MatSnackBarModule, MatDividerModule],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    templateUrl: './detalhe.component.html',
    styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit {

  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  listaImagens: Imagens[] = []
  imovel: Imovel = new Imovel();
  listaAreaLazer: AreaLazer[] = [];
  listaProximidade: Proximidade[] = [];
  spinner: boolean = false;
  buttonFlutuante: boolean = false;
  empresa: Empresa = new Empresa();
  mensagem = "Olá, estou interessado nesse imóvel que encontrei no site. Aguardo seu retorno.";
  listaColRow = [
    {cows: 2,rows:3},
    {cows: 1,rows:1},
    {cows: 1,rows:1},
    {cows: 1,rows:1},
    {cows: 1,rows:1},
    {cows: 1,rows:1},
    {cows: 1,rows:1}
  ]
  formattedPhone!: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private imagensService: ImagensService,
              private imovelService: ImovelService,
              private usuarioService: UsuarioService,
              private emailService: EmailService,
              private empresaService: EmpresaService,
              private areaLazerService: AreaLazerService,
              private proximidadeService: ProximidadeService){}

  ngOnInit(): void {
    const imvCodigo = this.route.snapshot.paramMap.get('imvCodigo');
    if(this.router.url.includes("acesso/sistema")){
        this.buttonFlutuante = true;
    }

    if(imvCodigo != null){
      this.spinner = true;
      this.carregaImovel(imvCodigo);
    }
    this.carregaEmpresa();
  }

  carregaEmpresa(){
    this.empresaService.selecionarAtivo().subscribe({
      next:(res)=>{
        this.empresa = res;
      }
    })
  }
  carregaImovel(imvCodigo: string) {
    this.imovelService.getById(Number(imvCodigo)).subscribe({
      next:(res)=>{
        this.imovel = res
        this.carregaUsuario();
      }
    })
  }
  carregaArealazer() {
    this.areaLazerService.getAllPorImvCodigo(this.imovel.imvCodigo).subscribe({
      next:(res)=>{
        this.listaAreaLazer = res;
        this.carregaProximidade();
      }
    })
  }
  carregaProximidade() {
    this.proximidadeService.getAllPorImvCodigo(this.imovel.imvCodigo).subscribe({
      next:(res)=>{
        this.listaProximidade = res;
        this.spinner = false;
      }
    })
  }
  carregaUsuario() {
    console.log(this.imovel.usuario.usrCodigo)
    this.usuarioService.getById(this.imovel.usuario.usrCodigo.toString()).subscribe({
      next:(res)=>{
        this.imovel.usuario = res;
        this.carregaArealazer();
      }
    })
  }
  carregaListaImagem(indice: number){
    this.imagensService.getAllPorImvCodigo(this.imovel.imvCodigo).subscribe({
      next:(res)=>{
        this.listaImagens = res;
        this.dialog.open(VisualizarImagemDialogComponent,{
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: 'auto',
          data: { listaImagens: this.listaImagens, indice: indice }
        });
      }
    })
  }

  mostraImagem(imgCodigo: number): string{
      return `${environment.api_url}/imagens/getImagem?imgCodigo=${imgCodigo}`;
  }
  mostraImagemUsuario(usrCodigo: number): string{
    return `${environment.api_url}/usuario/getImagem?usrCodigo=${usrCodigo}`;
  }

  carrega():string{
    return this.imovel.endereco.endBairro;
  }

  formatarTelefone(imovel: Imovel){
    if(imovel.usuario.roles === 'ADMIN'){
      const match = imovel.usuario?.contato?.cntWhatsapp?.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : imovel.usuario?.contato?.cntWhatsapp;
    }else{
      const match = this.empresa?.contato?.cntWhatsapp?.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : this.empresa?.contato?.cntWhatsapp;
    }
  }

  emailUsuario(imovel: Imovel){
    if(imovel.usuario.roles === 'ADMIN'){
      return imovel.usuario?.email?.emaEmail;
    }else{
      return this.empresa.email.emaEmail;
    }
  }

  onEmail(myForm: NgForm){
    if(!this.validaFormulario(myForm)){
      this.openSnackBar("Os campos devem ser preenchidos", "warning-snackba");
      return;
    }
    const email = new Email();
    email.evmAssunto = this.imovel.imvDescricao + " Ref: " + this.imovel.imvCodigo;
    if(this.imovel.usuario.roles === 'ADMIN'){
      email.evmDestinatario = this.imovel.usuario.email.emaEmail
    }else{
      email.evmDestinatario = this.empresa.email.emaEmail
    }
    email.evmConteudo = myForm.value.mensagem +"<br/><br/>"+myForm.value.nome+"<br/> Telefone: "+this.formattedPhone+"<br/> Email: "+myForm.value.email
    this.emailService.enviarEmail(email).subscribe({
      next:(res) =>{
        this.openSnackBar("Email enviado com sucesso", "success-snackbar");
      },error:(er)=>{
        this.openSnackBar("Erro ao enviar o e-mail","error-snackbar");
      }
    })
  }
  onWhatsapp(myForm: NgForm){
    const isAdmin = this.imovel.usuario.roles === 'ADMIN';
    const telefone = isAdmin ? this.imovel.usuario.contato?.cntWhatsapp : this.empresa.contato?.cntWhatsapp;
    const url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${myForm.value.mensagem}`;
    window.open(url, '_blank');''
  }
  validaFormulario(myForm: NgForm):boolean{
    if(myForm.value.nome === ""
      || myForm.value.email === ""
      || this.formattedPhone === undefined){

      return false;
    }
    return true;
  }

  agendarVisita(){
    const isAdmin = this.imovel.usuario.roles === 'ADMIN';
    const telefone = isAdmin ? this.imovel.usuario.contato?.cntWhatsapp : this.empresa.contato?.cntWhatsapp;
    const mensagem = encodeURIComponent("Olá, gostaria de Agendar uma visita.");
    const url = `https://api.whatsapp.com/send?phone=55${telefone}&text=${mensagem}`;
    window.open(url, '_blank');''
  }

  openSnackBar(text: string, tipo: string) {
    this._snackBar.open(text, 'X',{
      duration: 3000,
      panelClass: [tipo],
    });
  }
  visualizarImagen(indice: number){
    this.carregaListaImagem(indice);
  }
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.formattedPhone = this.formatPhone(value);
  }

  formatPhone(phone: string): string {
    if(phone === null){
      return '';
    }
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }

  formataArea(valor: number): string{
    return valor?.toString().replace('.', ',');
  }
  voltar(){
    this.router.navigate(['imovel/filtro'])
  }
}
