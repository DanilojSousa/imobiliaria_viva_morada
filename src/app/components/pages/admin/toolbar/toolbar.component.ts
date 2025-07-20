import { Component, OnInit } from '@angular/core';
import { SessaoService } from '../../../service/sessao/sessao.service';
import { Util } from '../../../utils/util';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [MatIcon, MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  role: string = '';
  nome_usuario = 'Olá, Seja Bem vindo!';
  imagemUrl: string = '';
  constructor(private sessaoService: SessaoService,
              private router: Router){
  }
  ngOnInit(): void {
    this.role = this.sessaoService.getRole();
    this.nome_usuario = this.sessaoService.getUsrLogin();
    this.mostraImagemUsuario();
  }

  mostraImagemUsuario(): void{
    const imagem = Util.mostraImagemUsuario(this.sessaoService.getUsrCodigo());
    if(imagem !== undefined && imagem !== ''){
      this.imagemUrl = imagem;
    }else{
      this.imagemUrl = '';
    }
  }
  meuCadastro(){
    this.router.navigate([`acesso/sistema/cadastro/usuario/${this.sessaoService.getUsrCodigo()}`])
  }

  sair(){
    this.sessaoService.sair();
  }
}
