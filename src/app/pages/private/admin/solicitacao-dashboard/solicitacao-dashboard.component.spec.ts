import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoDashboardComponent } from './solicitacao-dashboard.component';

describe('SolicitacaoDashboardComponent', () => {
  let component: SolicitacaoDashboardComponent;
  let fixture: ComponentFixture<SolicitacaoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
