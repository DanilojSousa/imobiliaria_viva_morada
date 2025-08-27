export class Paginacao{
    public page!: number;
    public size!: number;
    public pesquisa!: string;
    constructor(page:number, size:number){
        this.page = page;
        this.size = size;
    }
}