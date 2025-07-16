import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPaciente } from './agregar-paciente';

describe('AgregarPaciente', () => {
  let component: AgregarPaciente;
  let fixture: ComponentFixture<AgregarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
