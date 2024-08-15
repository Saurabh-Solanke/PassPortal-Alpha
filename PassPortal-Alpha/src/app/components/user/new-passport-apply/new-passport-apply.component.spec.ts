import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassportApplyComponent } from './new-passport-apply.component';

describe('NewPassportApplyComponent', () => {
  let component: NewPassportApplyComponent;
  let fixture: ComponentFixture<NewPassportApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPassportApplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPassportApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
