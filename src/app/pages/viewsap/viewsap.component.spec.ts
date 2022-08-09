import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsapComponent } from './viewsap.component';

describe('ViewsapComponent', () => {
  let component: ViewsapComponent;
  let fixture: ComponentFixture<ViewsapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
