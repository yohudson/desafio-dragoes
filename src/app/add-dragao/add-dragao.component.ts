import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
import { DragaoService } from '../services/dragoes-service.service';

@Component({
  selector: 'app-add-dragao',
  templateUrl: './add-dragao.component.html',
  styleUrls: ['./add-dragao.component.css']
})
export class AddDragaoComponent implements OnInit {

  dragao: any = {}
  dragaoExiste: boolean = false;

  constructor(
    private router: Router,
    private dragaoService: DragaoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('login')){
      this.router.navigate(['/login']);
    }
    var dragao = this.route.snapshot.paramMap.get("id");
    if (dragao){
      this.dragaoExiste = true;
      this.obterDadosDragao(dragao)
    }
  }

  voltarPagina = () => {
    this.router.navigate(['/']);
  }

  salvarDragao = () => {
    Swal.showLoading();
    this.validaDragao().then(res => {
      var data = new Date();
      this.dragao.createdAt = data.toISOString();
      this.dragaoService.Post(this.dragao).subscribe(() => {
        this.dragao = {};
        Swal.close()
        Swal.fire('Sucesso', 'Dragão salvo com sucesso', 'success');
        this.router.navigate(['/home']);
      })
      return
    }).catch(error => {
      Swal.fire('Erro', error, 'error');
    })
  }

  validaDragao = () => {
    return new Promise<any>((res, rej) => {
      if (this.dragao.name == '' || this.dragao.name == null){
        rej('É preciso informar um nome para o dragão');
      }
      if (this.dragao.type == '' || this.dragao.type == null){
        rej('É preciso informar o tipo do dragão');
      }
      else res('Dados do dragão completos')
    })
  }

  obterDadosDragao = (id: any) => {
    Swal.showLoading()
    this.dragaoService.GetById(id).subscribe(res => {
      console.log(res)
      this.dragao = res;
      Swal.close()
    })
  }
  
  atualizarDragao = () => {
    Swal.showLoading()
    var data = new Date();
    var obj = {
      name: this.dragao.name,
      type: this.dragao.type,
      createdAt: data.toISOString(),
      id: this.dragao.id
    }
    this.dragaoService.Put(obj).subscribe(() => {
      this.dragao = {}
      Swal.close()
      Swal.fire('Sucesso', 'Dragão atualizado com sucesso', 'success');
    })
  }



}
