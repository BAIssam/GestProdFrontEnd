import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLcommandeComponent } from './liste-lcommande.component';

describe('ListeLcommandeComponent', () => {
  let component: ListeLcommandeComponent;
  let fixture: ComponentFixture<ListeLcommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLcommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
