import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordPageRoutingModule } from './password-routing.module';

import { PasswordPage } from './password.page';
import { ApiZooService } from 'src/app/Servicio/api-zoo.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PasswordPageRoutingModule,
    HttpClientModule
  ],
  declarations: [PasswordPage],
  providers:[ApiZooService]
})
export class PasswordPageModule {}
