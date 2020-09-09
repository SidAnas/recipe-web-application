import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('name') ingName: ElementRef;
  @ViewChild('amount') ingAmount: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(): void{
    const name = this.ingName.nativeElement.value;
    const amount = this.ingAmount.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.slService.addIngredient(ingredient);
    this.ingName.nativeElement.value = '';
    this.ingAmount.nativeElement.value = '';
  }

}
