import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  editingStarted = new Subject<number>();

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

  getIngredient(index: number): Ingredient{
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngridents(ingredient: Ingredient[]): void{
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient): void{
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void{
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
