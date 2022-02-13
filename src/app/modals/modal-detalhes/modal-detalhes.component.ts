import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

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
  }

  abrirDetalhes = (dragao:any) => {
    Swal.showLoading()
    this.mostrar = true;
    this.detalhes = dragao;
    Swal.close()
  }
  
  fecharModal = () => {
    Swal.showLoading()
    this.dragao = {};
    this.detalhes = {}
    this.mostrar = false;
    Swal.close()
  }

}
