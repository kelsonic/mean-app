import {Component} from 'angular2/core';
import {LoginComponent} from './login.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>Login</h1>
        <my-login></my-login>
    `,
    directives: [LoginComponent]
})

export class AuthenticationComponent {

}