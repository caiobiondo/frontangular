import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPermissoesComponent } from './perfil-permissoes.component';

describe('PerfilPermissoesComponent', () => {
  let component: PerfilPermissoesComponent;
  let fixture: ComponentFixture<PerfilPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPermissoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
