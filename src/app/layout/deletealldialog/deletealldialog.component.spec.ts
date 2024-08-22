import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletealldialogComponent } from './deletealldialog.component';

describe('DeletealldialogComponent', () => {
  let component: DeletealldialogComponent;
  let fixture: ComponentFixture<DeletealldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletealldialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletealldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
