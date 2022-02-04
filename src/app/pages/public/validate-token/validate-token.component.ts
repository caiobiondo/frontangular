import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidateToken } from 'src/app/interfaces/auth';
import { RestAuthService } from 'src/app/services/rest-auth.service';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.css']
})
export class ValidateTokenComponent implements OnInit, OnDestroy {

  private token: string | null = '';
  private uid: string | null = '';
  public isValidToken: boolean = false;
  public isLoading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restAuthService: RestAuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('uid');
      this.uid = params.get('token');
      if (this.token && this.uid) {
        this.checkToken();
      } else {
        this.isLoading = false
      }
    });
  }

  async checkToken() {
    const obj: ValidateToken = {
      uid: '' + this.uid,
      token: '' + this.token,
    };

    (this.restAuthService.validateToken(obj))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => { this.isLoading = false; this.isValidToken = true; },
        complete: () => { this.isLoading = false; },
        closed: true
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
