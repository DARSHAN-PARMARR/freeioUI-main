import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllGigDTO, Gig } from 'src/app/models/gig.model';
import { AuthService } from 'src/app/services/auth.service';
import { GigService } from 'src/app/services/gig.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  gigs: AllGigDTO[] = [];
  searchTerm: string = '';
  public image: string = ""; 

  constructor(private router: Router, private gigService: GigService, private authService: AuthService) {}

  ngOnInit(): void {
    this.gigs=[];
    this.loadGigs();
    const userId = this.authService.getLoggedInUserId();
      if (userId) {
        this.loadUserImage(userId);
      }
  }

  loadGigs(): void {
    this.gigService.getWholeGig().subscribe(
      (gigs) => {
        this.gigs = gigs;
        console.log(gigs);
      },
      (error) => {
        console.error('Failed to load gigs', error);
      }
    );
  }
  onSearch(): void {
    console.log('Search Term:', this.searchTerm); 
    if (this.searchTerm.trim()) {
      this.router.navigate(['/searchservice'], { queryParams: { term: this.searchTerm } });
      
    }
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
