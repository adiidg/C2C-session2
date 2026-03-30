import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// 🛑 ONLY import from @angular/fire/firestore. Check carefully that 'firebase/firestore' is not here!
import { Firestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

export interface Task {
  id?: string;
  name: string;
  isDone: boolean;
}

@Component({
  selector: 'app-task-crud',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-crud.html',
  styleUrl: './task-crud.scss'
})
export class TaskCrud {
  
  taskName: string = ''; 
  private firestore: Firestore = inject(Firestore);
  
  // Use an Observable to hold the data stream
  tasks$: Observable<Task[]>; 

  constructor() {
    // 🔥 THE FIX: Bypass `collectionData` by wrapping `onSnapshot` in an Observable.
    this.tasks$ = new Observable<Task[]>((observer) => {
      const taskCollection = collection(this.firestore, 'tasks');
      
      // Listen to real-time changes
      const unsubscribe = onSnapshot(taskCollection, 
        (snapshot) => {
          const tasks = snapshot.docs.map(document => {
            return {
              id: document.id, 
              ...document.data() 
            } as Task;
          });
          // Send the new data to the HTML template
          observer.next(tasks);
        }, 
        (error) => observer.error(error)
      );

      // When you leave the page, the async pipe in your HTML automatically 
      // triggers this return function to stop listening and save memory!
      return () => unsubscribe();
    });
  }

  // [CREATE]
  async addTask() {
    if (!this.taskName.trim()) return; 
    
    const taskCollection = collection(this.firestore, 'tasks');
    await addDoc(taskCollection, {
      name: this.taskName.trim(),
      isDone: false
    });

    this.taskName = ''; 
  }

  // [UPDATE]
  async markAsDone(taskId: string | undefined, currentStatus: boolean) {
    if (!taskId) return;
    const documentRef = doc(this.firestore, 'tasks', taskId); 
    await updateDoc(documentRef, {
      isDone: !currentStatus 
    });
  }

  // [DELETE]
  async deleteTask(taskId: string | undefined) {
    if (!taskId) return;
    const documentRef = doc(this.firestore, 'tasks', taskId);
    await deleteDoc(documentRef);
  }
}