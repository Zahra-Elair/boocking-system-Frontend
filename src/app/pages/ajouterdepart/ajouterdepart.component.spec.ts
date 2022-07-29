import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterdepartComponent } from './ajouterdepart.component';

describe('AjouterdepartComponent', () => {
  let component: AjouterdepartComponent;
  let fixture: ComponentFixture<AjouterdepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterdepartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterdepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
