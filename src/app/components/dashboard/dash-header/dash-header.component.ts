import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.scss']
})
export class DashHeaderComponent implements OnInit {
  constructor(private api: ApiService,private auth: AuthService, private userStore: UserStoreService, private router:Router){}

  public users:any=[];
  public name : string = "";
  public image: string = ""; 

  public role!:string; 

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
  }
  logout(){
    this.auth.signOut();
    this.router.navigate(['home'])
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

}
