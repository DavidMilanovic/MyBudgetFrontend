import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactiondialogComponent } from './transactiondialog.component';

describe('TransactiondialogComponent', () => {
  let component: TransactiondialogComponent;
  let fixture: ComponentFixture<TransactiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactiondialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
