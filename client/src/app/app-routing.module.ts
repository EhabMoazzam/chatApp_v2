import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ChatComponent } from './chat/chat.component'
import { SuperAdminComponent } from './super-admin/super-admin.component'
import { GroupAdminComponent } from './group-admin/group-admin.component'
import { GroupAssisComponent } from './group-assis/group-assis.component'
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component'
import { UsersComponent } from './users/users.component'

const routes: Routes = [
  {
    path : '',
    pathMatch : "full",
    redirectTo : "login"
  },
  { 
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'chat',
    component : ChatComponent
  },
  {
    path : 'super-admin',
    component : SuperAdminComponent
  },
  {
    path : 'group-admin',
    component : GroupAdminComponent
  },
  {
    path : 'group-assis',
    component : GroupAssisComponent
  },
  {
    path : 'group',
    component : GroupComponent
  },
  {
    path : 'channel',
    component : ChannelComponent
  },
  {
    path : 'users',
    component : UsersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
