import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../../app/recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-web-app-1f905.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((recipesResponse) => {
        console.log(recipesResponse);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-web-app-1f905.firebaseio.com/recipes.json'
      )
      .pipe(
        map((responseRecipe) => {
          return responseRecipe.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.recipeService.setRecipes(recipe);
        })
      );
  }
  // .subscribe( recipes => {
  //   console.log(recipes);
  //   this.recipeService.setRecipes(recipes);
  // }
  // );
}
