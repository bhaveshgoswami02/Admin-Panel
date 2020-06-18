import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../service/FirebaseService/firebase.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  imgSrc : string = 'assets/images/click-image.jpg';
  selectedImage:any = null;
  imageUrl=[]
  imagePath:any
  imageEvent:any
  constructor(public service:FirebaseService) { }

  ngOnInit(): void {
  }

  carouselImg(event){
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

  OnUpload(data:NgForm){
    console.log(this.imagePath,this.imageEvent)
    this.service.OnAddCarousel(this.imagePath,this.imageEvent)
    data.resetForm()
    this.imgSrc = 'assets/images/click-image.jpg';
  }
}
