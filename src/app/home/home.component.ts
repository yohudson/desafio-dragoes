import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DragaoService } from '../services/dragoes-service.service';
import { Dragao } from '../models/dragao'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dragao = {} as Dragao;
  dragoes: any = [];
  dadosVazios: boolean = false;

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
        console.info('aqui')
        Swal.close();
      }
    })
  }

}
