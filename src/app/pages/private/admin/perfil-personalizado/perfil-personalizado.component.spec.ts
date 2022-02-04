import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPersonalizadoComponent } from './perfil-personalizado.component';

describe('PerfilPersonalizadoComponent', () => {
  let component: PerfilPersonalizadoComponent;
  let fixture: ComponentFixture<PerfilPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPersonalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
