import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashProfileComponent } from './components/dashboard/dash-profile/dash-profile.component';
import { DashMainareaComponent } from './components/dashboard/dash-mainarea/dash-mainarea.component';
import { ManageGigComponent } from './components/dashboard/manage-gig/manage-gig.component';
import { AddGigComponent } from './components/dashboard/add-gig/add-gig.component';
import { SearchedserviceComponent } from './components/searchedservice/searchedservice.component';
import { SelectedSingleServiceComponent } from './components/selected-single-service/selected-single-service.component';
import { PaymentsuccessComponent } from './components/paymentsuccess/paymentsuccess.component';
import { PaymentfailComponent } from './components/paymentfail/paymentfail.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'searchservice', component: SearchedserviceComponent },
  {
    path: 'home', component:HomeComponent, children:[
      {path:'', component:HomeComponent},
      {path: 'searchservice', component: SearchedserviceComponent}
    ]

  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: DashMainareaComponent },  
      { path: 'profile', component: DashProfileComponent },
      { path: 'managegig', component: ManageGigComponent },
      { path: 'addgig', component: AddGigComponent }
    ]
  },
  { path: 'service/:id', component: SelectedSingleServiceComponent },
  { path: 'payment-success', component: PaymentsuccessComponent },
  { path: 'payment-cancelled', component: PaymentfailComponent },
  { path: 'paymentsuccess/:orderId', component: PaymentsuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
