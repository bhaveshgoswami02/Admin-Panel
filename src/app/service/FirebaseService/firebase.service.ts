import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db:AngularFirestore, public storage: AngularFireStorage) { }

  OnAddCarousel(path,event){
    console.log(path,event)
    this.storage.upload(path,event).then(res=>{
      res.ref.getDownloadURL().then(res=>{
        console.log(res)
        console.log(path)
        let carouselDate = new Date()
        this.db.collection("carousel").add({date:carouselDate,carouselPath:path,carouselUrl:res}).then(res=>{
          console.log("Carousel Add Successful!")
          alert("Carousel Add Successful!")
        })
      })
    })
  }

  getCarousel(){
    return this.db.collection("carousel").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  deleteCarousel(id,path){
    this.db.collection("carousel").doc(id).delete().then(res=>{
      this.storage.ref(path).delete()
    })
  }
  
  addNews(coverImg,galleryImg,value){
    
  }
}
