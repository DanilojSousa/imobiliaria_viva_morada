import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ImovelService } from '../../../service/imovel/imovel.service';
import { ImovelDashboard } from '../../../interface/imovel/imovelDashboard';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { PieChart } from '../../../interface/imovel/pie_chart';
import { ChartsBar } from '../../../interface/imovel/charts_bar';
import { DialogDashboardComponent } from './dialog-dashboard/dialog-dashboard.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  imports: [MatIcon, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  dashboard: ImovelDashboard = new ImovelDashboard();
  readonly dialog = inject(MatDialog);
  pieChart: PieChart[] = [];
  chartsBar: ChartsBar[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Ações';
  showYAxisLabel = true;
  yAxisLabel = 'Total';
  view: [number, number] = [600, 300];
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private imovelService: ImovelService){

  }
  ngOnInit(): void {
    this.dadosDashbard();
  }

  dadosDashbard(){
    this.imovelService.dadosDashboard().subscribe({
      next:(res)=>{
        this.dashboard = res;
        this.populaPieChart(res);
        this.populaChartsBar(res);        
      }
    })
  }
  populaChartsBar(res: ImovelDashboard) {
    this.chartsBar = [
      { name: 'Favorito', value: res.imvFavorito },
      { name: 'Compartilhamento', value: res.imvCompartilhamento },
      { name: 'Visualizacao', value: res.imvVisualizacao }
    ];
  }
  populaPieChart(res: ImovelDashboard) {
    this.pieChart = [
      { name: 'Total', value: res.totalImovel },
      { name: 'Ativo', value: res.totalAtivo },
      { name: 'Inativo', value: res.totalInativo }
    ];
  }

  onSelect(data: any): void {
    this.abrirDialogDashboard(data.name)
  }

  carregaDialog(valor: string){
    this.abrirDialogDashboard(valor)
  }

  abrirDialogDashboard(acao: string){
    const dialogRef = this.dialog.open(DialogDashboardComponent, {
      width: '800px',
      height: '600px',
      maxWidth: '100%',
      maxHeight: 'auto',
      data:{acao: acao}
    });
  }
}
