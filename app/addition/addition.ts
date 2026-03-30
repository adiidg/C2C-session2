import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-addition',
  imports: [FormsModule],
  templateUrl: './addition.html',
  styleUrl: './addition.scss',
})
export class Addition {

  number1: number=0;
  number2: number=0;

  multiplyresult: number | null = null;

  multiply(){
    this.multiplyresult=this.number1*this.number2;
  }
}
