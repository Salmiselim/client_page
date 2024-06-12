import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { ClientService } from '../../classes/services/client.service';
import { Client } from '../../classes/models/client';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  client: Client = new Client();
  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  locations: string[] = ['Tunis', 'Other Location 1', 'Other Location 2'];


  constructor(private clientService: ClientService,private _formBuilder: FormBuilder,private router: Router) { }

  register(): void {
    this.clientService.registerClient(this.client).subscribe(
      registeredClient => {
        console.log('Client registered:', registeredClient);
        alert("Thank you for registering. Please wait for admin approval.");
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error registering client:', error);
      }
    );
  }

togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  firstFormGroup = this._formBuilder.group({
    lastname: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
    name: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      location: ['', Validators.required],
  });

    thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    isLinear = false;

    navigateToLogin() {
      this.router.navigate(['/login']);
    }

}
