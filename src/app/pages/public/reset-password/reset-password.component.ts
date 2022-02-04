import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResetPassword } from 'src/app/interfaces/auth';
import { RestAuthService } from 'src/app/services/rest-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private token: string | null = '';
  private uid: string | null = '';
  public validHash: boolean = true;
  public hideForm: boolean = false;
  public eyePass: boolean = false;
  public eyeReapetPass: boolean = false;
  public forgotPasswordHashForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(false, [Validators.requiredTrue]),
  });
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAuthService: RestAuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uid = params.get('uid');
      this.token = params.get('token');
    });
  }

  async confirmResetPassword() {

    const obj: ResetPassword = {
      uid: '' + this.uid,
      token: '' + this.token,
      new_password1: this.forgotPasswordHashForm.controls['password'].value,
      new_password2: this.forgotPasswordHashForm.controls['repeatPassword'].value,
    };

    (this.restAuthService.confirmResetPassword(obj))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => { this.validHash = true; this.hideForm = true; },
        error: () => { this.validHash = false; this.hideForm = true; },
        complete: () => { setTimeout(() => { this.goBack() }, 2000) },
        closed: true,
      });
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

  toggleEyePass() {
    this.eyePass = !this.eyePass;
  }

  toggleEyeReapetPass() {
    this.eyeReapetPass = !this.eyeReapetPass;
  }

  verifyPass() {
    if (this.forgotPasswordHashForm.controls['password'].value != '' && this.forgotPasswordHashForm.controls['repeatPassword'].value != '') {
      if (this.forgotPasswordHashForm.controls['password'].value == this.forgotPasswordHashForm.controls['repeatPassword'].value) {
        this.forgotPasswordHashForm.patchValue({ confirmPassword: true });
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
