import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLfactureComponent } from './liste-lfacture.component';

describe('ListeLfactureComponent', () => {
  let component: ListeLfactureComponent;
  let fixture: ComponentFixture<ListeLfactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLfactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
