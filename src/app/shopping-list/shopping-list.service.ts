import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Mango', 50),
    new Ingredient('Grapes', 25),
    new Ingredient('Banana', 30)
  ];

  constructor() { }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngridents(ingredient: Ingredient[]): void{
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }
}
