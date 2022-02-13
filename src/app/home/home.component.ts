import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DragaoService } from '../services/dragoes-service.service';
import { Dragao } from '../models/dragao'
import Swal from 'sweetalert2';
import { ModalDetalhesComponent } from '../modals/modal-detalhes/modal-detalhes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dragao = {} as Dragao;
  dragoes: any = [];
  dadosVazios: boolean = false;
  dadosDragao: any = {};

  constructor(
    public router: Router,
    private dragaoService: DragaoService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('login')){
      this.router.navigate(['/login']);
    }
    else{
      this.getDragoes()
    }
  }

  getDragoes = () => {
    Swal.showLoading();
    this.dragaoService.Get().subscribe((dragoes: Dragao[])=> {
      this.dragoes = dragoes;
      for (let dragao of this.dragoes){
        this.validarDados(dragao).then(res => {
          var dataCriacao = dragao.createdAt.split("T")[0];
          var horaCriacao = dragao.createdAt.split("T")[1];
          dataCriacao = dataCriacao.split("-")[2]+"/"+dataCriacao.split("-")[1]+"/"+dataCriacao.split("-")[0];
          horaCriacao = horaCriacao.split(":")[0]+":"+horaCriacao.split(":")[1];
          dragao.criadoEm = dataCriacao+" "+horaCriacao;
        }).catch(err => {
          dragao.criadoEm = err
        })        
      }
      this.dadosVazios = false;
      Swal.close();
    },
    (err) => {this.dadosVazios = true}
    )
  }

  apagarDragao = (dragao: any) => {
    Swal.fire({
      title:'Atenção',
      icon:'warning',
      text:'Tem certeza que deseja apagar este dragão? Esta ação é irreversível!',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showCloseButton: true
    }).then(res => {
      if (res.isConfirmed){
        Swal.showLoading();
        this.dragaoService.Delete(dragao).subscribe(() => {
          this.getDragoes();
          console.info('aqui')
          Swal.close();
        })
      }
      else{
        Swal.close();
      }
    })
  }

  verDetalhes = (data: any) => {
    this.dadosDragao = data;
    console.log(this.dadosDragao)
  }

  validarDados = (data: any) => {
    return new Promise((res, rej) => {
      var i = data.createdAt.split('T').length;
      if (i > 1){
        res (data)
      }
      else {
        rej (data.createdAt)
      }
    })
  }


}
