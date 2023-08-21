import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppState } from './state/app/app.state';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  loading$: Observable<boolean>;

  constructor(private store: Store){
    this.loading$ = this.store.select(AppState.loading);
  }
}
