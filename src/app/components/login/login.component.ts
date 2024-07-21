import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/validateform';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  currentUser: any;
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  loginForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private auth:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    }),
    this.auth.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText? this.type="text": this.type="password"; 
 }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openRegisterDialog(): void {
    this.dialogRef.close(); // Close the current register dialog
    this.dialog.open(RegisterComponent, {
      width: '500px',
    });
  }

  
  onLogin(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.toastr.success('Success', 'Login Successful');
            console.log('User ID:', this.auth.getLoggedInUserId()); // Log the user ID

            const userRole = this.auth.getRoleFromToken();
           //debugger
            if (userRole === 'Admin') {
              this.router.navigate(['dashboard']);
            } else {
              this.router.navigate(['home']);
              window.location.reload();
            }

            this.dialogRef.close();
           
          },
          error: (err) => {
            this.toastr.error('Something went wrong', 'Login Failed');
          }
        });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid");
    }
  }
}

  
  

