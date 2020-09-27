import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '../../app/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(private router: Router, private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onRecipeRoute(): void{
    this.router.navigate(['/recipes']);
  }

  onShoppingListRoute(): void{
    this.router.navigate(['/shopping-list']);
  }

  onAuthRoute(): void{
    this.router.navigate(['/auth']);
  }

  onSaveRecipes(): void{
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(): void{
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void{
    this.authService.logOut();
  }

}
