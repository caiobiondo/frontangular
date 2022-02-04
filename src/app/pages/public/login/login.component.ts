import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/global/auth.service'
import { SpinnerService } from 'src/app/services/global/spinner.service'
import { ToastService } from 'src/app/services/global/toast.service'
import { IToken } from 'src/app/interfaces/global/IToken'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = {} as FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private router: Router,
    private toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm()
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      keep_logged: true
    })
  }

  async signIn() {
    if (this.loginForm.valid) {
      this.spinnerService.title = 'Loggin in...'
      this.spinnerService.spinner = true

      let token: IToken = {} as IToken;
      this.auth.signIn({ username: this.loginForm.controls['username'].value, password: this.loginForm.controls['password'].value })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: async (token2: IToken) => {
            token = token2;
            if (!token) {
              return
            }
            const storageToken: boolean = await this.auth.storageToken(token, this.loginForm.controls['keep_logged'].value)

            if (storageToken) {
              this.spinnerService.spinner = false
              this.toasterService.severity = 'success'
              this.toasterService.detail = 'Autenticação feita com sucesso!'
              this.toasterService.toaster = true
              this.router.navigate(['admin'])
            }
          },
          closed: true
        });
    }
  }
}
