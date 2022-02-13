import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddDragaoComponent } from './add-dragao/add-dragao.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { DragaoService } from './services/dragoes-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddDragaoComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [DragaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
