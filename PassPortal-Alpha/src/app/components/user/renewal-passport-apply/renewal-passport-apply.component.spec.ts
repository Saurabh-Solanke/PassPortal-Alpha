import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPassportApplyComponent } from './renewal-passport-apply.component';

describe('RenewalPassportApplyComponent', () => {
  let component: RenewalPassportApplyComponent;
  let fixture: ComponentFixture<RenewalPassportApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewalPassportApplyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewalPassportApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
