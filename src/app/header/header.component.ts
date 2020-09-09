import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRecipeRoute(): void{
    this.router.navigate(['/recipes']);
  }

  onShoppingListRoute(): void{
    this.router.navigate(['/shopping-list']);
  }

}
