import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGigComponent } from './edit-gig.component';

describe('EditGigComponent', () => {
  let component: EditGigComponent;
  let fixture: ComponentFixture<EditGigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGigComponent]
    });
    fixture = TestBed.createComponent(EditGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
