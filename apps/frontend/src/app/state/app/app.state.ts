import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShowEmail, ShowLoading, ShowToken } from './app.actions';

export interface AppStateModel {
    loading: boolean;
    email?: string;
    token?: string;
}

@State<AppStateModel>({
  name: 'app',
  defaults: { loading: false }
})
@Injectable({providedIn: 'root'})
export class AppState {
    @Selector() static loading(state: AppStateModel){
        return state.loading;
    }
    
    @Action(ShowLoading)
    showLoading(
        { patchState }: StateContext<AppStateModel>,
        { loading }: ShowLoading
    ) {
        return patchState({ loading });
    }

    @Selector() static email(state: AppStateModel){
        return state.email;
    }
    
    @Action(ShowEmail)
    showEmail(
        { patchState }: StateContext<AppStateModel>,
        { email }: ShowEmail
    ) {
        return patchState({ email });
    }

    @Selector() static token(state: AppStateModel){
        return state.token;
    }

    @Action(ShowToken)
    showToken(
        { patchState }: StateContext<AppStateModel>,
        { token }: ShowToken
    ) {
        return patchState({ token });
    }
}