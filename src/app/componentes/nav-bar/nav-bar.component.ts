import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { Global } from '../../global';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router,
    public global: Global
  ) { }

  ngOnInit() {
  }

  sair = () => {
    Swal.fire({
      icon:'warning',
      title:'Atenção',
      text:'Deseja mesmo sair?',
      showCancelButton: true
    }).then(res => {
      if(res.isConfirmed){
        localStorage.clear();
        this.router.navigate(['/login']);
        this.global.nav = false;
      }
    })
  }
  

}
