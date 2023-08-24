import { Component } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { ShowEmail, ShowLoading, ShowToken } from '../../state/app/app.actions';
import { catchError, finalize, tap } from 'rxjs';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  }

  handleLogin() {
    if(this.formGroup.valid){
      this.setLoading(true);
      const creadentials = this.formGroup.value;
      
      this.authService.login(creadentials).pipe(
        tap(data => {
          this.setEmail(data.email);
          this.setToken(data.access_token);
          this.router.navigate(['/']);
          this.showSnackbar("Login successful!", "Dismiss")
        }),
        catchError((err) => {
          this.showSnackbarWithError(err.error.message, err.status);
          return "";
        }),
        finalize(() => {
          this.setLoading(false);
        })
      ).subscribe()
    }
  }

  showSnackbarWithError(error: string, status: number) {
    this.snackBar.open(error, "Retry").afterDismissed().subscribe(() => {
      if(status == 404)
        this.formGroup.controls.email.setValue("");
      this.formGroup.controls.password.setValue("");
    });
  }

  showSnackbar(message: string, actionLabel: string) {
    this.snackBar.open(message, actionLabel, { duration: 3000 });
  }

  setLoading(loading: boolean) {
    this.store.dispatch(new ShowLoading(loading));
  }

  setEmail(email: string) {
    this.store.dispatch(new ShowEmail(email));
  }

  setToken(token: string) {
    this.store.dispatch(new ShowToken(token));
  }
}