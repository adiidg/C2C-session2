import { Component, inject, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private auth: Auth = inject(Auth);
  
  // 2. Inject the Change Detector
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef); 

  user$ = authState(this.auth);

  email = '';
  password = '';
  errorMessage = ''; 

  // [REGISTER]
  async register() {
    if (!this.email || !this.password) {
      this.showError("Please enter both email and password.");
      return;
    }

    try {
      this.showError(''); // Clear previous errors
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.clearForm();
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  // [LOGIN]
  async login() {
    if (!this.email || !this.password) {
      this.showError("Please enter both email and password.");
      return;
    }

    try {
      this.showError(''); // Clear previous errors
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.clearForm();
    } catch (error: any) {
      this.handleAuthError(error);
    }
  }

  //[LOGOUT]
  async logout() {
    await signOut(this.auth);
  }

  // Clear inputs after success
  clearForm() {
    this.email = '';
    this.password = '';
    this.showError('');
  }

  // ==========================================
  // 🌟 THE MAGIC FIX: FORCE UI REFRESH
  // ==========================================
  private showError(message: string) {
    this.errorMessage = message;
    // 3. This tells Angular to instantly refresh the HTML!
    this.cdr.detectChanges(); 
  }

  // ==========================================
  // NEAT ERROR HANDLER
  // ==========================================
  private handleAuthError(error: any) {
    let message = '';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please log in.';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not formatted correctly.';
        break;
      case 'auth/weak-password':
        message = 'Your password is too weak (minimum 6 characters).';
        break;
      case 'auth/invalid-credential':
        message = 'Incorrect email or password. Please try again.';
        break;
      case 'auth/operation-not-allowed':
        message = '⚠️ Error: You forgot to enable Email/Password in Firebase Console!';
        break;
      default:
        message = error.message ? error.message.replace('Firebase: ', '') : 'An unexpected error occurred.';
        break;
    }
    // Pass the message to our new refresher function
    this.showError(message); 
  }
}