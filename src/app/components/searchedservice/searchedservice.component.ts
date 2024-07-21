import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Gig } from 'src/app/models/gig.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchedservice',
  templateUrl: './searchedservice.component.html',
  styleUrls: ['./searchedservice.component.scss']
})
export class SearchedserviceComponent implements OnInit{
  searchTerm: string = '';
  results: Gig[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      this.searchGigs();
    });
  }

  searchGigs(): void {
    if (this.searchTerm) {
      console.log('Searching for:', this.searchTerm); 
      this.searchService.searchGigs(this.searchTerm).subscribe(
        (data) => {
          console.log('Search Results:', data); 
          this.results = data;         
        },
        (error) => console.error('Search error', error)
      );
    }
  }

  goToService(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/service', id.toString()]);
    }
  }
  getImageSrc(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}