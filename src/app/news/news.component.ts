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
  Previews=[]
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


  galleryImg(event){
    // if(e.target.files){
    //   for(let i=0; i<=File.length; i++){
    //     console.log(i)
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[i]);
    //     reader.onload=(events:any)=>{
    //       this.Previews.push(events.target.result)
    //     }
    //   }
    // }
      if (event.target.files && event.target.files[0]) {
  
          var filesAmount = event.target.files.length;
  
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
              // console.log(event.target.result);
                this.Previews.push(event.target.result)
            }
            reader.readAsDataURL(event.target.files[i]);
          }
      }
    }
}
