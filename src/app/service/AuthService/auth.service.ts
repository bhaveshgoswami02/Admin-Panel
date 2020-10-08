import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { HeaderService } from '../headerService/header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid=null
  allData=null
  constructor(public auth:AngularFireAuth,public router:Router, public db:AngularFirestore, public _header:HeaderService) { 
    this.auth.authState.subscribe(res=>{
      if(res){
        this.uid=res.uid
        localStorage.setItem("uid",res.uid)
        this._header.ShowUser.next(true)
      }
    })
  }

  OnSignUp(data){
    this.auth.createUserWithEmailAndPassword(data.userEmail,data.userPassword).then(res=>{
      let userid=res.user.uid
      localStorage.setItem("uid",this.uid)
      this.allData={userid,...data}
      this.db.collection("userData").add(this.allData)
      this.uid=res.user.uid
      alert("Signup successful")
      this.router.navigateByUrl("/admin")
    }).catch(err=>{
      alert(err)
    })
  }

  OnSignIn(data){
    this.auth.signInWithEmailAndPassword(data.userEmail,data.userPassword).then(res=>{
      this.uid=res.user.uid
      localStorage.setItem("uid",this.uid)
      this.router.navigateByUrl("/admin")
    }).catch(err=>{
      alert(err)
    })
  }

  isLoggedIn(){
      if(localStorage.getItem("uid")){
        this._header.ShowUser.next(true)
        return true
      }
      else
      {
        return false
      }
  }

  getUid(){
    return localStorage.getItem("uid")
  }

  logout(){
    this.router.navigateByUrl("/signin")
    this._header.ShowUser.next(false)
    this.auth.signOut()
    this.uid=null
    localStorage.removeItem("uid")
  }
}
