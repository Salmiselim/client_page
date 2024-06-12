import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../classes/services/client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeveefondService } from '../../../classes/services/leveefond.service';
import { Leveefond } from '../../../classes/models/leveefond';
import { MiseADispositionService } from '../../../classes/services/miseadisposition.service';
import { Client } from '../../../classes/models/client';
import { Responsable } from '../../../classes/models/responsable';

@Component({
  selector: 'app-mise-a-dispo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './mise-a-dispo.component.html',
  styleUrl: './mise-a-dispo.component.scss'
})
export class MiseADispoComponent implements OnInit {
  miseADispositionForm: FormGroup;
  clientCode: string | null = null;
  responsableId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private miseADispositionService: MiseADispositionService,
    private router: Router
  ) {
    this.miseADispositionForm = this.fb.group({
      state: ['en cours', Validators.required],
      livrer: [false, Validators.required],
      chequesBancaires: [false, Validators.required],
      titresDePaiement: [false, Validators.required],
      documentsBancaires: [false, Validators.required],
      documentsConfidentiels: [false, Validators.required]
    });
  }

  ngOnInit() {
    // Retrieve the client and responsable objects from local storage
    const clientData = localStorage.getItem('client');
    const responsableData = localStorage.getItem('responsable');

    if (clientData) {
      const client: Client = JSON.parse(clientData);
      this.clientCode = client.code ?? null;
    }

    if (responsableData) {
      const responsable: Responsable = JSON.parse(responsableData);
      this.responsableId = responsable.id ?? null;
    }
  }

  onSubmit() {
    if (this.miseADispositionForm.valid && (this.clientCode || this.responsableId)) {
      const miseADispositionData = {
        ...this.miseADispositionForm.value,
        ...(this.clientCode && { client: { code: this.clientCode } }),
        ...(this.responsableId && { responsable: { id: this.responsableId } })
      };

      this.miseADispositionService.saveMiseADisposition(miseADispositionData).subscribe(
        response => {
          console.log('Mise à disposition saved successfully', response);
          this.router.navigate(['/miseadispositions']);
        },
        error => {
          console.error('Error saving mise à disposition:', error);
        }
      );
    } else {
      console.error('Form is not valid or client/responsable information is missing');
    }
  }
}
