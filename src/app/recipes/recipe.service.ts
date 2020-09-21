import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe('Milk Shake', 'Two glasses of Milk Shake', 'https://wallpapercave.com/wp/wp2000261.jpg', [
    //   new Ingredient('Milk', 1),
    //   new Ingredient('Chocolate', 5)
    // ]),
    // new Recipe('Pasta', 'A bowl of Pasta with salad', 'https://wallpapercave.com/wp/wp3138446.jpg', [
    //   new Ingredient('Pasta', 6),
    //   new Ingredient('Onion', 2)
    // ]),
    // new Recipe('Lunch', 'A Lunch with Ice-Cream', 'https://wallpapercave.com/wp/wp3138449.jpg', [
    //   new Ingredient('French Fries', 50),
    //   new Ingredient('Ice-Cream', 2)
    // ]),
    // new Recipe('Juice', 'Juice with some Fruits', 'https://wallpapercave.com/wp/wp4485471.jpg', [
    //   new Ingredient('Orange', 6),
    //   new Ingredient('Lichi', 1)
    // ]),
  ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]): void{
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]): void{
    this.slService.addIngridents(ingredient);
  }

  updateRecipe(index: number, newRecipe: Recipe): void{
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe): void{
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void{
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
