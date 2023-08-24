import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngxs/store';
import { ConfirmPasswordValidator } from '../../utils/validators';
import { catchError, finalize, tap } from 'rxjs';
import {
  FormControl, 
  FormsModule, 
  ReactiveFormsModule, 
  FormGroup, 
  FormGroupDirective, 
  NgForm, 
  Validators 
} from '@angular/forms';
import { ShowLoading } from '../../state/app/app.actions';
import { IUser } from 'libs/model/src';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup = new FormGroup({
    email: new FormControl('nsadisha@gmail.com', [Validators.required, Validators.email]),
    name: new FormControl('Sadisha Nimsara', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, [ConfirmPasswordValidator()]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ){}
 
  handleRegister() {
    if(this.formGroup.valid){
      this.setLoading(true);
      const registerRequest = this.formGroup.value as IUser;
      
      this.authService.register(registerRequest).pipe(
        tap(data => {
          this.router.navigate(['/login']);
          this.showSnackbar("Registration successful!", "Dismiss")
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

  setLoading(loading: boolean) {
    this.store.dispatch(new ShowLoading(loading));
  }

  showSnackbar(message: string, actionLabel: string) {
    this.snackBar.open(message, actionLabel, { duration: 3000 });
  }

  showSnackbarWithError(error: string, status: number) {
    this.snackBar.open(error, "Retry").afterDismissed().subscribe(() => {
      if(status == 409)
        this.formGroup.controls.email.setValue("");
      this.formGroup.controls.password.setValue("");
      this.formGroup.controls.confirm_password.setValue("");
    });
  }
}
