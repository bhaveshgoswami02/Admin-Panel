import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db:AngularFirestore, public storage: AngularFireStorage) { }

  OnAddCarousel(path,event){
    console.log(path,event)
    this.storage.upload(path,event).then(res=>{
      console.log("i m working")
      res.ref.getDownloadURL().then(res=>{
        console.log(res)
        console.log(path)
        let carouselDate = new Date()
        this.db.collection("carousel").add({date:carouselDate,carouselPath:path,carouselUrl:res}).then(res=>{
          alert("Carousel Add Successful!")
        })
      })
    })
  }

  
}
