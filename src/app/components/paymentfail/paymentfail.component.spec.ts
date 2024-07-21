import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentfailComponent } from './paymentfail.component';

describe('PaymentfailComponent', () => {
  let component: PaymentfailComponent;
  let fixture: ComponentFixture<PaymentfailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentfailComponent]
    });
    fixture = TestBed.createComponent(PaymentfailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
