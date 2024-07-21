import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Gig } from 'src/app/models/gig.model';

@Component({
  selector: 'app-edit-gig',
  templateUrl: './edit-gig.component.html',
  styleUrls: ['./edit-gig.component.scss']
})
export class EditGigComponent implements OnInit {
  editGigForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditGigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gig
  ) {
      this.editGigForm = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      serviceType: [data.serviceType, Validators.required],
      serviceName: [data.serviceName, Validators.required],
      pricing: [data.pricing, Validators.required],
      providerId: [data.providerId],
      providerName: [data.providerName],
    });
  }

  ngOnInit(): void {}

 
  onSubmit(): void {
    if (this.editGigForm.valid) {
      const updatedGig = { ...this.editGigForm.value };
      this.dialogRef.close(updatedGig);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}