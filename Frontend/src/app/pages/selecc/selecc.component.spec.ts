import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccComponent } from './selecc.component';

describe('SeleccComponent', () => {
  let component: SeleccComponent;
  let fixture: ComponentFixture<SeleccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
