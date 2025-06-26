import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMenu } from './editar-menu';

describe('EditarMenu', () => {
  let component: EditarMenu;
  let fixture: ComponentFixture<EditarMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
