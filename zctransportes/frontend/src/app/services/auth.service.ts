import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'http://localhost:3000/api/auth'; // URL del backend

 constructor(private http: HttpClient) { }

 login(nomUser: string, password: string): Observable<any> {
  console.log('AuthService: intentando login con:', { nomUser });
   return this.http.post(`${this.apiUrl}/login`, { nomUser, password });
 }

 // Guardar el token cuando el login es exitoso
 setToken(token: string): void {
   localStorage.setItem('token', token);
 }

 // Obtener el token guardado
 getToken(): string | null {
   return localStorage.getItem('token');
 }

 // Verificar si el usuario está logueado
 isLoggedIn(): boolean {
   return this.getToken() !== null;
 }

 // Cerrar sesión
 logout(): void {
   localStorage.removeItem('token');
 }
}