import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserSignup } from '../models/user-signup';
import { UserSignin } from '../models/user-signin';
import { Observable, map } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)
  private auth_url = "http://localhost:7000/api/auth"
  auth = inject(Auth)
  firestore = inject(Firestore)


  public signup(user: UserSignup | any): Observable<any>{
     return this.http.post<any>(`${this.auth_url}/signup`, user)
                
                
  }

  public signin(user: UserSignin | any): Observable<any>{
     return this.http.post<any>(`${this.auth_url}/signin`, user)
  }

  public loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new GoogleAuthProvider()
    
       signInWithPopup(this.auth, provider)
          .then((data) => resolve(data), (err) => reject(err))
     })
  }

  public loginWithFacebook() {
     
    const provider = new FacebookAuthProvider();
    
  }



  
}
