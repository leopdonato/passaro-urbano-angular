import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError, onErrorResumeNext } from 'rxjs/operators';

@Component({
  selector: 'xyz-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorno Oferta[]
      .pipe(debounceTime(1000)) //executa a ação do switchMap após 1 segundo
      .pipe(distinctUntilChanged()) //para fazer pesquisas distintas
      .pipe(switchMap((termo: string) => {

        if(termo.trim() === ''){
          //retornar um obervabele de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
        
      }))
    .pipe(catchError((err: any) => {
        return of<Oferta[]>([]);
      }));
  }
/*
  public pesquisa (termoDaBusca: string): void{
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log("Erro Status: ", erro.status),
      () => console.log('Fluxo de eventos completo')
    );
    
  }
  */

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
