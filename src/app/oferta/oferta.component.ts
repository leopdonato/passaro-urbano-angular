import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { CarrinhoService } from '../carrinho-service';


@Component({
  selector: 'xyz-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) {}

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
              //console.log(this.route.snapshot.params['id']);
      this.ofertasService.getOfertaPorId(parametros.id/*this.route.snapshot.params['id']*/)
      .then(( oferta: Oferta) => {
          this.oferta = oferta;
    })
            /* this.route.params.subscribe((parametro: any) => {
                console.log(parametro.id);
              });*/
    });

    /*
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      () => console.log('processamento foi classificado como concluído')
    );
    */

  }

  ngOnDestroy(){
  }

  public adicionarItemCarrinho(oferta: Oferta): void {
    this.carrinhoService.incluirItens(oferta);
    this.carrinhoService.exibirItens();
  }

}
