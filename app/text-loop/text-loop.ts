import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-text-loop',
  imports: [FormsModule],
  templateUrl: './text-loop.html',
  styleUrl: './text-loop.scss',
})
export class TextLoop {


  messages: string[]=[
    "This is me",
    "I am learning hello world",
    "Angular is fun"
  ];

  newMessage: string = '';

addText() {
  if (this.newMessage.trim() !== '') {
    this.messages.push(this.newMessage);
    this.newMessage = '';
  }
}
  
  removeText(index: number) {
    this.messages.splice(index, 1);
  }

}
