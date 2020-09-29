import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recipe-web-application';
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private authService: AuthService, private navService: NavigationService){}

  ngOnInit(): void{
    this.authService.autoLogin();
    this.navService.openNav.subscribe(shouldOpen => {
      this.sidenav.open();
    });
  }

  close() {
    this.sidenav.close();
  }

  onLogout(): void{
    this.close();
    this.authService.logOut();
  }

}
