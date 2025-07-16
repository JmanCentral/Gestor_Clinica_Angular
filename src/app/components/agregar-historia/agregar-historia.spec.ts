import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHistoria } from './agregar-historia';

describe('AgregarHistoria', () => {
  let component: AgregarHistoria;
  let fixture: ComponentFixture<AgregarHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHistoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
