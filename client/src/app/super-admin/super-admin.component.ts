import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  userData : any
  userName : any
  userEmail : any
  userPassword : any
  userList : any = []
  groupList : any = []
  channelList : any = []

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/user/get_all', {}, {
      headers: headers
    }).subscribe((data : any) => {
      this.userList = data
    })

    this.http.post('http://localhost:3000/api/v1/group/get_all', {}, {
      headers: headers
    }).subscribe((data : any) => {
      this.groupList = data
    })

    this.http.post('http://localhost:3000/api/v1/channel/get_all', {}, {
      headers: headers
    }).subscribe((data : any) => {
      this.channelList = data
    })

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

  showModal() {
    $("#myModal").modal('show');
  }

  hideModal(){
    $("#myModal").modal('hide');
  }

  deleteUser(_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/user/delete', '_id='+_id, {
      headers: headers
    }).subscribe((data : any) => {
      this.userList = data
      window.location.reload(false)
    })
  }

  add_user(){
    if (this.userName == undefined || this.userEmail == undefined || this.userPassword == undefined){
        alert("User input was wrong, Please do it again!")
    }else{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      var data = "name=" + this.userName + 
                "&email=" + this.userEmail +
                "&password=" + this.userPassword +
                "&role=1" +
                "&group_id=5d82ad71a4d165378c7681de" +
                "&channel_id=5d82b35c32621644b8034f07"

      this.http.post('http://localhost:3000/api/v1/user/add', data, {
        headers: headers
      }).subscribe((data : any) => {
        this.userList = data
        window.location.reload(false)
      })
    }

    $("#myModal").modal('hide')
  }



}
