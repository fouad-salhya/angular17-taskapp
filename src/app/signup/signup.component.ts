import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgClass],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private authService = inject(AuthService)
  private router      = inject(Router)

  signupForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  signupUser() {

      this.authService.signup(this.signupForm.value)
                      .subscribe({ 
                        next: res => {
                           if(res.error) {
                            Swal.fire({
                              position: "center-end",
                              icon: "warning",
                              title: `${res.error}`,
                              showConfirmButton: false,
                              timer: 2000,
                              heightAuto: false,
                              width: 370,
                              
                            });
                           }
                           else {
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: `${res.message}`,
                              showConfirmButton: false,
                              timer: 1500
                            });
                           }

                           this.router.navigate(['/signin'])
                        },
                        error: err => {
                          console.log(err)
                          Swal.fire({
                            position: "center-end",
                            icon: "error",
                            title: `${err}`,
                            showConfirmButton: false,
                            timer: 1000
                          });
                        }
                      })
                      
                    
  }

}
