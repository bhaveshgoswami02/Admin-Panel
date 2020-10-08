import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  collection = "page"
  constructor(public db:AngularFirestore,public common:CommonService,public storage:StorageService) { }

  add(data,imageFile){
    this.common.showLoader()
    let timestamp = firebase.firestore.Timestamp.now()
    let allData = {timestamp,...data}
    console.log("page All Data",allData)
    this.db.collection(this.collection).add(allData).then(res=>{
      alert("Page Add Successful!")
      let id = res.id
      if(imageFile){
        console.log("if imageFile")
        let date = new Date()
        let path = "/page/" + date.toString()
        this.storage.upload(path,imageFile).then(url=>{
          let allData = {
            imgUrl: url,
            imgPath: path
          }
          this.update(id,allData)
        })
      }
    }).catch(err=>{
      alert(err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  get(){
    return this.db.collection(this.collection,ref=>ref.orderBy("sort","asc")).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getById(id){
    return this.db.collection(this.collection,ref=>ref.orderBy("sort","asc")).doc(id).get().pipe(
      map(actions => {
        const data = actions.data() as any;
        const id = actions.id;
        return { id, ...data };
      })
    )
  }

  getValueChanges(){
    return this.db.collection(this.collection,ref=>ref.orderBy("sort","asc")).valueChanges()
  }

  getValueChangesById(id){
    return this.db.collection(this.collection,ref=>ref.orderBy("sort","asc")).doc(id).valueChanges()
  }
  
  getSnapshotChanges(){
    return this.db.collection(this.collection,ref=>ref.orderBy("sort","asc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  update(id,data){
    this.common.showLoader()
    this.db.collection(this.collection).doc(id).update(data).then(res=>{
      alert("Updated Successful!")
    }).catch(err=>{
      alert(err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  set(id,data){
    this.common.showLoader()
    this.db.collection(this.collection).doc(id).set(data).then(res=>{
      alert("Updated Successful!")
    }).catch(err=>{
      alert(err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  delete(id,path){
    this.common.showLoader()
    this.storage.deleteImage(path).then(res=>{
      this.db.collection(this.collection).doc(id).delete().then(res=>{
        alert("Deleted Successful!")
      }).catch(err=>{
        alert(err)
      }).finally(()=>{
        this.common.stopLoader()
      })
    })
  }

}
