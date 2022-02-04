import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderModule } from '../../../components/header/header.module';
import { FooterModule } from '../../../components/footer/footer.module';
import { SideBarModule } from '../../../components/side-bar/side-bar.module';

import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService } from 'primeng/api';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { PerfilPermissoesComponent } from './perfil-permissoes/perfil-permissoes.component';
import { PerfilPersonalizadoComponent } from './perfil-personalizado/perfil-personalizado.component';
import { PerfilPermissoesListComponent } from './perfil-permissoes-list/perfil-permissoes-list.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FolhaDePagamentoListComponent } from './folha-de-pagamento-list/folha-de-pagamento-list.component';
import { SolicitacaoDashboardComponent } from './solicitacao-dashboard/solicitacao-dashboard.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

const primeNGModules = [
  InputSwitchModule,
  TableModule,
  ToastModule,
  CalendarModule,
  SliderModule,
  ContextMenuModule,
  DialogModule,
  ButtonModule,
  DropdownModule,
  ProgressBarModule,
  InputTextModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
]

const cgModules = [
  HeaderModule,
  FooterModule,
  SideBarModule
]

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule,
    MultiSelectModule,
    NgxMaskModule.forRoot(maskConfig),
    ...cgModules,
    ...primeNGModules
  ],
  declarations: [
    AdminComponent,
    DashboardAdminComponent,
    PerfilPermissoesComponent,
    PerfilPersonalizadoComponent,
    PerfilPermissoesListComponent,
    MaintenanceComponent,
    FolhaDePagamentoListComponent,
    SolicitacaoDashboardComponent,
  ],
  providers: [
    ConfirmationService
  ]
})
export class AdminModule { }
