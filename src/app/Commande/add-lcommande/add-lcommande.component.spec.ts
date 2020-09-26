import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLcommandeComponent } from './add-lcommande.component';

describe('AddLcommandeComponent', () => {
  let component: AddLcommandeComponent;
  let fixture: ComponentFixture<AddLcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
