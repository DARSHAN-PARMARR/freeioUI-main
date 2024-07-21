import { Component, OnInit ,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  notifications: Notification[] = [];
  currentUserId: number| null = null;;

  constructor(public dialog: MatDialog,
    private api: ApiService,
    private auth: AuthService,
     private userStore: UserStoreService, 
     private router:Router,
     private notificationService: NotificationService
    ) {
      
  this.isLoggedIn = this.checkUserLoggedIn();
  this.currentUserId = this.auth.getLoggedInUserId();
  }

  public users:any=[];
  public name : string = "";
  textColor = '#FFFFFF';
  public role!:string; 
  public image: string = ""; 

  ngOnInit(): void {
    this.api.getUsers().
    subscribe(res=>{
        this.users = res;
      });
      this.userStore.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken = this.auth.getfullNameFromToken();
        this.name= val || fullNameFromToken
      });
      this.userStore.getRoleFromStore()
      .subscribe(val=>{
        let roleFromToken = this.auth.getRoleFromToken();
        this.role= val || roleFromToken
      })
      const userId = this.auth.getLoggedInUserId();
      if (userId) {
        this.loadUserImage(userId);
      }

      this.loadNotifications();
 
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) { 
      this.textColor = '#000000'; 
    } else {
      this.textColor = '#FFFFFF'; 
    }
  }
  loadNotifications(): void {
    if (this.currentUserId !== null) {
      this.notificationService.getNotifications(this.currentUserId).subscribe(
        (notifications) => {
          this.notifications = notifications;
          console.log(notifications);
        },
        (error) => {
          console.error('Error loading notifications:', error);
        }
      );
    }
  }
  loadUserImage(userId: number): void {
    this.auth.getUserImage(userId).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Failed to load user image', error);
      }
    );
  }

  checkUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['home'])
    window.location.reload();
  } 
 
  dashboard(){
    this.router.navigate(['dashboard'])
  }
  profile(){
    this.router.navigate(['profile']);
  }


  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    });
  }
}