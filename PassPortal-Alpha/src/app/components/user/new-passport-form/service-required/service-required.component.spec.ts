import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequiredComponent } from './service-required.component';

describe('ServiceRequiredComponent', () => {
  let component: ServiceRequiredComponent;
  let fixture: ComponentFixture<ServiceRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequiredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
