import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../service/FirebaseService/firebase.service';
import { HeaderService } from '../service/headerService/header.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loader
  imgSrc: string = 'assets/images/click-image.jpg';
  selectedImage: any = null;
  imageUrl = []
  Previews = []
  CoverImage = {}
  GalleryImage = []
  GalleryEvent = []
  gallerypath: any
  news = []
  singleNewsData = null
  newsId
  form:boolean = false
  constructor(public service: FirebaseService, public _header: HeaderService) {
    this._header.loader.subscribe(res => {
      this.loader = res
    })
    this.service.getNews().subscribe(res => {
      console.log(res)
      this.news = res
    })

  }

  ngOnInit(): void {
  }

  coverImg(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/images/click-image.jpg';
      this.selectedImage = null;
    }
    // console.log(event.target.files[0])
    let now = new Date()
    let rand = now.toString()
    let path = "coverImage/1" + rand
    this.CoverImage = { CoverImgpath: path, CoverImgEvent: event.target.files[0] }
  }


  galleryImg(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          // console.log(event.target.result);
          this.Previews.push(event.target.result)
          // let now = new Date()
          // let rand = now.toString()
          // this.gallerypath = "gallery/1"+rand
        }

        reader.readAsDataURL(event.target.files[i]);
        this.GalleryEvent = event.target.files[i]
      }
    }


    // this.GalleryImage = [{path:this.gallerypath,event:event.target.files}]
  }

  OnNewsAdd(data: NgForm) {
    if (this.newsId) {
      this.service.updateNews(this.newsId,data.value)
      this.newsId = null
      this.singleNewsData = null
      this.form = false
    }
    else {
      let now = new Date()
      let rand = now.toString()
      let GalleryImgPath = "gallery/1" + data.value.galleryImage + rand
      console.log(this.CoverImage, GalleryImgPath, data.value, this.GalleryEvent)
      this.service.addNews(this.CoverImage, GalleryImgPath, data.value, this.GalleryEvent)
      data.resetForm();
      this.imgSrc = 'assets/images/click-image.jpg';
      // let index = 1;
      // this.Previews.splice(index,1)
      this.Previews = []
      this.form = false
    }
  }

  onDeleteNews(id, coverPath, galleryPath) {
    this.service.deleteNews(id, coverPath, galleryPath)
  }

  onEditNews(id) {
    this.newsId = id
    this.form = true
    this.service.getNewsById(id).subscribe(res => {
      this.singleNewsData = res
    })
  }

  showForm(){
    this.newsId = null
    this.singleNewsData = null
    this.form = !this.form
  }
}
