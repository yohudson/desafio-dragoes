import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any = {};
  usuario = {
    nome: 'usuario',
    senha: '123'
  }

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    this.validarUsuario();
  }

  validarUsuario = () => {
    if (localStorage.getItem('login')){
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  
  realizarLogin = () => {
    if (!this.login.usuario){
      Swal.fire('Atenção', 'É preciso informar um nome de usuário', 'warning');
      return;
    }
    if (!this.login.senha){
      Swal.fire('Atenção', 'É preciso informar uma senha', 'warning');
      return;
    }
    if (this.login.usuario != this.usuario.nome){
      Swal.fire('Erro', 'O usuário não existe', 'error');
      return;
    }
    if (this.login.senha != this.usuario.senha){
      Swal.fire('Erro', 'A senha está incorreta', 'error');
      return;
    }
    else {
      localStorage.setItem('login', this.login);
      this.router.navigate(['/home']);
    }
  }
  
  verSenha = (senha: any) => {
    senha.type = senha.type === 'text' ? 'password' : 'text'
  }

}
