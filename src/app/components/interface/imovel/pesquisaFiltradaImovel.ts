import { OrdenarEnum } from "../enum/ordenarImovel";

export class PesquisaFiltradaImovel{

    public ngcCodigo!: number | null;
    public tpiCodigo!: number[] | null;
    public stiCodigo!: number[] | null;
    public valorMinimo!: number | null;
    public valorMaximo!: number | null;
    public areaTotalMinimo!: number | null;
    public areaTotalMaximo!: number | null;
    public cidCodigo!: number | null;
    public endCodigo!: number[] | null;
    public conCodigo!: number[] | null;
    public imvDormitorio!: number | null;
    public imvSuite!: number | null;
    public imvGaragem!: number | null;
    public imvAceitaFinanciamento!: boolean | null;
    public imvMinhaCasaMinhaVida!: boolean | null;
    public imvMobiliado!: boolean | null;
    public lcpCodigo!: number | null;
    public imvDestaque!: boolean | null;
    public page: number;
    public size: number;
    public filter: number;
    public ordenar: string;
    constructor(){
        this.page = 0;
        this.size = 12;
        this.ordenar = OrdenarEnum.VALOR;
        this.filter = OrdenarEnum.ASC;
    }
}