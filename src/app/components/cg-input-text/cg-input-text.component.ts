import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cg-input-text',
  templateUrl: './cg-input-text.component.html',
  styleUrls: ['./cg-input-text.component.css']
})
export class CgInputTextComponent implements OnInit {

  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() formControlName: string = ''; // Não tem como
  @Output() eventoChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  evento(event: any) {
    this.eventoChange.emit(event);
  }

}
