import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordRecoveryComponent {
  private _fb = inject(FormBuilder);

  recoveryForm: FormGroup;
  isLoading = signal(false);
  isEmailSent = signal(false);
  errorMessage = signal('');

  constructor() {
    this.recoveryForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      
      // Simulate password recovery process
      setTimeout(() => {
        this.isLoading.set(false);
        this.isEmailSent.set(true);
        console.log('Recovery email sent to:', this.recoveryForm.value.email);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm() {
    this.isEmailSent.set(false);
    this.recoveryForm.reset();
    this.errorMessage.set('');
  }

  private markFormGroupTouched() {
    Object.keys(this.recoveryForm.controls).forEach(key => {
      const control = this.recoveryForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() { return this.recoveryForm.get('email'); }
}
