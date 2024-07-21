import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GigImage } from 'src/app/models/gig-image.model';
import { Gig } from 'src/app/models/gig.model';
import { AuthService } from 'src/app/services/auth.service';
import { GigService } from 'src/app/services/gig.service';

@Component({
  selector: 'app-add-gig',
  templateUrl: './add-gig.component.html',
  styleUrls: ['./add-gig.component.scss'],
})
export class AddGigComponent implements OnInit {
  gigForm!: FormGroup;
  currentUserId: number | null = null;
  selectedImages: GigImage[] = [];
  providerName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gigService: GigService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getLoggedInUserId();

    if (this.currentUserId) {
      this.authService.getProviderNameById(this.currentUserId).subscribe(
        (name: string) => {
          this.providerName = name;
          this.gigForm.patchValue({ providerName: this.providerName });
        },
        (error) => {
          console.error('Error fetching provider name:', error);
        }
      );
    }

    console.log('Current User ID (ngOnInit):', this.currentUserId);

    this.gigForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      pricing: [0, Validators.required],
      providerId: [{ value: this.currentUserId }, Validators.required],
      providerName: [this.providerName, Validators.required],
      images: [[]],
      serviceType: ['', Validators.required],
      serviceName: ['', Validators.required],
    });
  }

  onImageSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        this.selectedImages.push({ imageData: file }); // Store File objects directly
      });
    }
  }
 
  onSubmit(): void {
    if (this.gigForm.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('title', this.gigForm.get('title')!.value);
      formData.append('description', this.gigForm.get('description')!.value);
      formData.append('pricing', this.gigForm.get('pricing')!.value);
      formData.append('providerId', this.currentUserId!.toString());
      formData.append('providerName', this.providerName!);
      formData.append('serviceType', this.gigForm.get('serviceType')!.value);
      formData.append('serviceName', this.gigForm.get('serviceName')!.value);

      // Append images to FormData
      this.selectedImages.forEach((image, index) => {
        formData.append('Images', image.imageData);
      }); 
      // console.log("images", JSON.stringify(this.selectedImages))
      // formData.append("images", JSON.stringify(this.selectedImages))
      
      console.log('Submitting gig:', formData);

      // Send FormData with HTTP POST request
      this.gigService.createGig(formData).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.error('Error creating gig:', error);
        }
      );
    }
  }
}
