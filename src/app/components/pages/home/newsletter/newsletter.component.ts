import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Newsletter } from '../../../interface/geral/newsletter';
import { NewsletterService } from '../../../service/geral/newsletter.service';
import { Mensagem } from '../../../utils/mensagem';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit {

  newsletter: Newsletter = new Newsletter();

  constructor(private newsletterService: NewsletterService,
              private mensagem: Mensagem){}

  ngOnInit(): void {
    
  }

  salvar(){
    this.newsletterService.salvar(this.newsletter).subscribe({
      next:(res)=>{
        this.newsletter.nwlEmail = '';
        this.mensagem.sucesso("Assinado Newsletter com sucesso");
      }, error:(err)=>{
        console.log(err.error.message);
        this.mensagem.atencao(err.error.message);
      }
    })
  }

}
