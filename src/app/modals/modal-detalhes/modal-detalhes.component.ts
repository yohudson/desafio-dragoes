import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-detalhes',
  templateUrl: './modal-detalhes.component.html',
  styleUrls: ['./modal-detalhes.component.css']
})
export class ModalDetalhesComponent implements OnInit {

  mostrar: boolean = false;
  detalhes: any = {};

  @Input() dragao = {};

  constructor() { }

  ngOnInit(): void {
    this.abrirDetalhes(this.dragao)
  }

  abrirDetalhes = (dragao:any) => {
    this.mostrar = true;
    this.detalhes = dragao;
  }

  fecharModal = () => {
    this.dragao = {};
    this.detalhes = {}
    this.mostrar = false;
  }

}
