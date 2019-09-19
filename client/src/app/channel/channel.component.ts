import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  groupList : any = []
  channelList : any = []
  channelName : any
  groupId : any

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

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
  }

  deleteChannel(_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/channel/delete', '_id='+_id, {
      headers: headers
    }).subscribe((data : any) => {
      window.location.reload(false)
    })
  }

  showModal() {
    $("#myModal").modal('show');
  }

  hideModal(){
    $("#myModal").modal('hide');
  }

  add_channel(){
    if (this.channelName == undefined || this.groupId == undefined){
      alert("User input was wrong, Please do it again!")
    }else{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      var data = "name=" + this.channelName + 
                "&group_id=" + this.groupId

      this.http.post('http://localhost:3000/api/v1/channel/create', data, {
        headers: headers
      }).subscribe((data : any) => {
        window.location.reload(false)
      })
    }

    $("#myModal").modal('hide')
  }

}
