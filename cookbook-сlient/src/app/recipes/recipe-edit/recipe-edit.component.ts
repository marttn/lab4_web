import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {GetRecipesService} from '../../get-recipes.service';
import {Recipe} from '../recipe.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private recipeService: GetRecipesService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription.add(this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id + '';
          this.editMode = params.id != null;
          this.initForm();
        }
      ));
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.router.navigate([`recipes/${this.id}`]);
    } else {
      const res = this.recipeForm.value;
      res.createdDate = new Date();
      res.id = Math.floor(Math.random() * (10000 - 10 + 1) + 10) + '';
      this.recipeService.createRecipe(res);
      this.router.navigate([`recipes/${res.id}`]);
    }
  }


  onCancel() {
    this.router.navigate(['recipes']);
  }


  private initForm() {
    let id = ``;
    let name = ``;
    let category = ``;
    let shortDesc = ``;
    let longDesc = ``;
    let createdDate = new Date();

    if (this.editMode) {
      this.subscription.add(this.recipeService.getRecipe(this.id)
        .subscribe(res => {
          this.recipe = res;
          const x = this.recipe.name;
          console.log(x);
          id = this.recipe.id;
          name = this.recipe.name;
          category = this.recipe.category;
          shortDesc = this.recipe.shortDesc;
          longDesc = this.recipe.longDesc;
          createdDate = this.recipe.createdDate;
        }));
    }

    this.recipeForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name, Validators.required),
      category: new FormControl(category, Validators.required),
      shortDesc: new FormControl(shortDesc, Validators.required),
      longDesc: new FormControl(longDesc, Validators.required),
      createdDate: new FormControl(createdDate),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
