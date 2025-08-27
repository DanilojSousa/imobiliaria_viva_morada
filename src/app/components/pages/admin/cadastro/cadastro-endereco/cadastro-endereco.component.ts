import { Component, Inject, inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mensagem } from '../../../../utils/mensagem';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { EnderecoDTO } from '../../../../interface/pessoa/endereco';
import { EnderecoService } from '../../../../service/pessoa/endereco.service';
import { Cidade } from '../../../../interface/pessoa/cidade';
import { Estado } from '../../../../interface/pessoa/estado';
import { EstadoService } from '../../../../service/pessoa/estado.service';
import { CidadeService } from '../../../../service/pessoa/cidade.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-cadastro-endereco',
    imports: [MatButtonModule, MatStepperModule, FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatCheckboxModule, MatSelectModule],
    templateUrl: './cadastro-endereco.component.html',
    styleUrl: './cadastro-endereco.component.css'
})
export class CadastroEnderecoComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<CadastroEnderecoComponent>, { optional: true });
  endereco: EnderecoDTO = new EnderecoDTO();
  listaEstado: Estado[] = [];
  listaCidade: Cidade[] = [];
  estado: Estado = new Estado();
  valida = false;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { dialog: boolean } | null,
              private route: ActivatedRoute,
              private router: Router,
              private mensagemService: Mensagem,
              private estadoService: EstadoService,
              private cidadeService: CidadeService,
              private enderecoService: EnderecoService){}

  ngOnInit(): void {    
    this.carregaListas();
  }
  carregaListas() {
    this.estadoService.getAll().subscribe({
      next:(res)=>{
        this.listaEstado = res;
      }, error:(err)=>{
        console.log("Erro ao carregar a lista de estado: ", err.error?.message)
      }
    })
    this.detalhe();
  }

  detalhe() {
    const endCodigo =  this.route.snapshot.paramMap.get('endCodigo');
    if(endCodigo != null){
      this.enderecoService.getById(Number(endCodigo)).subscribe({
        next:(res)=>{
          this.endereco = res;
          this.sicronizarListas();
        },error:(err)=>{
          console.log("Erro ao carregar o endereço: "+ err.error?.message);
          this.mensagemService.error(err.error?.message)
        }
      })
    }
  }

  carregaCidade(estCodigo: number){
    this.listaCidade = []
    this.cidadeService.getAllPorEstCodigoGeral(estCodigo).subscribe({
      next:(res)=>{
        this.listaCidade = res;
      }, error:(err)=>{
        console.log("Erro ao carregar a cidade: "+ err.error?.message);
      }
    })
  }

  sicronizarListas(){
    const estado = this.listaEstado.find(estado => estado.estCodigo === this.endereco.cidade.estado.estCodigo);
    if (estado){
      this.estado = estado;
      this.cidadeService.getAllPorEstCodigoGeral(estado.estCodigo).subscribe({
        next:(res)=>{
          this.listaCidade = res;
          const cidade = this.listaCidade.find(cidade => cidade.cidCodigo === this.endereco.cidade.cidCodigo);
          if (cidade) this.endereco.cidade = cidade;
        }, error:(err)=>{
          console.log("Erro ao carregar a cidade da sicronização de listas: "+ err.error?.message);
        }
      })
    }
  }

  voltar(){
    this.router.navigate(['acesso/sistema/detalhe/endereco'])
  }
  salvar(){;
    if(this.validaCampos()){
      return;
    }
    this.endereco.endCep = this.endereco.endCep.replace(/\D/g, '');
    this.enderecoService.salvar(this.endereco).subscribe({
      next:(res)=>{
        this.endereco = res;
        this.mensagemService.sucesso("Endereço salvo com sucesso");
        if(this.data!.dialog){
          this.dialogRef!.close();
        }
      }, error:(err)=>{
        this.mensagemService.error("Erro ao salvar o endereço");
        console.log("Erro ao salvar o endereço: "+ err.error?.message);
      }
    });
  }
  validaCampos(): Boolean{
    if(this.endereco.endEndereco === undefined || this.endereco.endEndereco.length === 0
      && this.endereco.endBairro === undefined || this.endereco.endBairro.length === 0
      && this.endereco.endCep === undefined || this.endereco.endCep.length === 0
      && this.endereco.cidade.cidDescricao === undefined || this.endereco.cidade.cidDescricao.length === 0
      && this.endereco.cidade.estado.estDescricao === undefined || this.endereco.cidade.estado.estDescricao.length === 0
    ){
      this.valida = true;
      return true;
    }
    this.valida = false;
    return false;
  }
  checarCep(cep: string): void {
    if (!cep) return;
    cep = cep.replace(/\D/g, '');
    // Formata no padrão 00000-000
    this.endereco.endCep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }
  liberarBotaoVoltar(): boolean{
    if(this.data != null && this.data.dialog){
      return false;
    }
    return true;
  }
  novo(){
    this.endereco = new EnderecoDTO();
    this.router.navigate(['acesso/sistema/cadastro/endereco'])
  }
}
