import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistoria } from './listar-historia';

describe('ListarHistoria', () => {
  let component: ListarHistoria;
  let fixture: ComponentFixture<ListarHistoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarHistoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarHistoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
