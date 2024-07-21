import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dash-body',
  templateUrl: './dash-body.component.html',
  styleUrls: ['./dash-body.component.scss']
})
export class DashBodyComponent {

  constructor(public dialog: MatDialog,private api: ApiService,private auth: AuthService, private userStore: UserStoreService, private router:Router) {
    }

  public users:any=[];
  public name : string = "";
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
  }

  logout(){
    this.auth.signOut();
    this.router.navigate(['home'])
  } 
}
