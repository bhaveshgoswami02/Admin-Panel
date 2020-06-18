import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  imgSrc : string = 'assets/images/click-image.jpg';
  selectedImage:any = null;
  imageUrl=[]
  Previews=[]
  CoverImage={}
  GalleryImage=[]
  GalleryEvent=[]
  constructor() { }

  ngOnInit(): void {
  }

  coverImg(event){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = 'assets/images/click-image.jpg';
      this.selectedImage = null;
    }
    // console.log(event.target.files[0])
    let now = new Date()
    let rand = now.toString()
    let path="carousel/1"+rand
    this.CoverImage = {CoverImgpath:path, CoverImgEvent:event.target.files[0]}
  }


  galleryImg(event){
      if (event.target.files && event.target.files[0]) {
  
          var filesAmount = event.target.files.length;
  
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
              // console.log(event.target.result);
              let now = new Date()
              let rand = now.toString()
              let path = "gallery/1"+rand
              this.GalleryImage = [{path:path,event:event.target.result}]
              this.Previews.push(event.target.result)
            }
            reader.readAsDataURL(event.target.files[i]);
           
          }
      }
    }

    OnNewsAdd(data:NgForm){
      console.log(this.Previews)
      console.log(this.CoverImage, this.GalleryImage, data.value)
    }
}
