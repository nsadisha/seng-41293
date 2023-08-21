import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AppState } from '../../state/app/app.state';
import { ShowLoading } from '../../state/app/app.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatProgressBarModule,
    MatButtonModule, 
    MatIconModule,
    RouterModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
})

export class LoginComponent {
  loading$: Observable<boolean>;
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ){
    this.loading$ = this.store.select(AppState.loading);
  }

  handleLogin() {
    if(this.formGroup.valid){
      this.setLoading(true);
      this.authService.login().then(result => {
        this.router.navigate(['/']);
      }).catch(err => {
        this.snackBar.open(err, "Retry").afterDismissed().subscribe(() => {
          this.formGroup.controls.password.setValue("");
        });
      }).finally(() => {
        this.setLoading(false);
      })
    }
  }

  setLoading(_loading: boolean) {
    this.store.dispatch(new ShowLoading(_loading))
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}