import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcompComponent } from './viewcomp.component';

describe('ViewcompComponent', () => {
  let component: ViewcompComponent;
  let fixture: ComponentFixture<ViewcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
