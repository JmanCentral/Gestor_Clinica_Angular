import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboardlayout } from './dashboardlayout';

describe('Dashboardlayout', () => {
  let component: Dashboardlayout;
  let fixture: ComponentFixture<Dashboardlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboardlayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboardlayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
