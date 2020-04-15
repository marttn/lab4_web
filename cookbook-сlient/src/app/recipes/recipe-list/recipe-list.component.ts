import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Recipe} from '../recipe.model';
import {GetRecipesService} from '../../get-recipes.service';
import {Subscription} from 'rxjs';
import * as RecipeService from '../../../../../cookbook-server/app/entities/recipe/recipe.service.js';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  searchText;

  constructor(private recipeService: GetRecipesService) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.getAllRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    );
  }


  ngOnDestroy() {
    // this.subscription?.unsubscribe();
  }

  sort() {
    this.recipes.sort((a, b) => {
      return +new Date(b.createdDate) - +new Date(a.createdDate);
    });
  }
}
