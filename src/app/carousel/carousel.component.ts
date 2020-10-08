import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../service/FirebaseService/firebase.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  imgSrc: string = 'assets/images/click-image.jpg';
  selectedImage: any = null;
  RecieveCarousel = []
  imagePath: any
  imageEvent: any
  singleCarousel
  carouselId
  form:boolean = false
  constructor(public service: FirebaseService) { }

  ngOnInit(): void {
    this.service.getCarousel().subscribe(res => {
      this.RecieveCarousel = res
      console.log(this.RecieveCarousel)
    })
  }

  carouselImg(event) {
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
    let path = "carousel/1" + rand
    this.imagePath = path
    this.imageEvent = event.target.files[0]
  }

  OnUpload(data: NgForm) {
    if (this.carouselId) {
      this.service.updateCarousel(this.carouselId,data.value)
      data.resetForm()
      this.form = false
      this.carouselId = null
    }
    else {
      console.log(this.imagePath, this.imageEvent)
      this.service.OnAddCarousel(this.imagePath, this.imageEvent, data.value)
      data.resetForm()
      this.imgSrc = 'assets/images/click-image.jpg';
      this.form = false
      this.carouselId = null
    }
  }

  onDelete(id, path) {
    console.log(id, path)
    this.service.deleteCarousel(id, path)
  }

  onEdit(id) {
    this.form = true
    this.carouselId = id
    this.service.getSingleCarousel(id).subscribe(res => {
      this.singleCarousel = res
      console.log("Single Carousel data", this.singleCarousel)
    })
  }

  showForm(){
    this.singleCarousel = null
    this.form = !this.form
  }
}
