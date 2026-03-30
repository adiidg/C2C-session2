import { Routes } from '@angular/router';
import { Addition } from './addition/addition';
import { TextLoop } from './text-loop/text-loop';
import { TaskCrud } from './task-crud/task-crud';

export const routes: Routes = [
    {path:'addition',component:Addition},
    {path:'text-loop',component:TextLoop},
    { path: 'tasks', component: TaskCrud }
];
