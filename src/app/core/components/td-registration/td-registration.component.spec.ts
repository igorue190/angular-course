import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdRegistrationComponent } from './td-registration.component';

describe('TdRegistrationComponent', () => {
  let component: TdRegistrationComponent;
  let fixture: ComponentFixture<TdRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TdRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
