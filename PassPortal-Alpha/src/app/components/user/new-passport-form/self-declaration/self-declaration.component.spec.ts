import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDeclarationComponent } from './self-declaration.component';

describe('SelfDeclarationComponent', () => {
  let component: SelfDeclarationComponent;
  let fixture: ComponentFixture<SelfDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfDeclarationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
