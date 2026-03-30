import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// 1. IMPORT AUTH
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment'; 

export const appConfig: ApplicationConfig = {
  providers:[
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // 2. PROVIDE AUTH
    provideAuth(() => getAuth()) 
  ]
};