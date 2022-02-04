import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/global/auth.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  SignOut(): void {
    this.auth.signOut()
    this.router.navigate(['login'])
    this.toastr.info('Até logo... 😢', undefined, { enableHtml: true })
  }
}
