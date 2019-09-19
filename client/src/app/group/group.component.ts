import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupList : any = []
  groupName : any
  groupType : any
  groupId : any

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/group/get_all', {}, {
      headers: headers
    }).subscribe((data : any) => {
      this.groupList = data
    })
  }

  showModal() {
    $("#myModal").modal('show');
  }

  hideModal(){
    $("#myModal").modal('hide');
  }

  deleteGroup(_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://localhost:3000/api/v1/group/delete', '_id='+_id, {
      headers: headers
    }).subscribe((data : any) => {
      window.location.reload(false)
    })
  }

  add_group(){
    if (this.groupName == undefined || this.groupType == undefined){
      alert("User input was wrong, Please do it again!")
    }else{
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      var data = "name=" + this.groupName + 
                "&type=" + this.groupType +
                "&parent=" + this.groupId

      this.http.post('http://localhost:3000/api/v1/group/create', data, {
        headers: headers
      }).subscribe((data : any) => {
        window.location.reload(false)
      })
    }

    $("#myModal").modal('hide')
  }

}
