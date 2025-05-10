import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from '../../interface/geral/empresa';
import { Util } from '../../utils/util';
import {MatIconModule} from '@angular/material/icon';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

@Component({
    selector: 'app-rodape',
    imports: [MatIconModule],
    templateUrl: './rodape.component.html',
    styleUrl: './rodape.component.css'
})
export class RodapeComponent implements OnInit {

  @Input() empresaGeral!: Empresa;
  copiado = false;
  constructor(private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sectionId = params['section'];
      if (sectionId) {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100); // Aguarde 100ms para garantir que o DOM está renderizado
      }
    });
  }

  mostraImagem(empCodigo: number): string{
      return Util.mostraImagemEmpresa(empCodigo);
  }

  formatarTelefone(){
    if(this.empresaGeral.contato?.cntWhatsapp != null){
      const match = this.empresaGeral.contato?.cntWhatsapp.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : this.empresaGeral.contato?.cntWhatsapp;
    }
    return '';
  }
  copiarEmail(){
    this.copiado = true;
    navigator.clipboard.writeText(this.empresaGeral.email.emaEmail);
    timer(5000).subscribe(() => {
      this.copiado = false;
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.smoothScroll(element, 1000); // 1000ms (1 segundo) para ajustar a velocidade
    }
  }
  smoothScroll(target: HTMLElement, duration: number) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();
  
    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const run = this.ease(elapsedTime, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (elapsedTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
  
    requestAnimationFrame(animateScroll);
  }
  
  ease(t: number, b: number, c: number, d: number) {
    // Easing function for smoother scrolling
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  formataWatssap(): string{
    return environment.url_whatsapp+this.empresaGeral.contato?.cntWhatsapp+"&text=Olá, preciso de informações.";
  }

  formatCNPJ(): string {
    if(this.empresaGeral.empCnpj != null){
      const cnpj = this.empresaGeral.empCnpj.replace(/\D/g, '');
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }
    return '';
  }
  acessoSistema(){
    this.router.navigate(['acesso/sistema'])
  }
  acessoHome(id: string){
    this.router.navigate(["home"], { queryParams: { section: id } })
  }
}
