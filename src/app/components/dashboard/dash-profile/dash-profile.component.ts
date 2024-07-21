import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.component.html',
  styleUrls: ['./dash-profile.component.scss']
})
export class DashProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  currentUser: any;
  userId: number | null = null;
  editingField: string | null = null;
  imageBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForms();

    this.auth.getCurrentUser().subscribe({
      next: user => {
        this.currentUser = user;
        this.userId = this.auth.getLoggedInUserId();
        console.log('Retrieved User ID:', this.userId);
        this.setProfileFormValues();
        console.log('Retrieved User Data:', this.currentUser);
      },
      error: err => {
        console.error('Error retrieving current user:', err);
      }
    });
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['']
    });
  }

  setProfileFormValues(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        username: this.currentUser.UserName,
        email: this.currentUser.Email
      });
    }
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileService.uploadImage(file).subscribe({
        next: (base64String) => {
          this.imageBase64 = base64String;
         // console.log('Base64 Image String:', base64String);
          this.toastr.success('Image uploaded successfully');
        },
        error: (error) => {
          console.error('Failed to upload image:', error);
          this.toastr.error('Failed to upload image');
        }
      });
    } else {
      console.error('No file selected');
      this.toastr.error('No file selected');
    }
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid && this.userId !== null) {
      const patchDocument = this.createPatchDocument();
      this.profileService.updateProfile(this.userId, patchDocument).subscribe({
        next: (res) => {
          this.toastr.success('Profile Updated');
          this.profileForm.reset();
          this.editingField = null;
        },
        error: (err) => {
          this.toastr.error('Failed to update profile');
          console.error('Profile update error:', err);
        }
      });
    } else {
      this.toastr.error('User ID not found');
      console.error('User ID is null or invalid:', this.userId);
    }
  }

  createPatchDocument(): any[] {
    const formValues = this.profileForm.value;
    const patchDocument = [];

    for (const key in formValues) {
      if (formValues.hasOwnProperty(key) && formValues[key] !== null && formValues[key] !== undefined) {
        let value = formValues[key];
        if (key === 'image' && this.imageBase64) {
          value = this.imageBase64;
        }
        console.log(`Patch Document Field: ${key}, Value: ${value}`);
        patchDocument.push({ op: 'replace', path: `/${key}`, value: value });
      }
    }

    return patchDocument;
  }

  editField(field: string): void {
    this.editingField = field;
  }

  isFieldEditable(field: string): boolean {
    return this.editingField === field;
  }
}
