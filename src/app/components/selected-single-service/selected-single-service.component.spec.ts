import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSingleServiceComponent } from './selected-single-service.component';

describe('SelectedSingleServiceComponent', () => {
  let component: SelectedSingleServiceComponent;
  let fixture: ComponentFixture<SelectedSingleServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedSingleServiceComponent]
    });
    fixture = TestBed.createComponent(SelectedSingleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
