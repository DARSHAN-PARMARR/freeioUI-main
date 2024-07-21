import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/validateform';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"


  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private auth: AuthService,
    private router:Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      isUser:[true],
      isProvider:[false]
    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text": this.type="password"; 
 }  


  onNoClick(): void {
    this.dialogRef.close();
  }

  openLoginDialog(): void {
    this.dialogRef.close();  
    this.dialog.open(LoginComponent, {
      width: '500px',
    });
  }
  
  onSignup() {
    if (this.registerForm.valid) {
      console.log('Register Form Value:', this.registerForm.value); // Log the form value
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Success', 'User Registered');
          this.registerForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Registration Error:', err); // Log the error for debugging
          let errorMessage = 'An unknown error occurred';
          
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
          this.toastr.error('Error', errorMessage);
          alert(errorMessage);
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.registerForm);
    }
  }
  
  
  
}
