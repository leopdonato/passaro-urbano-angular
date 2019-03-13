import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, interval, observable, Subject, pipe, Observer, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'xyz-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public tempoObservableSubscription: Subscription;
  private meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
    ) {}

  ngOnInit() {
    //console.log(this.route.snapshot.params['id']);
    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
      .then(( oferta: Oferta) => {
          this.oferta = oferta;
      })
   /* this.route.params.subscribe((parametro: any) => {
      console.log(parametro.id);
    });*/

    /*
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      () => console.log('processamento foi classificado como concluído')
    );
    */

    
    let tempo = interval(2000);

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) =>{
      console.log(intervalo);
    });
    

    //observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<string>) => {
      observer.next('Primeiro evento da stream');
      observer.complete();
      //observer.error('erro encontrado');
    });

    //observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado),
      (erro: string) => console.log(erro),
      () => console.log('stream de eventos finalizada')
    );

  }

  ngOnDestroy(){
    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe();
  }

}
