import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import {GetRecipesService} from '../../get-recipes.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(private recipeService: GetRecipesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id + '';
          this.recipeService.getRecipe(this.id).subscribe(data => {
              console.log('data ' + data.createdDate);
              this.recipe = data;
              const x = this.recipe.shortDesc;
              console.log(x);
            },
            error => {
              console.log('Log the error here: ', error);
            }
          );
        }
      );
  }


  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  back() {
    this.router.navigate(['/recipes']);
  }
}
