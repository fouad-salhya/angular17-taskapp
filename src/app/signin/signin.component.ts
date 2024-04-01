import { NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgClass],
  providers: [AuthService, TokenService, AccountService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  currentUser: any ;
  private authService    = inject(AuthService)
  private tokenService   = inject(TokenService)
  private accountService = inject(AccountService)
  private router         = inject(Router)

  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  signinUser() {

    this.authService.signin(this.signinForm.value)
                    .subscribe({
                      next: res => {
                        if(res.error) {
                          
                        }
                        this.handlResponse(res)
                        

                      },
                      error: (err) => console.log(err)
                    })
  }

  handlResponse(res: any) {
    this.tokenService.handle(res)
    this.accountService.changeStatus(true)
    return this.router.navigate(['/'])
  }

  logout() {
    this.tokenService.remove()
    this.accountService.changeStatus(false)
    this.router.navigate(['/signin'])
  }

  loginGoogle() {
    this.authService.loginWithGoogle()
        .then((res) => {
          console.log(res)
          this.tokenService.handlGoogle(res)
          this.router.navigate(['/'])
        }).catch((err) => console.log(err))
  }

}
