import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, throwError} from 'rxjs';
import {Recipe} from './recipes/recipe.model';
import {retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetRecipesService {
  private subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:9000/api/recipes';

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url);
  }

  getRecipe(id: string) {
    const res = this.http.get<Recipe>(this.url + '/' + id).pipe(
      retry(1),
      catchError(this.handleError)
    );
    return res;
  }

  createRecipe(recipe: Recipe)/*: Observable<Recipe>*/ {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const res = this.http.post<Recipe>(this.url, JSON.stringify(recipe), httpOptions);
    res.subscribe();
    return res;
  }

  updateRecipe(id: string, recipe: Recipe)/*: Observable<Recipe> */ {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const res = this.http.patch<Recipe>(this.url + '/' + id, JSON.stringify(recipe), httpOptions);
    res.subscribe();
    return res;
  }

  deleteRecipe(id: string)/*: Observable<Recipe> */ {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    const res = this.http.delete<Recipe>(this.url + '/' + id, httpOptions);
    res.subscribe();
    return res;
  }

  getCategories(): string[] {
    let res: string[];
    this.http.get<Recipe[]>(this.url).subscribe(data =>
      res = data.map(s => s.category)
    );
    return res;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
