import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDepartComponent } from './gestion-depart.component';

describe('GestionDepartComponent', () => {
  let component: GestionDepartComponent;
  let fixture: ComponentFixture<GestionDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
