import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  is_show_alert = false

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.is_show_alert = false
  }

  onClickSubmit(data){
    var email = data.email
    var pass = data.password
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (pattern.test(email) && pass != null){
      this.is_show_alert = false

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post('http://127.0.0.1:3000/api/v1/auth', JSON.stringify(data), {
        headers: headers
      }).subscribe((data : any) => {
        console.log(data)
        
        if (data._id == undefined){
          this.is_show_alert = true
        }else{
          sessionStorage.setItem('_id', data._id)
          sessionStorage.setItem('username', data.name)
          sessionStorage.setItem('email', data.email)
          sessionStorage.setItem('role', data.role)
          sessionStorage.setItem('group_id', data.group_id)
          sessionStorage.setItem('channel_id', data.channel_id)
          sessionStorage.setItem('avator_url', data.avator_url)
          this._router.navigateByUrl("/dashboard")
        }
      })
    }else{
      this.is_show_alert = true
    }

  }

}
