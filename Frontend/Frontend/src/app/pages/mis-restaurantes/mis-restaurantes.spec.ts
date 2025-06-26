import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRestaurantes } from './mis-restaurantes';

describe('MisRestaurantes', () => {
  let component: MisRestaurantes;
  let fixture: ComponentFixture<MisRestaurantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisRestaurantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisRestaurantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
