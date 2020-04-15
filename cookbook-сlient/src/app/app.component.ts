import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, timeout} from 'rxjs/operators';
import {of} from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab2';

  constructor(private http: HttpClient) {
  }
}
