import { Responsable } from './../../../classes/models/responsable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EchangeService } from '../../../classes/services/echange.service';
import { CommonModule } from '@angular/common';
import { Client } from '../../../classes/models/client';

@Component({
  selector: 'app-echange',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './echange.component.html',
  styleUrls: ['./echange.component.scss']
})
export class EchangeComponent implements OnInit {
  echangeForm: FormGroup;
  client!: Client | null;
  responsable!: Responsable | null;

  constructor(
    private fb: FormBuilder,
    private echangeService: EchangeService,
    private router: Router
  ) {
    this.echangeForm = this.fb.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      state: ['en cours', Validators.required],
      livrer: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.retrieveDataFromNavigationOrStorage();
  }

  retrieveDataFromNavigationOrStorage() {
    // Attempt to retrieve client and responsable from navigation state
    this.client = history.state.client;
    this.responsable = history.state.responsable;

    // If not found in navigation state, try retrieving from local storage
    if (!this.responsable) {
      this.responsable = this.getFromLocalStorage('responsable');
    }
    if (!this.client) {
      this.client = this.getFromLocalStorage('client');
    }

    // If neither client nor responsable data is available, navigate to error page
    if (!this.responsable && !this.client) {
      console.error('Client and Responsable data are missing');
      this.router.navigate(['/error']);
    }
  }

  getFromLocalStorage(key: string): any {
    const dataJson = localStorage.getItem(key);
    return dataJson ? JSON.parse(dataJson) : null;
  }

  onSubmit() {
    if (this.echangeForm.valid) {
      const echangeData = {
        ...this.echangeForm.value,
        ...(this.responsable && { responsable: { id: this.responsable.id } }),
        ...(this.client && { client: { code: this.client.code } })
      };

      this.echangeService.saveEchange(echangeData).subscribe(
        (response) => {
          console.log('Echange saved successfully', response);
          this.router.navigate(['/echanges']);
        },
        (error) => {
          console.error('Error saving echange', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
