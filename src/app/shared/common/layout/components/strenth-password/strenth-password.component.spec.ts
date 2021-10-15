import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrenthPasswordComponent } from './strenth-password.component';

describe('StrenthPasswordComponent', () => {
  let component: StrenthPasswordComponent;
  let fixture: ComponentFixture<StrenthPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrenthPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrenthPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
