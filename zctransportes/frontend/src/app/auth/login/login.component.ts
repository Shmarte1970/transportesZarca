import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    nomUser: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Enviando datos:', this.loginData);
    this.authService.login(this.loginData.nomUser, this.loginData.password)
    .subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);  // Añadimos esta línea
      },
      error: (error) => {
        console.error('Error en login:', error);
      }
    });
  }
}