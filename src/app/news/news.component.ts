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
  imagePath:any
  imageEvent:any
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
    this.imagePath = path
    this.imageEvent = event.target.files[0]
  }

}
