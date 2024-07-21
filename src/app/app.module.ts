import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashHeaderComponent } from './components/dashboard/dash-header/dash-header.component';
import { DashBodyComponent } from './components/dashboard/dash-body/dash-body.component';
import { DashProfileComponent } from './components/dashboard/dash-profile/dash-profile.component';
import { DashMainareaComponent } from './components/dashboard/dash-mainarea/dash-mainarea.component';
import { ManageGigComponent } from './components/dashboard/manage-gig/manage-gig.component';
import { AddGigComponent } from './components/dashboard/add-gig/add-gig.component';
import { EditGigComponent } from './components/dashboard/manage-gig/edit-gig/edit-gig.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchedserviceComponent } from './components/searchedservice/searchedservice.component';
import { SelectedSingleServiceComponent } from './components/selected-single-service/selected-single-service.component';
import { PaymentsuccessComponent } from './components/paymentsuccess/paymentsuccess.component';
import { PaymentfailComponent } from './components/paymentfail/paymentfail.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DashHeaderComponent,
    DashBodyComponent,
    DashProfileComponent,
    DashMainareaComponent,
    ManageGigComponent,
    AddGigComponent,
    EditGigComponent,
    SearchedserviceComponent,
    SelectedSingleServiceComponent,
    PaymentsuccessComponent,
    PaymentfailComponent,
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  providers: [ApiService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
