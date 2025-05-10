import { LoginService } from './../../../service/acesso/login.service';
import { Component, HostListener, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Empresa } from '../../../interface/geral/empresa';
import {MatIconModule} from '@angular/material/icon';
import { RodapeComponent } from "../../rodape/rodape.component";
import {MatMenuModule} from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { environment } from '../../../../../environments/environment.prod';

@Component({
    selector: 'app-home',
    imports: [RouterLink, RouterLinkActive, MatIconModule, MatMenuModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  @Input() empresaGeral!: Empresa;
  mostrarMenuFixo = false;
  logado: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private cookieService: CookieService){}

  ngOnInit(){
    this.logado = this.loginService.logado;
    this.route.queryParams.subscribe(params => {
      const sectionId = params['section'];
      if (sectionId) {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 10); // Aguarde 100ms para garantir que o DOM está renderizado
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.mostrarMenuFixo = scrollPosition > 100 && scrollPosition < scrollHeight - 100
  }

  formataWatssap(): string{
    return environment.url_whatsapp+this.empresaGeral.contato?.cntWhatsapp+"&text=Olá, preciso de informações.";
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.smoothScroll(element, 1000);
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

  acessoHome(id: string){
    this.router.navigate(["home"], { queryParams: { section: id } })
  }

  deslogar(){
    this.logado = false;
   this.loginService.deslogar();
  }
}



