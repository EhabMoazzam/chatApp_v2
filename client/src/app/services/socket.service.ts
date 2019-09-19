import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client'
const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket

  constructor() { }

  public initSocket() : void {
    this.socket = io(SERVER_URL)
  }

  public send(message : any) : void{
    this.socket.emit('message', message)
  }

  public onMessage() : Observable<any> {
    let observable = new Observable(observable => {
      this.socket.on('message', (data : any) => observable.next(data))
    })
    return observable
  }

}
