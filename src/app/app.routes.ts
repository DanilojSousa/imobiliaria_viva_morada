import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login/login.component';
import { InicioComponent } from './components/pages/home/inicio.component';
import { DetalheComponent } from './components/pages/home/detalhe/detalhe.component';
import { FiltradoComponent } from './components/pages/home/filtrado/filtrado.component';
import { SistemaComponent } from './components/pages/admin/sistema/sistema.component';
import { LogadoOnGuard } from './components/account/shared/logadoOn';
import { CadastroImovelComponent } from './components/pages/admin/cadastro/cadastro_imovel/cadastro_imovel.component';
import { ImovelComponent } from './components/pages/admin/detalhe/imovel/imovel.component';
import { UsuarioComponent } from './components/pages/admin/detalhe/usuario/usuario.component';
import { EnderecoComponent } from './components/pages/admin/detalhe/endereco/endereco.component';
import { NegocioComponent } from './components/pages/admin/detalhe/negocio/negocio.component';
import { TipoImovelComponent } from './components/pages/admin/detalhe/tipo-imovel/tipo-imovel.component';
import { SituacaoComponent } from './components/pages/admin/detalhe/situacao/situacao.component';
import { LocalizacaoComponent } from './components/pages/admin/detalhe/localizacao/localizacao.component';
import { CadastroEnderecoComponent } from './components/pages/admin/cadastro/cadastro-endereco/cadastro-endereco.component';
import { CadastroUsuarioComponent } from './components/pages/admin/cadastro/cadastro-usuario/cadastro-usuario.component';
import { CondominioComponent } from './components/pages/admin/detalhe/condominio/condominio.component';
import { EmpresaComponent } from './components/pages/admin/detalhe/empresa/empresa.component';
import { CadastroEmpresaComponent } from './components/pages/admin/cadastro/cadastro-empresa/cadastro-empresa.component';
import { AreaLazerComponent } from './components/pages/admin/detalhe/area-lazer/area-lazer.component';
import { ProximidadeComponent } from './components/pages/admin/detalhe/proximidade/proximidade.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'home', component: InicioComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'imovel/detalhes/:imvCodigo', component: DetalheComponent},
  {path: 'imovel/filtro', component: FiltradoComponent},
  {
    path: 'acesso/sistema', component: SistemaComponent,
    children:[
      {path: 'detalhe/dashboard', component: DashboardComponent},
      {path: 'detalhe/imovel', component: ImovelComponent},
      {path: 'detalhe/usuario', component: UsuarioComponent},
      {path: 'detalhe/endereco', component: EnderecoComponent},
      {path: 'detalhe/negocio', component: NegocioComponent},
      {path: 'detalhe/tipoImovel', component: TipoImovelComponent},
      {path: 'detalhe/situacao', component: SituacaoComponent},
      {path: 'detalhe/localizacao', component: LocalizacaoComponent},
      {path: 'detalhe/condominio', component: CondominioComponent},
      {path: 'detalhe/empresa', component: EmpresaComponent},
      {path: 'detalhe/areaLazer', component: AreaLazerComponent},
      {path: 'detalhe/proximidade', component: ProximidadeComponent},
      {path: 'cadastro/imovel', component: CadastroImovelComponent},
      {path: 'cadastro/imovel/:imvCodigo', component: CadastroImovelComponent},
      {path: 'cadastro/endereco', component: CadastroEnderecoComponent},
      {path: 'cadastro/endereco/:endCodigo', component: CadastroEnderecoComponent},
      {path: 'cadastro/usuario', component: CadastroUsuarioComponent},
      {path: 'cadastro/usuario/:usrCodigo', component: CadastroUsuarioComponent},
      {path: 'cadastro/empresa', component: CadastroEmpresaComponent},
      {path: 'cadastro/empresa/:empCodigo', component: CadastroEmpresaComponent},
    ]
  },
];
