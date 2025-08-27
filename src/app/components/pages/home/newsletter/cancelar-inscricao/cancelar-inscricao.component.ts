import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../../cabecalho/home.component';
import { NewsletterService } from '../../../../service/geral/newsletter.service';
import { RodapeComponent } from '../../../rodape/rodape.component';


@Component({
  selector: 'app-cancelar-inscricao',
  imports: [HomeComponent, RodapeComponent],
  templateUrl: './cancelar-inscricao.component.html',
  styleUrl: './cancelar-inscricao.component.css'
})
export class CancelarInscricaoComponent implements OnInit {

  mostraMensagem!: boolean;
  constructor(private route: ActivatedRoute,
              private newsletterService: NewsletterService){}
  
  ngOnInit(): void {
    this.cancelarNewsletter();
  }

  cancelarNewsletter(){
    const nwlCodigo = this.route.snapshot.paramMap.get('nwlCodigo');
    if(nwlCodigo != null){
      this.newsletterService.cancelarInscricao(Number(nwlCodigo)).subscribe({
        next:(res) => {
          this.mostraMensagem = true;
        },
        error:(err) => {
          this.mostraMensagem = false;
          console.log(err.error.message);
        }
      })
    }
  }
}
