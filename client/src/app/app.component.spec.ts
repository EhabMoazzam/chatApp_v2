import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Pipe
import { MomentPipe } from './app.module'

// Component
import { ChatComponent } from './chat/chat.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';
import { UsersComponent } from './users/users.component';
import { NavibarComponent } from './navibar/navibar.component';
import { LayoutComponent } from './layout/layout.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, FormsModule, HttpClientModule
      ],
      declarations: [
        ChatComponent, SuperAdminComponent, GroupAdminComponent, 
        GroupAssisComponent, GroupComponent, ChannelComponent, 
        UsersComponent, MomentPipe, NavibarComponent, LayoutComponent, 
         AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'chartApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('chartApp');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to chartApp!');
  });
});
