import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { HeaderModule } from './components/header/header.module'
import { FooterModule } from './components/footer/footer.module'
import { SideBarModule } from './components/side-bar/side-bar.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/public/login/login.component'
import { ForgotPasswordComponent } from './pages/public/forgot-password/forgot-password.component'
import { SignUpComponent } from './pages/public/sign-up/sign-up.component'
import { DashboardComponent } from './pages/private/dashboard/dashboard.component'
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component'
import { GlobalErrorHandler } from './guards/global-error-handler'
import { ToastrModule } from 'ngx-toastr'
import { NgxMaskModule, IConfig } from 'ngx-mask'
// import { RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";

import { MultiSelectModule } from 'primeng/multiselect'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { CalendarModule } from 'primeng/calendar';
import { ResetPasswordComponent } from './pages/public/reset-password/reset-password.component';
import { HttpCustomInterceptor } from './guards/http-custom-interceptor';
import { SignUpKeyCloakComponent } from './pages/public/sing-up-key-cloak/sign-up-key-cloak.component';
import { ValidateTokenComponent } from './pages/public/validate-token/validate-token.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

const cgModules = [
  HeaderModule,
  FooterModule,
  SideBarModule
]

const primeModules = [
  ProgressSpinnerModule,
  MultiSelectModule,
  DropdownModule,
  InputSwitchModule,
  ConfirmPopupModule,
  TableModule,
  CalendarModule
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    SignUpKeyCloakComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    ValidateTokenComponent,
    // RecaptchaModule,
    // RecaptchaFormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    ...cgModules,
    ...primeModules
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCustomInterceptor,
      multi: true
    },
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
