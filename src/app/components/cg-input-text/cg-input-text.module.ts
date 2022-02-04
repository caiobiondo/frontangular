import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { CgInputTextComponent } from './cg-input-text.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [CgInputTextComponent],
  exports: [CgInputTextComponent]
})
export class CgInputTextModule { }
