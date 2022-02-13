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
  dragoes: any = []

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
      Swal.close();
    })
  }

  apagarDragao = (id: any) => {
    if (window.confirm('Tem certeza que deseja apagar este dragão? Esta ação é irreversível!')){
      this.dragaoService.Delete(id).subscribe(() => {
        this.getDragoes();
      })
    }
  }

}
