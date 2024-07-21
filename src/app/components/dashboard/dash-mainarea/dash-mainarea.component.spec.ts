import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMainareaComponent } from './dash-mainarea.component';

describe('DashMainareaComponent', () => {
  let component: DashMainareaComponent;
  let fixture: ComponentFixture<DashMainareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashMainareaComponent]
    });
    fixture = TestBed.createComponent(DashMainareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
