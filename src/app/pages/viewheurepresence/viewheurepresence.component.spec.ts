import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewheurepresenceComponent } from './viewheurepresence.component';

describe('ViewheurepresenceComponent', () => {
  let component: ViewheurepresenceComponent;
  let fixture: ComponentFixture<ViewheurepresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewheurepresenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewheurepresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
