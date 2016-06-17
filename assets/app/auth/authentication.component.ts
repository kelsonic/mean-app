import {Component} from 'angular2/core';
import {SignupComponent} from './signup.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';

@Component({
    selector: 'my-app',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a [routerLink]="['Signup']">Signup</a></li>
                    <li><a [routerLink]="['Login']">Login</a></li>
                    <li><a [routerLink]="['Logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
        .router-link-active {
            color: #555;
            cursor: default;
            background-color: #fff;
            border: 1px solid #ddd;
            border-bottom-color: transparent;
        }
    `]
})

@RouteConfig([
    {path: '/signup', name: 'Signup', component: SignupComponent, useAsDefault: true},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/logout', name: 'Logout', component: LogoutComponent},
])

export class AuthenticationComponent {

}