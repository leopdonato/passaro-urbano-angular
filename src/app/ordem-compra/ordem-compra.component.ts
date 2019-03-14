import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  @ViewChild('formulario')
  public form: NgForm;

  public idPedidoCompra: number;

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {

    let pedido: Pedido = new Pedido(
      this.form.value.endereco,
      this.form.value.numero,
      this.form.value.complemento,
      this.form.value.formaPagamento
      )

    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((idPedido:number) =>{
        this.idPedidoCompra = idPedido;
      });
  }
}
