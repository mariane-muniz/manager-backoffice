import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrIconModule } from '@clr/angular';
import { HeaderFragmentComponent } from './header-fragment/header-fragment.component';



@NgModule({
  declarations: [HeaderFragmentComponent],
  imports: [
    CommonModule,
    ClrIconModule,
    RouterModule
  ],
  exports: [
    HeaderFragmentComponent
  ]
})
export class FragmentsModule { }
