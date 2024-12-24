import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrls: ['./login.component.css'],
  imports:[FormsModule, ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      this.http.post('http://localhost:8080/api/v1/auth/signin', loginData)
        .subscribe(
          (response:any) => {
            const token = response.token;
  
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem('authToken', "Bearer "+token);
            // const isAdmin = response.roles?.includes('ADMIN'); // Assume `roles` contains user roles
            const role = response.role;
            localStorage.setItem('userRole', role);
          if (role === 'ADMIN') {
            this.router.navigate(['/films']);
          } else {
            this.router.navigate(['/userView']);
            // alert('You are not authorized to view films.');
          }
            // console.log('Login successful, token stored');
            // this.router.navigate(['/dashboard']); // Navigate to the next page
          },
          (error) => {
            console.error('Login failed', error);
            this.errorMessage = 'Invalid username or password';
          }
        );
    }
  }
}
