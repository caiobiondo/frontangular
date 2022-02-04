import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPermissoesListComponent } from './perfil-permissoes-list.component';

describe('PerfilPermissoesListComponent', () => {
  let component: PerfilPermissoesListComponent;
  let fixture: ComponentFixture<PerfilPermissoesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilPermissoesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPermissoesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
