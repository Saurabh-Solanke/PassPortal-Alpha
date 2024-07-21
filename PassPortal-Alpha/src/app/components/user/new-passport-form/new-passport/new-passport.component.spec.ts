import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassportComponent } from './new-passport.component';

describe('NewPassportComponent', () => {
  let component: NewPassportComponent;
  let fixture: ComponentFixture<NewPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
