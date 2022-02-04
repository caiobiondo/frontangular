import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolhaDePagamentoListComponent } from './folha-de-pagamento-list.component';

describe('FolhaDePagamentoListComponent', () => {
  let component: FolhaDePagamentoListComponent;
  let fixture: ComponentFixture<FolhaDePagamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolhaDePagamentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolhaDePagamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
