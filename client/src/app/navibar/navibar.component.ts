import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  userData : any

  constructor() { }

  ngOnInit() {
    this.userData = {
      "_id": sessionStorage.getItem('_id'),
      "username": sessionStorage.getItem('username'),
      "email": sessionStorage.getItem('email'),
      "role": parseInt(sessionStorage.getItem('role')),
      "group_id": sessionStorage.getItem('group_id'),
      "channel_id": sessionStorage.getItem('channel_id'),
      'avator_url' : sessionStorage.getItem('avator_url')
    }      
  }

}
