import {Component} from 'angular2/core';
@Component({
    selector: 'my-app',
    template: `
        <div class="row">
            <section class="col-md-8 col-md-offset-2">
                <input type="text" [(ngModel)]="message.content">
            </section>
        </div>
        <div class="row">
            <section class="col-md-8 col-md-offset-2">  
                <my-message></my-message>
            </section>
        </div>
    `
})
export class AppComponent {
    message = {
        content: 'A message',
        author: 'Max'
    };
}