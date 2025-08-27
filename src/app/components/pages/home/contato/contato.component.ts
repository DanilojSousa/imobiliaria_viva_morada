import { SessaoService } from './../../../service/sessao/sessao.service';
import { Component, inject, OnInit } from '@angular/core';
import { EmailService } from '../../../service/geral/email.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Email } from '../../../interface/geral/email';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from '../../../interface/geral/empresa';
import { EmpresaEndereco } from '../../../interface/geral/empresa-endereco';
import { EmpresaService } from '../../../service/geral/empresa.service';
import { Mensagem } from '../../../utils/mensagem';

@Component({
    selector: 'app-contato',
    imports: [MatButtonModule, FormsModule, CommonModule, MatIconModule],
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit{

  readonly dialog = inject(MatDialog);
  empresaEndereco = new EmpresaEndereco();
  empresa = new Empresa();
  formattedPhone!: string;
  valida: boolean = false;
  constructor(private empresaService: EmpresaService,
              private emailService: EmailService,
              private mensagem: Mensagem){}

  ngOnInit(): void {
    this.carregaEmpresaEndereco();
  }
  carregaEmpresaEndereco() {
    this.empresaService.getByEmpresaEndereco().subscribe({
      next:(res)=>{
        this.empresaEndereco = res;
      }
    })
  }

  onEmail(myForm: NgForm){
    if(this.validarFormulario(myForm)){
      const email = new Email();
      email.evmAssunto = myForm.value.assunto;
      email.evmConteudo = myForm.value.mensagem +"<br/><br/>"+myForm.value.nome+"<br/> Telefone: "+this.formattedPhone+"<br/> Email: "+myForm.value.email
      this.emailService.enviarEmail(email).subscribe({
        next:(res) =>{
          this.mensagem.sucesso("Email enviado com sucesso");
        },error:(err)=>{
          this.mensagem.error(err.error?.message);
          console.log(err.error?.message)
        }
      })
    }
  }
  onWhatsapp(myForm: NgForm){
    if(this.validarFormulario(myForm)){
      const url =  "https://api.whatsapp.com/send?phone=55"+this.empresaEndereco.cntWhatsapp+"&text="+myForm.value.mensagem;
      window.open(url, '_blank')
    }
  }

  validarFormulario(myForm: NgForm): boolean{
    if(myForm.value.mensagem === ""
       || myForm.value.assunto === ""
       || myForm.value.email === ""
       || myForm.value.telfone === ""
       || myForm.value.nome === ""
    ){
      this.valida = true;
      return false;
    }
    this.valida = false;
    return true;
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.formattedPhone = this.formatPhone(value);
  }

  formatPhone(phone: string): string {
    phone = phone.replace(/\D/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  }

}
