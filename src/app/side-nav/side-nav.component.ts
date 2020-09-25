import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
