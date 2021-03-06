import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { HeaderService } from '../headerService/header.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
coverPath
coverURL
galleryPath
galleryURL
  constructor(public db:AngularFirestore, public storage: AngularFireStorage,public loader:HeaderService) { }

  OnAddCarousel(path,event,data){
    console.log(path,event)
    this.storage.upload(path,event).then(res=>{
      res.ref.getDownloadURL().then(res=>{
        console.log(res)
        console.log(path)
        let carouselDate = new Date()
        this.db.collection("carousel").add({date:carouselDate,carouselPath:path,carouselUrl:res,...data}).then(res=>{
          console.log("Carousel Add Successful!")
          alert("Carousel Add Successful!")
        })
      })
    })
  }

  getCarousel(){
    return this.db.collection("carousel",ref=>ref.orderBy("sort","asc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  updateCarousel(id,data){
    return this.db.collection("carousel").doc(id).update(data).then(res=>{
      alert("Update Successful!")
    }).catch(err=>{
      alert(err)
    })
  }

  getSingleCarousel(id){
    return this.db.collection("carousel").doc(id).valueChanges()
  }

  deleteCarousel(id,path){
    this.db.collection("carousel").doc(id).delete().then(res=>{
      this.storage.ref(path).delete()
    })
  }
  
  addNews(coverImg,galleryImg,value,galleryEvent){
    this.loader.loader.next(true)
    this.storage.upload(coverImg.CoverImgpath,coverImg.CoverImgEvent).then(res=>{
      res.ref.getDownloadURL().then(res=>{
        this.coverPath = coverImg.CoverImgpath
        this.coverURL = res
        this.storage.upload(galleryImg,galleryEvent).then(res=>{
          res.ref.getDownloadURL().then(res=>{
            this.galleryPath = galleryImg
            this.galleryURL = res
            let data = {
              title:value.title,
              description:value.description,
              sort:value.sort,
              coverPath: this.coverPath,
              coverURL:this.coverURL,
              galleryPath: this.galleryPath,
              galleryURL: this.galleryURL
            }
            console.log(data)
            this.db.collection("news").add(data).then(res=>{
              console.log("news add successful!")
              this.loader.loader.next(false)
              alert("news save")
            }).catch(err=>{
              console.log(err)
            })
          
          })
        })

      })
    })
  }

  getNews(){
    return this.db.collection("news",ref=>ref.orderBy("sort","asc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getNewsById(id){
    return this.db.collection("news").doc(id).valueChanges()
  }

  updateNews(id,data){
    this.loader.loader.next(true)
    this.db.collection("news").doc(id).update(data).then(res=>{
      alert("Update Successfull!")
    }).catch(err=>{
      alert(err)
    }).finally(()=>{
    this.loader.loader.next(false)
    })
  }

  deleteNews(id,coverPath,galleryPath){
    this.db.collection("news").doc(id).delete().then(res=>{
      this.storage.ref(coverPath).delete()
      this.storage.ref(galleryPath).delete()
      console.log("News Deleted!")
    })
  }
}
