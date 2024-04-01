import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  
  set(data: any) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user_id', data.user_id)
    localStorage.setItem('role', data.role)
  }

  googleSetData(data: any) {
    localStorage.setItem('token', data.user.accessToken)
    localStorage.setItem('user_id',data.user.uid)
    localStorage.setItem('role', '0')
  }

  handle(data: any) {
    this.set(data)
  }

  handlGoogle(data:any) {
    this.googleSetData(data)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserId() {
    return localStorage.getItem('user_id')
  }

  getRole() {
    return localStorage.getItem('role')
  }


  remove() {
    localStorage.removeItem('user_id')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }

  decode(payload: any) {
    return JSON.parse(atob(payload))
  }

  payload(token: any) {
    const payload = token.split('.')[1]
    return this.decode(payload)
  }

  isValid() {

    const token   = this.getToken()
    const user_id = this.getUserId()

    if(token) {
      const payload = this.payload(token)
      if(payload) {
        return user_id == payload.user_id
      }
    }
    return false
  }

  getInfo() {
  
    const token = this.getToken()
    if(token) {
      const payload = this.payload(token)
      return payload ? payload : null;
    }
  }

  loggedIn() {
    return this.isValid()
  }


}
