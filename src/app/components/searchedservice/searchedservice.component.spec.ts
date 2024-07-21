import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedserviceComponent } from './searchedservice.component';

describe('SearchedserviceComponent', () => {
  let component: SearchedserviceComponent;
  let fixture: ComponentFixture<SearchedserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchedserviceComponent]
    });
    fixture = TestBed.createComponent(SearchedserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
