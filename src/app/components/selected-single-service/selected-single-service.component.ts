import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateReviewDTO } from 'src/app/models/CreateReviewDTO';
import { Gig } from 'src/app/models/gig.model';
import { singleServiceDTO } from 'src/app/models/singleserviceDTO';
import { AuthService } from 'src/app/services/auth.service';
import { GigService } from 'src/app/services/gig.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-selected-single-service',
  templateUrl: './selected-single-service.component.html',
  styleUrls: ['./selected-single-service.component.scss']
})
export class SelectedSingleServiceComponent implements OnInit{
  gig: singleServiceDTO | null = null;
  provider: any = {};
  gigId: number;
  totalPrice: number = 0;
  isHourly: boolean = true; 
  hours: number = 1; 
  days: number = 1; 
  startDate: string | null = null; 
  currentUserId: number; 

  reviewDescription: string = '';
  reviewRating: number = 0;

  gigs: Gig[] = [];
  public image: string = ""; 



  constructor(
    private route: ActivatedRoute,
    private gigService: GigService,
    private router: Router,
    private paymentService: PaymentService,
    private authService: AuthService,
    private reviewsService: ReviewsService
  ) { 
    this.gigId = +this.route.snapshot.paramMap.get('id')!;
    this.currentUserId = this.authService.getLoggedInUserId()!;

  }

  ngOnInit(): void {
    this.gigs=[];
    

    const gigId = this.route.snapshot.paramMap.get('id');
    if (gigId) {
      this.loadGigDetails(gigId);
    } else {
      console.error('Gig ID is null');
    }
    const userId = this.authService.getLoggedInUserId();
    if (userId) {
      this.loadUserImage(userId);
    }
  }

  loadGigDetails(gigId: string): void {
    this.gigService.getGigById(gigId).subscribe(
      (gig) => {
        this.gig = gig;
        console.log(gig);
        if (gig && gig.providerId) {
          this.totalPrice = gig.pricing || 0;
        //  this.loadProviderDetails(gig.providerId);
         gig.providerId;
          
        }
      },
      (error) => {
        console.error('Error loading gig details:', error);
      }
    );
  }

  setRating(rating: number): void {
    this.reviewRating = rating;
  }

  submitReview(): void {
    const review: CreateReviewDTO = {
      gigId: this.gigId,
      userId: this.currentUserId,
      reviewDescription: this.reviewDescription,
      reviewRating: this.reviewRating
    };
  
    this.reviewsService.createReview(review).subscribe(
      (response) => {
        console.log('Review submitted successfully:', response);

        this.reviewRating = 0;
        this.reviewDescription = '';
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  }
  

  checkout() {
    const domain = window.location.origin;
    const checkoutRequest = {
      gigId: this.gigId,
      totalPrice: this.isHourly ? this.totalPrice * this.hours : this.totalPrice * this.days,
      domain: domain,
      isHourly: this.isHourly,
      hours: this.isHourly ? this.hours : 0,
      days: this.isHourly ? 0 : this.days,
      userId: this.currentUserId, 
      startDate: this.isHourly ? null : this.startDate,
      providerId: this.gig?.providerId 
      
    };

    this.paymentService.checkout(checkoutRequest).subscribe(
      response => {
        window.location.href = response.sessionUrl;
      },
      error => {
        console.error('Error during checkout:', error);
      }
    );
  }


  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  loadUserImage(userId: number): void {
    this.authService.getUserImage(userId).subscribe(
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