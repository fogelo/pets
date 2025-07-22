import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isPasswordVisible = signal<boolean>(false)

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const formValue = this.form.value;

    const loginObservable = this.authService.login({
      username: formValue.username!,
      password: formValue.password!,
    });
    loginObservable.subscribe({
      next: (response) => {
        this.router.navigate(['']);
        console.log('Запрос успешно выполнен:', response);
      },
      error: (error) => {
        console.error('Ошибка при выполнении запроса:', error);
      },
    });
  }
}
