import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userData : any
  userName : any
  userEmail : any
  userPassword : any
  groupId : any
  channelId : any
  userList : any = []
  groupList : any = []
  channelList : any = []
  selectedChannelList : any = []

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

  add_user(){
    if (this.userName == undefined || this.userEmail == undefined || this.userPassword == undefined ||
        this.groupId == undefined || this.channelId == undefined){
        
        alert("User input was wrong, Please do it again!")

    }else{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      var data = "name=" + this.userName + 
                "&email=" + this.userEmail +
                "&password=" + this.userPassword +
                "&role=4" +
                "&group_id=" + this.groupId +
                "&channel_id=" + this.channelId

      this.http.post('http://localhost:3000/api/v1/user/add', data, {
        headers: headers
      }).subscribe((data : any) => {
        this.userList = data
        window.location.reload(false)
      })
    }

    $("#myModal").modal('hide')
  }

  // Modal functions
  
  hideModal(){
    $("#myModal").modal('hide');
  }

  // End of Modal functions

  deleteUser(_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/user/delete', '_id='+_id, {
      headers: headers
    }).subscribe((data : any) => {
      this.userList = data
      window.location.reload(false)
    })
  }

  onGroupSelect(group_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/channel/get_groups_by_id', 'group_id='+group_id, {
        headers: headers
      }).subscribe((data : any) => {
        this.selectedChannelList = data
      })
  }

}
