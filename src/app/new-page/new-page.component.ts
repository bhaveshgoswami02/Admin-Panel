import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/FirebaseService/firebase.service';
import { NgForm } from '@angular/forms';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  imgSrc: string = 'assets/images/click-image.jpg';
  selectedImage: any = null;
  allPages = []
  imagePath: any
  imageEvent: any
  singlePage
  pageId
  form:boolean = false
  constructor(public pageService:PageService) { }

  ngOnInit(): void {
    this.pageService.getSnapshotChanges().subscribe(res=>{
      this.allPages = res
    })
  }

  pageImg(event) {
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
    this.imageEvent = event.target.files[0]
  }

  OnSubmit(data: NgForm) {
    if (this.pageId) {
      this.pageService.update(this.pageId,data.value)
      data.resetForm()
      this.form = false
      this.pageId = null
    }
    else {
      console.log(this.imagePath, this.imageEvent)
      this.pageService.add(data.value,this.imageEvent)
      data.resetForm()
      this.form = false
      this.imgSrc = 'assets/images/click-image.jpg';
      this.pageId = ""
    }
  }

  onDelete(id, path) {
    console.log(id, path)
    this.pageService.delete(id, path)
  }

  onEdit(id) {
    this.form = true
    this.pageId = id
    this.pageService.getValueChangesById(id).subscribe(res => {
      this.singlePage = res
      console.log("Single Page data", this.singlePage)
    })
  }

  showForm(){
    this.singlePage = null
    this.form = !this.form
  }
}
