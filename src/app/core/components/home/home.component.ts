import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data:any = []


  constructor(private homeService: HomeService) { }

  ngOnInit(): void {   
    this.homeService.getData().subscribe((result)=>{
      this.data = result
    })
  }
}
