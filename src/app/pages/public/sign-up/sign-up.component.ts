import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RestAuthService } from '../../../services/rest-auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]), //(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,} //('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
    password2: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(false, [Validators.requiredTrue]),
  });
  public eyePass: boolean = false;
  public eyeReapetPass: boolean = false;
  public isSend: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private restapiService: RestAuthService,
  ) { }

  ngOnInit() { }

  goBack() {
    this.router.navigateByUrl('/login');
  }

  toggleEyePass() {
    this.eyePass = !this.eyePass;
  }

  toggleEyeReapetPass() {
    this.eyeReapetPass = !this.eyeReapetPass;
  }

  confirmPassword() {
    if (this.signUpForm.controls['password'].value == this.signUpForm.controls['password2'].value) {
      this.signUpForm.patchValue({ confirmPassword: true });
    } else {
      this.signUpForm.patchValue({ confirmPassword: false });
    }

  }

  formSubmit(): void {
    if (this.signUpForm.valid) {
      this.restapiService.register(this.signUpForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (resp) => { this.isSend = true; },
          error: (err) => { console.log(err); }
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
