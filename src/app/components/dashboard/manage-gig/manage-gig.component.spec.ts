import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGigComponent } from './manage-gig.component';

describe('ManageGigComponent', () => {
  let component: ManageGigComponent;
  let fixture: ComponentFixture<ManageGigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageGigComponent]
    });
    fixture = TestBed.createComponent(ManageGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
