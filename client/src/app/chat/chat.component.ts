import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../services/socket.service';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})

export class ChatComponent implements OnInit {

  userData              : any
  selected_channel_id   : any
  message               : any
  ioConnection          : any
  userList              : any = []
  groupList             : any = []
  channelList           : any = []
  chatList              : any = []
  chatByIDList          : any = []
  
  constructor(private _router: Router, private http: HttpClient, private socketService : SocketService) { }

  ngOnInit() {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    this.initIOConnection()

    this.http.post('http://localhost:3000/api/v1/user/get_all', {}, {
      headers: headers
    }).subscribe((data : any) => {     
      this.userList = data      
    })

    this.http.post('http://localhost:3000/api/v1/group/get_all', {}, {
      headers: headers
    }).subscribe(async (data : any) => {
      var channel_IDs = []
      this.groupList = data

      if (parseInt(sessionStorage.getItem('role')) == 1){
        for (var i = 0; i < data.length ; i++){
          var channel = await this.getChannelByGroupID(data[i]._id)

          if (channel != null) channel_IDs.push(channel)
        }

        if (channel_IDs.length > 0){
          this.selected_channel_id = channel_IDs[0]._id
          this.chatByIDList = channel_IDs

          this.http.post('http://localhost:3000/api/v1/chat/history', "_id=" + this.selected_channel_id, {
            headers: headers
          }).subscribe(async (data : any) => {
            for (var i =0; i < data.length ; i++){
              var chat_item = data[i]

              if (chat_item.from_id !== sessionStorage.getItem('_id')){
                var result : any = await this.getUserImageInfoByID(chat_item.from_id) 
                chat_item.avator_url = result.avator_url
                chat_item.name = result.name

                data[i] = chat_item
              }
            }
            this.chatList = data

            this.makeScrollDown() // Scroll Down in ChatBox
            console.log("Chat List => ", this.chatList)
          })
        }
        // console.log(channel_IDs)
      }else{
        this.http.post('http://localhost:3000/api/v1/group/get', "_id="+sessionStorage.getItem('group_id'), {
          headers: headers
        }).subscribe(async (data : any) => {
          console.log("Group Data => ", data)

          var channel = await this.getChannelByGroupID(data._id)
          if (channel != null) channel_IDs.push(channel)

          if (channel_IDs.length > 0){
            this.selected_channel_id = channel_IDs[0]._id
            this.chatByIDList = channel_IDs

            this.http.post('http://localhost:3000/api/v1/chat/history', "_id=" + this.selected_channel_id, {
              headers: headers
            }).subscribe(async (data : any) => {
              for (var i =0; i < data.length ; i++){
                var chat_item = data[i]
  
                if (chat_item.from_id !== sessionStorage.getItem('_id')){
                  var result : any = await this.getUserImageInfoByID(chat_item.from_id) 
                  chat_item.avator_url = result.avator_url
                  chat_item.name = result.name
  
                  data[i] = chat_item
                }
              }
              this.chatList = data
              
              this.makeScrollDown() // Scroll Down in ChatBox
              console.log("Chat List => ", this.chatList)
            })
          }
        })
      }

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

  async getChannelByGroupID(group_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const data = await this.http.post('http://localhost:3000/api/v1/channel/get_groups_by_id', '_id=' + group_id, {
      headers: headers
    }).toPromise()

    return data
  }

  async getUserImageInfoByID(user_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const data = await this.http.post('http://localhost:3000/api/v1/user/get', '_id=' + user_id, {
      headers: headers
    }).toPromise()

    return data
  }

  onClickChannel(channel_id){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.selected_channel_id = channel_id

    this.http.post('http://localhost:3000/api/v1/chat/history', "_id=" + this.selected_channel_id, {
      headers: headers
    }).subscribe(async (data : any) => {
      for (var i =0; i < data.length ; i++){
        var chat_item = data[i]

        if (chat_item.from_id !== sessionStorage.getItem('_id')){
          var result : any = await this.getUserImageInfoByID(chat_item.from_id) 
          chat_item.avator_url = result.avator_url
          chat_item.name = result.name

          data[i] = chat_item
        }
      }
      this.chatList = data

      this.makeScrollDown() // Scroll Down in ChatBox
    })
  }

  onSendMessage(){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    var data = "from_id=" + this.userData._id + "&to_id=" + this.selected_channel_id + "&msg=" + this.message 

    this.socketService.send({
      from_id : this.userData._id,
      to_id : this.selected_channel_id,
      msg : this.message
    })  // Send message into socket server

    setTimeout(function(){ 
      this.http.post('http://localhost:3000/api/v1/chat/history', "_id=" + this.selected_channel_id, {
        headers: headers
      }).subscribe(async(data : any) => {
        for (var i =0; i < data.length ; i++){
          var chat_item = data[i]

          if (chat_item.from_id !== sessionStorage.getItem('_id')){
            var result : any = await this.getUserImageInfoByID(chat_item.from_id) 
            chat_item.avator_url = result.avator_url
            chat_item.name = result.name

            data[i] = chat_item
          }
        }
        this.chatList = data

        this.makeScrollDown() // Scroll Down in ChatBox
        console.log("Chat List => ", this.chatList)
      })
    }, 200); 

    this.message = ""
  }

  initIOConnection(){
    this.socketService.initSocket()
    this.ioConnection = this.socketService.onMessage().subscribe(async(data : any) => {
      var ggTeam = JSON.parse(data)
      var result : any = await this.getUserImageInfoByID(ggTeam.from_id) 
      ggTeam.avator_url = result.avator_url
      ggTeam.name = result.name
      console.log("Recive Data => ", ggTeam)
      this.chatList.push(ggTeam)
      this.makeScrollDown() // Scroll Down in ChatBox
    })
  }

  makeScrollDown(){
    setTimeout(function(){ 
      // $('.card-body').scrollTop($('.card-body')[0].scrollHeight+150);
      $(".card-body").animate({ scrollTop: $('.card-body').height() * 2}, 1000);
    }, 200);
  }

}
