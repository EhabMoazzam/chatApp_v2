import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Modules
import { LayoutModule } from './layout/layout.module'
import { NavibarModule } from './navibar/navibar.module'

// Component
import { ChatComponent } from './chat/chat.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ChatComponent,
    SuperAdminComponent,
    GroupAdminComponent,
    GroupAssisComponent,
    GroupComponent,
    ChannelComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    NavibarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
