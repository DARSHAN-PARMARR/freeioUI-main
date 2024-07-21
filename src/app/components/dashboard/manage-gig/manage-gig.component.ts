import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Gig, GigLocal } from 'src/app/models/gig.model';
import { AuthService } from 'src/app/services/auth.service';
import { GigService } from 'src/app/services/gig.service';
import { EditGigComponent } from './edit-gig/edit-gig.component';

@Component({
  selector: 'app-manage-gig',
  templateUrl: './manage-gig.component.html',
  styleUrls: ['./manage-gig.component.scss'],
})
export class ManageGigComponent implements OnInit {
  gigs: Gig[] = [];

  constructor(
    private gigService: GigService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gigs=[];
    const userRole = this.authService.getRoleFromToken();
    if (userRole === 'Admin') {
      this.loadAllGigs();
    } else {
      this.loadGigs();
    }
  }

  loadGigs(): void {
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (loggedInUserId !== null) {
      this.gigService.getGigsByProvider(loggedInUserId).subscribe(
        (gigs) => {
            this.gigs= gigs;
          
        },
        (error) => {
          console.error('Failed to load gigs', error);
        }
      );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  editGig(gig: Gig): void {
    if (gig.id !== undefined) {
      const dialogRef = this.dialog.open(EditGigComponent, {
        width: '400px',
        data: gig,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.updateGig(gig.id!, result);
        }
      });
    } else {
      console.error('Gig ID is undefined');
    }
  }

  updateGig(gigId: number, updatedGig: Partial<Gig>): void {
    console.log('Updating gig:', gigId, updatedGig);
    this.gigService.updateGig(gigId, updatedGig).subscribe(
      () => {
        const index = this.gigs.findIndex((g) => g.id === gigId);
        if (index !== -1) {
          this.gigs[index] = { ...this.gigs[index], ...updatedGig };
        }
      },
      (error) => {
        console.error('Failed to update gig', error);
      }
    );
  }

  deleteGig(id: number): void {
    if (id !== undefined) {
      this.gigService.deleteGig(id).subscribe(
        () => {
          this.gigs = this.gigs.filter((gig) => gig.id !== id);
        },
        (error) => {
          console.error('Failed to delete gig', error);
        }
      );
    } else {
      console.error('Gig ID is undefined');
    }
  }

  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }


  loadAllGigs(): void {
    this.gigService.getGigs().subscribe(
      (gigs) => {
        this.gigs = gigs;
      },
      (error) => {
        console.error('Failed to load gigs', error);
      }
    );
  }


//dsfdsdsf

}
