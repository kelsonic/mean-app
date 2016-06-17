var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("messages/message", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(content, messageId, username, userId) {
                    this.content = content;
                    this.messageId = messageId;
                    this.username = username;
                    this.userId = userId;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
System.register("messages/message.component", ['angular2/core', "messages/message"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, message_1;
    var MessageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            MessageComponent = (function () {
                function MessageComponent() {
                    this.message = new message_1.Message('The content', null, 'Max');
                }
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-message',
                        template: "\n        <article class=\"panel panel-default\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>\n            <footer>\n                <div class=\"author\">\n                    {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a href=\"#\">Edit</a>\n                    <a href=\"#\">Delete</a>\n                </div>\n            </footer>\n        </article>\n    ",
                        styles: ["\n        .author {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_2("MessageComponent", MessageComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "messages/message.component"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, message_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.message = {
                        content: 'A message',
                        author: 'Max'
                    };
                }
                AppComponent = __decorate([
                    core_2.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">\n                <input type=\"text\" [(ngModel)]=\"message.content\">\n            </section>\n        </div>\n        <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">  \n                <my-message></my-message>\n            </section>\n        </div>\n    ",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_3("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var browser_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
        }
    }
});
System.register("auth/user", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                }
                return User;
            }());
            exports_5("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQTtnQkFNSSxpQkFBYSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxRQUFpQixFQUFFLE1BQWU7b0JBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUV6QixDQUFDO2dCQUNMLGNBQUM7WUFBRCxDQWJBLEFBYUMsSUFBQTtZQWJELDZCQWFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ3VCRDtnQkFBQTtvQkFDSSxZQUFPLEdBQVcsSUFBSSxpQkFBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBcENEO29CQUFDLGdCQUFTLENBQUM7d0JBQ1AsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLFFBQVEsRUFBRSxtZUFlVDt3QkFDRCxNQUFNLEVBQUUsQ0FBQywyVEFhUixDQUFDO3FCQUNMLENBQUM7O29DQUFBO2dCQUlGLHVCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCwrQ0FFQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNwQkQ7Z0JBQUE7b0JBQ0ksWUFBTyxHQUFHO3dCQUNOLE9BQU8sRUFBRSxXQUFXO3dCQUNwQixNQUFNLEVBQUUsS0FBSztxQkFDaEIsQ0FBQztnQkFDTixDQUFDO2dCQXJCRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsMFhBV1Q7d0JBQ0QsVUFBVSxFQUFFLENBQUMsb0NBQWdCLENBQUM7cUJBQ2pDLENBQUM7O2dDQUFBO2dCQU1GLG1CQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCx1Q0FLQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztZQ25CRCxtQkFBUyxDQUFDLDRCQUFZLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUNKeEI7Z0JBQ0ksY0FBbUIsS0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBa0IsRUFBRSxRQUFpQjtvQkFBdEUsVUFBSyxHQUFMLEtBQUssQ0FBUTtnQkFFaEMsQ0FBQztnQkFDTCxXQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCx1QkFJQyxDQUFBIiwiZmlsZSI6Ii4uLy4uLy4uL21lYW4tYXBwL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICB1c2VySWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yIChjb250ZW50OiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZywgdXNlcm5hbWU/OiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblxuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJpbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XHJAQ29tcG9uZW50KHtcciAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxyICAgIHRlbXBsYXRlOiBgXHIgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxyICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cciAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cciAgICAgICAgICAgIDwvZGl2PlxyICAgICAgICAgICAgPGZvb3Rlcj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XHIgICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UudXNlcm5hbWUgfX1cciAgICAgICAgICAgICAgICA8L2Rpdj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XHIgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+RWRpdDwvYT5cciAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj5EZWxldGU8L2E+XHIgICAgICAgICAgICAgICAgPC9kaXY+XHIgICAgICAgICAgICA8L2Zvb3Rlcj5cciAgICAgICAgPC9hcnRpY2xlPlxyICAgIGAsXHIgICAgc3R5bGVzOiBbYFxyICAgICAgICAuYXV0aG9yIHtcciAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcciAgICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcciAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcciAgICAgICAgICAgIHdpZHRoOiA4MCU7XHIgICAgICAgIH1cciAgICAgICAgLmNvbmZpZyB7XHIgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHIgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcciAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcciAgICAgICAgICAgIHdpZHRoOiAxOSU7XHIgICAgICAgIH1cciAgICBgXVxyfSlcclxyZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnQge1xyICAgIG1lc3NhZ2U6TWVzc2FnZSA9IG5ldyBNZXNzYWdlKCdUaGUgY29udGVudCcsIG51bGwsICdNYXgnKTtccn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJtZXNzYWdlLmNvbnRlbnRcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+ICBcbiAgICAgICAgICAgICAgICA8bXktbWVzc2FnZT48L215LW1lc3NhZ2U+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW01lc3NhZ2VDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udGVudDogJ0EgbWVzc2FnZScsXG4gICAgICAgIGF1dGhvcjogJ01heCdcbiAgICB9O1xufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmJvb3RzdHJhcChBcHBDb21wb25lbnQpOyIsImV4cG9ydCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZmlyc3ROYW1lPzogc3RyaW5nLCBsYXN0TmFtZT86IHN0cmluZykge1xuICAgICAgICBcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
