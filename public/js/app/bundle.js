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
System.register("messages/message.service", ["messages/message", 'angular2/http', 'angular2/core', 'rxjs/Rx', 'rxjs/Observable'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var message_1, http_1, core_1, Observable_1;
    var MessageService;
    return {
        setters:[
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MessageService = (function () {
                function MessageService(_http) {
                    this._http = _http;
                    this.messages = [];
                    this.messageIsEdit = new core_1.EventEmitter();
                }
                MessageService.prototype.addMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    // Return an observable
                    return this._http.post('http://localhost:3000/message', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var message = new message_1.Message(data.content, data._id, 'Dummy', null);
                        return message;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.getMessages = function () {
                    return this._http.get('http://localhost:3000/message')
                        .map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var message = new message_1.Message(data[i].content, data[i]._id, 'Dummy', null);
                            objs.push(message);
                        }
                        ;
                        return objs;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.updateMessage = function (message) {
                    var body = JSON.stringify(message);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.patch('http://localhost:3000/message/' + message.messageId, body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService.prototype.editMessage = function (message) {
                    this.messageIsEdit.emit(message);
                };
                MessageService.prototype.deleteMessage = function (message) {
                    this.messages.splice(this.messages.indexOf(message), 1);
                    return this._http.delete('http://localhost:3000/message/' + message.messageId)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                MessageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MessageService);
                return MessageService;
            }());
            exports_2("MessageService", MessageService);
        }
    }
});
System.register("messages/message.component", ['angular2/core', "messages/message", "messages/message.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, message_2, message_service_1;
    var MessageComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            },
            function (message_service_1_1) {
                message_service_1 = message_service_1_1;
            }],
        execute: function() {
            // I used a template-driven approach as opposed to data-driven
            MessageComponent = (function () {
                function MessageComponent(_messageService) {
                    this._messageService = _messageService;
                    this.editClicked = new core_2.EventEmitter();
                }
                MessageComponent.prototype.onEdit = function () {
                    this._messageService.editMessage(this.message);
                };
                MessageComponent.prototype.onDelete = function () {
                    this._messageService.deleteMessage(this.message)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', message_2.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_2.Component({
                        selector: 'my-message',
                        template: "\n        <article class=\"panel panel-default\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>\n            <footer>\n                <div class=\"author\">\n                    {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a (click)=\"onEdit()\">Edit</a>\n                    <a (click)=\"onDelete()\">Delete</a>\n                </div>\n            </footer>\n        </article>\n    ",
                        styles: ["\n        .author {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [message_service_1.MessageService])
                ], MessageComponent);
                return MessageComponent;
            }());
            exports_3("MessageComponent", MessageComponent);
        }
    }
});
System.register("messages/message-list.component", ['angular2/core', "messages/message.component", "messages/message.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, message_component_1, message_service_2;
    var MessageListComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_service_2_1) {
                message_service_2 = message_service_2_1;
            }],
        execute: function() {
            MessageListComponent = (function () {
                function MessageListComponent(_messageService) {
                    this._messageService = _messageService;
                }
                MessageListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.getMessages()
                        .subscribe(function (messages) {
                        // both are pointing to the same list, no duplicates
                        // this is why we get instant updating
                        _this.messages = messages;
                        _this._messageService.messages = messages;
                    });
                };
                MessageListComponent = __decorate([
                    core_3.Component({
                        selector: 'my-message-list',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">  \n            <my-message *ngFor=\"#message of messages\" [message]=\"message\" (editClicked)=\"message.content = $event\"></my-message>\n        </section>\n    ",
                        directives: [message_component_1.MessageComponent]
                    }), 
                    __metadata('design:paramtypes', [message_service_2.MessageService])
                ], MessageListComponent);
                return MessageListComponent;
            }());
            exports_4("MessageListComponent", MessageListComponent);
        }
    }
});
System.register("messages/message-input.component", ['angular2/core', "messages/message", "messages/message.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, message_3, message_service_3;
    var MessageInputComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (message_3_1) {
                message_3 = message_3_1;
            },
            function (message_service_3_1) {
                message_service_3 = message_service_3_1;
            }],
        execute: function() {
            MessageInputComponent = (function () {
                function MessageInputComponent(_messageService) {
                    this._messageService = _messageService;
                    this.message = null;
                }
                MessageInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.message) {
                        // Edit
                        this.message.content = form.content;
                        this._messageService.updateMessage(this.message)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                        this.message = null;
                    }
                    else {
                        // New Message
                        var message = new message_3.Message(form.content, null, 'Dummy');
                        this._messageService.addMessage(message)
                            .subscribe(function (data) {
                            console.log(data),
                                _this._messageService.messages.push(data);
                        }, function (error) { return console.log(error); });
                    }
                };
                MessageInputComponent.prototype.onCancel = function () {
                    this.message = null;
                };
                MessageInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._messageService.messageIsEdit.subscribe(function (message) {
                        _this.message = message;
                    });
                };
                MessageInputComponent = __decorate([
                    core_4.Component({
                        selector: 'my-message-input',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n                <div class=\"form-group\">\n                    <label for=\"content\">Content</label>\n                    <input ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input [ngModel]=\"message?.content\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\">{{ !message ? 'Send Message' : 'Update Message' }}</button>\n                <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\" *ngIf=\"message\">Stop Editing</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [message_service_3.MessageService])
                ], MessageInputComponent);
                return MessageInputComponent;
            }());
            exports_5("MessageInputComponent", MessageInputComponent);
        }
    }
});
System.register("messages/messages.component", ['angular2/core', "messages/message-list.component", "messages/message-input.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, message_list_component_1, message_input_component_1;
    var MessagesComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (message_list_component_1_1) {
                message_list_component_1 = message_list_component_1_1;
            },
            function (message_input_component_1_1) {
                message_input_component_1 = message_input_component_1_1;
            }],
        execute: function() {
            MessagesComponent = (function () {
                function MessagesComponent() {
                }
                MessagesComponent = __decorate([
                    core_5.Component({
                        selector: 'my-messages',
                        template: "\n        <div class=\"row spacing\">\n            <my-message-input></my-message-input>\n        </div>\n        <div class=\"row spacing\">\n            <my-message-list></my-message-list>\n        </div>\n    ",
                        directives: [message_list_component_1.MessageListComponent, message_input_component_1.MessageInputComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MessagesComponent);
                return MessagesComponent;
            }());
            exports_6("MessagesComponent", MessagesComponent);
        }
    }
});
System.register("auth/user", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(email, password, firstName, lastName) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                }
                return User;
            }());
            exports_7("User", User);
        }
    }
});
System.register("auth/auth.service", ['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, http_2, Observable_2;
    var AuthService;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            },
            function (_2) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(_http) {
                    this._http = _http;
                }
                AuthService.prototype.signup = function (user) {
                    var body = JSON.stringify(user);
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/user/', body, { headers: headers })
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return Observable_2.Observable.throw(error.json()); });
                };
                AuthService = __decorate([
                    core_6.Injectable(), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_8("AuthService", AuthService);
        }
    }
});
System.register("auth/signup.component", ['angular2/core', 'angular2/common', "auth/user", "auth/auth.service"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, common_1, user_1, auth_service_1;
    var SignupComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            // I used a data-driven approach as opposed to template-driven
            SignupComponent = (function () {
                function SignupComponent(_fb, _authService) {
                    this._fb = _fb;
                    this._authService = _authService;
                }
                SignupComponent.prototype.onSubmit = function () {
                    var user = new user_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
                    this._authService.signup(user)
                        .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                SignupComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        firstName: ['', common_1.Validators.required],
                        lastName: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', common_1.Validators.required]
                    });
                };
                // Only returns if validation fails
                SignupComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_'{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_'{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                SignupComponent = __decorate([
                    core_7.Component({
                        selector: 'my-signup',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input [ngFormControl]=\"myForm.find('firstName')\" type=\"text\" id=\"firstName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input [ngFormControl]=\"myForm.find('lastName')\" type=\"text\" id=\"lastName\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\">Email</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_9("SignupComponent", SignupComponent);
        }
    }
});
System.register("auth/login.component", ['angular2/core', 'angular2/common'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8, common_2;
    var LoginComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            // I used a data-driven approach as opposed to template-driven
            LoginComponent = (function () {
                function LoginComponent(_fb) {
                    this._fb = _fb;
                }
                LoginComponent.prototype.onSubmit = function () {
                    console.log(this.myForm.value);
                };
                LoginComponent.prototype.ngOnInit = function () {
                    this.myForm = this._fb.group({
                        email: ['', common_2.Validators.compose([
                                common_2.Validators.required,
                                this.isEmail
                            ])],
                        password: ['', common_2.Validators.required]
                    });
                };
                // Only returns if validation fails
                LoginComponent.prototype.isEmail = function (control) {
                    if (!control.value.match("[a-z0-9!#$%&'*+/=?^_'{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_'{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
                        return { invalidMail: true };
                    }
                };
                LoginComponent = __decorate([
                    core_8.Component({
                        selector: 'my-login',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <form [ngFormModel]=\"myForm\" (ngSubmit)=\"onSubmit()\">\n                <div class=\"form-group\">\n                    <label for=\"email\">Email</label>\n                    <input [ngFormControl]=\"myForm.find('email')\" type=\"email\" id=\"email\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"password\">Password</label>\n                    <input [ngFormControl]=\"myForm.find('password')\" type=\"password\" id=\"password\" class=\"form-control\">\n                </div>\n                <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!myForm.valid\">Sign Up</button>\n            </form>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [common_2.FormBuilder])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_10("LoginComponent", LoginComponent);
        }
    }
});
System.register("auth/logout.component", ['angular2/core'], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_9;
    var LogoutComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            }],
        execute: function() {
            LogoutComponent = (function () {
                function LogoutComponent() {
                }
                LogoutComponent.prototype.onLogout = function () {
                };
                LogoutComponent = __decorate([
                    core_9.Component({
                        selector: 'my-logout',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n            <button class=\"btn btn-danger\" (click)=\"onLogout()\">Logout</button>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], LogoutComponent);
                return LogoutComponent;
            }());
            exports_11("LogoutComponent", LogoutComponent);
        }
    }
});
System.register("auth/authentication.component", ['angular2/core', "auth/signup.component", 'angular2/router', "auth/login.component", "auth/logout.component"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_10, signup_component_1, router_1, login_component_1, logout_component_1;
    var AuthenticationComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            }],
        execute: function() {
            AuthenticationComponent = (function () {
                function AuthenticationComponent() {
                }
                AuthenticationComponent = __decorate([
                    core_10.Component({
                        selector: 'my-app',
                        template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li><a [routerLink]=\"['Signup']\">Signup</a></li>\n                    <li><a [routerLink]=\"['Login']\">Login</a></li>\n                    <li><a [routerLink]=\"['Logout']\">Logout</a></li>\n                </ul>\n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        styles: ["\n        .router-link-active {\n            color: #555;\n            cursor: default;\n            background-color: #fff;\n            border: 1px solid #ddd;\n            border-bottom-color: transparent;\n        }\n    "]
                    }),
                    router_1.RouteConfig([
                        { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent, useAsDefault: true },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/logout', name: 'Logout', component: logout_component_1.LogoutComponent },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AuthenticationComponent);
                return AuthenticationComponent;
            }());
            exports_12("AuthenticationComponent", AuthenticationComponent);
        }
    }
});
System.register("header.component", ['angular2/core', 'angular2/router'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_11, router_2;
    var HeaderComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent = __decorate([
                    core_11.Component({
                        selector: 'my-header',
                        template: "\n        <header class=\"row\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-pills\">\n                    <li><a [routerLink]=\"['Messages']\">Messenger</a></li>\n                    <li><a [routerLink]=\"['Auth']\">Authentication</a></li>\n                </ul>\n            </nav>\n        </header>\n    ",
                        directives: [router_2.ROUTER_DIRECTIVES],
                        styles: ["\n        header {\n            margin-bottom: 20px;\n        }\n        ul {\n            text-align: center;\n        }\n        li {\n            float: none;\n            display: inline-block;\n        }\n        .router-link-active {\n            background-color: #337ab7;\n            color: white;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_13("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("app.component", ['angular2/core', 'angular2/router', "messages/messages.component", "auth/authentication.component", "header.component"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_12, router_3, messages_component_1, authentication_component_1, header_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (authentication_component_1_1) {
                authentication_component_1 = authentication_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_12.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"container\">\n            <my-header></my-header>\n            <router-outlet></router-outlet>\n        </div>\n    ",
                        directives: [router_3.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }),
                    router_3.RouteConfig([
                        { path: '/', name: 'Messages', component: messages_component_1.MessagesComponent, useAsDefault: true },
                        { path: '/auth/...', name: 'Auth', component: authentication_component_1.AuthenticationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_14("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "messages/message.service", "auth/auth.service", 'angular2/router', 'angular2/core', 'angular2/http'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var browser_1, app_component_1, message_service_4, auth_service_2, router_4, core_13, http_3;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (message_service_4_1) {
                message_service_4 = message_service_4_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [message_service_4.MessageService, auth_service_2.AuthService, router_4.ROUTER_PROVIDERS, core_13.provide(router_4.LocationStrategy, { useClass: router_4.HashLocationStrategy }), http_3.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLnNlcnZpY2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2UtbGlzdC5jb21wb25lbnQudHMiLCJtZXNzYWdlcy9tZXNzYWdlLWlucHV0LmNvbXBvbmVudC50cyIsIm1lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudC50cyIsImF1dGgvdXNlci50cyIsImF1dGgvYXV0aC5zZXJ2aWNlLnRzIiwiYXV0aC9zaWdudXAuY29tcG9uZW50LnRzIiwiYXV0aC9sb2dpbi5jb21wb25lbnQudHMiLCJhdXRoL2xvZ291dC5jb21wb25lbnQudHMiLCJhdXRoL2F1dGhlbnRpY2F0aW9uLmNvbXBvbmVudC50cyIsImhlYWRlci5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBTUksaUJBQWEsT0FBZSxFQUFFLFNBQWtCLEVBQUUsUUFBaUIsRUFBRSxNQUFlO29CQUNoRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFFekIsQ0FBQztnQkFDTCxjQUFDO1lBQUQsQ0FiQSxBQWFDLElBQUE7WUFiRCw2QkFhQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDTkQ7Z0JBSUksd0JBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtvQkFIL0IsYUFBUSxHQUFjLEVBQUUsQ0FBQztvQkFDekIsa0JBQWEsR0FBRyxJQUFJLG1CQUFZLEVBQVcsQ0FBQztnQkFFVixDQUFDO2dCQUVuQyxtQ0FBVSxHQUFWLFVBQVcsT0FBZ0I7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QUFDO3FCQUNuRCxDQUFDO29CQUVELG9CQUFXLENBQUM7d0JBQ1QsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7d0JBQy9FLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxrREFBdUIsRUFBQztxQkFDeEUsQ0FBQzs7Z0NBQUE7Z0JBSUYsbUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHdDQUVDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDZkQsbUJBQVMsQ0FBQyw0QkFBWSxFQUFFLENBQUMsZ0NBQWMsRUFBRSwwQkFBVyxFQUFFLHlCQUFnQixFQUFFLGVBQU8sQ0FBQyx5QkFBZ0IsRUFBRSxFQUFDLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDLEVBQUUscUJBQWMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi4vLi4vLi4vbWVhbi1hcHAvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICAgIGNvbnRlbnQ6IHN0cmluZztcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIHVzZXJJZDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IgKGNvbnRlbnQ6IHN0cmluZywgbWVzc2FnZUlkPzogc3RyaW5nLCB1c2VybmFtZT86IHN0cmluZywgdXNlcklkPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMubWVzc2FnZUlkID0gbWVzc2FnZUlkO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkO1xuXG4gICAgfVxufSIsImltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlJztcbmltcG9ydCB7SHR0cCwgSGVhZGVyc30gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG5pbXBvcnQge0luamVjdGFibGUsIEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQgJ3J4anMvUngnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVNlcnZpY2Uge1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcbiAgICBtZXNzYWdlSXNFZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkge31cblxuICAgIGFkZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICAvLyBSZXR1cm4gYW4gb2JzZXJ2YWJsZVxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvbWVzc2FnZScsIGJvZHksIHtoZWFkZXJzOiBoZWFkZXJzfSlcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGF0YS5jb250ZW50LCBkYXRhLl9pZCwgJ0R1bW15JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKS5vYmo7XG4gICAgICAgICAgICAgICAgbGV0IG9ianM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IE1lc3NhZ2UoZGF0YVtpXS5jb250ZW50LCBkYXRhW2ldLl9pZCwgJ0R1bW15JywgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UvJyArIG1lc3NhZ2UubWVzc2FnZUlkLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxuICAgIGVkaXRNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlSXNFZGl0LmVtaXQobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgZGVsZXRlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMuc3BsaWNlKHRoaXMubWVzc2FnZXMuaW5kZXhPZihtZXNzYWdlKSwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UvJyArIG1lc3NhZ2UubWVzc2FnZUlkKVxuICAgICAgICAgICAgLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJpbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XHJpbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZSc7XHJcci8vIEkgdXNlZCBhIHRlbXBsYXRlLWRyaXZlbiBhcHByb2FjaCBhcyBvcHBvc2VkIHRvIGRhdGEtZHJpdmVuXHJAQ29tcG9uZW50KHtcciAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2UnLFxyICAgIHRlbXBsYXRlOiBgXHIgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxyICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cciAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cciAgICAgICAgICAgIDwvZGl2PlxyICAgICAgICAgICAgPGZvb3Rlcj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XHIgICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UudXNlcm5hbWUgfX1cciAgICAgICAgICAgICAgICA8L2Rpdj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XHIgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkVkaXQoKVwiPkVkaXQ8L2E+XHIgICAgICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJvbkRlbGV0ZSgpXCI+RGVsZXRlPC9hPlxyICAgICAgICAgICAgICAgIDwvZGl2PlxyICAgICAgICAgICAgPC9mb290ZXI+XHIgICAgICAgIDwvYXJ0aWNsZT5cciAgICBgLFxyICAgIHN0eWxlczogW2BcciAgICAgICAgLmF1dGhvciB7XHIgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHIgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHIgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHIgICAgICAgICAgICB3aWR0aDogODAlO1xyICAgICAgICB9XHIgICAgICAgIC5jb25maWcge1xyICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHIgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHIgICAgICAgICAgICB3aWR0aDogMTklO1xyICAgICAgICB9XHIgICAgYF1ccn0pXHJccmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcciAgICBASW5wdXQoKSBtZXNzYWdlOk1lc3NhZ2U7XHJcciAgICBAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxyICAgIGNvbnN0cnVjdG9yIChwcml2YXRlIF9tZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UpIHt9XHJcciAgICBvbkVkaXQoKSB7XHIgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKHRoaXMubWVzc2FnZSk7XHIgICAgfVxyXHIgICAgb25EZWxldGUoKSB7XHIgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLmRlbGV0ZU1lc3NhZ2UodGhpcy5tZXNzYWdlKVxyICAgICAgICAgICAgLnN1YnNjcmliZShcciAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxyICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpXHIgICAgICAgICAgICApO1xyICAgIH1ccn1cclxyXHJcclxyIiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSAnLi9tZXNzYWdlLnNlcnZpY2UnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1tZXNzYWdlLWxpc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+ICBcbiAgICAgICAgICAgIDxteS1tZXNzYWdlICpuZ0Zvcj1cIiNtZXNzYWdlIG9mIG1lc3NhZ2VzXCIgW21lc3NhZ2VdPVwibWVzc2FnZVwiIChlZGl0Q2xpY2tlZCk9XCJtZXNzYWdlLmNvbnRlbnQgPSAkZXZlbnRcIj48L215LW1lc3NhZ2U+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtNZXNzYWdlQ29tcG9uZW50XVxufSlcblxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5nZXRNZXNzYWdlcygpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYm90aCBhcmUgcG9pbnRpbmcgdG8gdGhlIHNhbWUgbGlzdCwgbm8gZHVwbGljYXRlc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIHdoeSB3ZSBnZXQgaW5zdGFudCB1cGRhdGluZ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJy4vbWVzc2FnZSc7XG5pbXBvcnQge01lc3NhZ2VTZXJ2aWNlfSBmcm9tICcuL21lc3NhZ2Uuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZS1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdChmLnZhbHVlKVwiICNmPVwibmdGb3JtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5nQ29udHJvbD1cImNvbnRlbnRcIiB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJjb250ZW50XCIgI2lucHV0IFtuZ01vZGVsXT1cIm1lc3NhZ2U/LmNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPnt7ICFtZXNzYWdlID8gJ1NlbmQgTWVzc2FnZScgOiAnVXBkYXRlIE1lc3NhZ2UnIH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uQ2FuY2VsKClcIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgKm5nSWY9XCJtZXNzYWdlXCI+U3RvcCBFZGl0aW5nPC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgb25TdWJtaXQoZm9ybTphbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZSkge1xuICAgICAgICAgICAgLy8gRWRpdFxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLmNvbnRlbnQgPSBmb3JtLmNvbnRlbnQ7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS51cGRhdGVNZXNzYWdlKHRoaXMubWVzc2FnZSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOZXcgTWVzc2FnZVxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZTogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKGZvcm0uY29udGVudCwgbnVsbCwgJ0R1bW15Jyk7XG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5hZGRNZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UubWVzc2FnZUlzRWRpdC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VMaXN0Q29tcG9uZW50fSBmcm9tICcuL21lc3NhZ2UtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXNzYWdlSW5wdXRDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZS1pbnB1dC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LW1lc3NhZ2VzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxteS1tZXNzYWdlLWlucHV0PjwvbXktbWVzc2FnZS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgc3BhY2luZ1wiPlxuICAgICAgICAgICAgPG15LW1lc3NhZ2UtbGlzdD48L215LW1lc3NhZ2UtbGlzdD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUxpc3RDb21wb25lbnQsIE1lc3NhZ2VJbnB1dENvbXBvbmVudF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCB7XG5cbn0iLCJleHBvcnQgY2xhc3MgVXNlciB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGVtYWlsOiBzdHJpbmcsIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nLCBwdWJsaWMgZmlyc3ROYW1lPzogc3RyaW5nLCBwdWJsaWMgbGFzdE5hbWU/OiBzdHJpbmcpIHtcbiAgICAgICAgXG4gICAgfVxufSIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHAsIEhlYWRlcnN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuL3VzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICdyeGpzL1J4JztcbkBJbmplY3RhYmxlKClcblxuZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHt9XG5cbiAgICBzaWdudXAodXNlcjogVXNlcikge1xuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlci8nLCBib2R5LCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xuICAgIH1cblxufSIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbEdyb3VwLCBWYWxpZGF0b3JzLCBDb250cm9sfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuaW1wb3J0IHtVc2VyfSBmcm9tICcuL3VzZXInO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG4vLyBJIHVzZWQgYSBkYXRhLWRyaXZlbiBhcHByb2FjaCBhcyBvcHBvc2VkIHRvIHRlbXBsYXRlLWRyaXZlblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1zaWdudXAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICA8Zm9ybSBbbmdGb3JtTW9kZWxdPVwibXlGb3JtXCIgKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBbbmdGb3JtQ29udHJvbF09XCJteUZvcm0uZmluZCgnZmlyc3ROYW1lJylcIiB0eXBlPVwidGV4dFwiIGlkPVwiZmlyc3ROYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGFzdE5hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ2xhc3ROYW1lJylcIiB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ3Bhc3N3b3JkJylcIiB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhbXlGb3JtLnZhbGlkXCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYCAgICBcbn0pXG5cbmV4cG9ydCBjbGFzcyBTaWdudXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgbXlGb3JtOiBDb250cm9sR3JvdXA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYjpGb3JtQnVpbGRlciwgcHJpdmF0ZSBfYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlKSB7fVxuXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih0aGlzLm15Rm9ybS52YWx1ZS5lbWFpbCwgdGhpcy5teUZvcm0udmFsdWUucGFzc3dvcmQsIHRoaXMubXlGb3JtLnZhbHVlLmZpcnN0TmFtZSwgdGhpcy5teUZvcm0udmFsdWUubGFzdE5hbWUpO1xuICAgICAgICB0aGlzLl9hdXRoU2VydmljZS5zaWdudXAodXNlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm15Rm9ybSA9IHRoaXMuX2ZiLmdyb3VwKHtcbiAgICAgICAgICAgIGZpcnN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWw6IFsnJywgVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgICAgIHRoaXMuaXNFbWFpbFxuICAgICAgICAgICAgXSldLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT25seSByZXR1cm5zIGlmIHZhbGlkYXRpb24gZmFpbHNcbiAgICBwcml2YXRlIGlzRW1haWwoY29udHJvbDogQ29udHJvbCk6IHtbczogc3RyaW5nXTogYm9vbGVhbn0ge1xuICAgICAgICBpZiAoIWNvbnRyb2wudmFsdWUubWF0Y2goXCJbYS16MC05ISMkJSYnKisvPT9eXyd7fH1+LV0rKD86XFwuW2EtejAtOSEjJCUmJyorLz0/Xl8ne3x9fi1dKykqQCg/OlthLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cXC4pK1thLXowLTldKD86W2EtejAtOS1dKlthLXowLTldKT9cIikpIHtcbiAgICAgICAgICAgIHJldHVybiB7aW52YWxpZE1haWw6IHRydWV9O1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgQ29udHJvbEdyb3VwLCBWYWxpZGF0b3JzLCBDb250cm9sfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuXG4vLyBJIHVzZWQgYSBkYXRhLWRyaXZlbiBhcHByb2FjaCBhcyBvcHBvc2VkIHRvIHRlbXBsYXRlLWRyaXZlblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1sb2dpbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgIDxmb3JtIFtuZ0Zvcm1Nb2RlbF09XCJteUZvcm1cIiAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFtuZ0Zvcm1Db250cm9sXT1cIm15Rm9ybS5maW5kKCdlbWFpbCcpXCIgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgW25nRm9ybUNvbnRyb2xdPVwibXlGb3JtLmZpbmQoJ3Bhc3N3b3JkJylcIiB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhbXlGb3JtLnZhbGlkXCI+U2lnbiBVcDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYCAgICBcbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBteUZvcm06IENvbnRyb2xHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZiOkZvcm1CdWlsZGVyKSB7fVxuXG4gICAgb25TdWJtaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXlGb3JtLnZhbHVlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5teUZvcm0gPSB0aGlzLl9mYi5ncm91cCh7XG4gICAgICAgICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5pc0VtYWlsXG4gICAgICAgICAgICBdKV0sXG4gICAgICAgICAgICBwYXNzd29yZDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IHJldHVybnMgaWYgdmFsaWRhdGlvbiBmYWlsc1xuICAgIHByaXZhdGUgaXNFbWFpbChjb250cm9sOiBDb250cm9sKToge1tzOiBzdHJpbmddOiBib29sZWFufSB7XG4gICAgICAgIGlmICghY29udHJvbC52YWx1ZS5tYXRjaChcIlthLXowLTkhIyQlJicqKy89P15fJ3t8fX4tXSsoPzpcXC5bYS16MC05ISMkJSYnKisvPT9eXyd7fH1+LV0rKSpAKD86W2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1xcLikrW2EtejAtOV0oPzpbYS16MC05LV0qW2EtejAtOV0pP1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtpbnZhbGlkTWFpbDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1sb2dvdXQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiAoY2xpY2spPVwib25Mb2dvdXQoKVwiPkxvZ291dDwvYnV0dG9uPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIExvZ291dENvbXBvbmVudCB7XG4gICAgb25Mb2dvdXQoKSB7XG4gICAgICAgIFxuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1NpZ251cENvbXBvbmVudH0gZnJvbSAnLi9zaWdudXAuY29tcG9uZW50JztcbmltcG9ydCB7Um91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuaW1wb3J0IHtMb2dpbkNvbXBvbmVudH0gZnJvbSAnLi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHtMb2dvdXRDb21wb25lbnR9IGZyb20gJy4vbG9nb3V0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwicm93IHNwYWNpbmdcIj5cbiAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnU2lnbnVwJ11cIj5TaWdudXA8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnTG9naW4nXVwiPkxvZ2luPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ0xvZ291dCddXCI+TG9nb3V0PC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCI+XG4gICAgICAgICAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIC5yb3V0ZXItbGluay1hY3RpdmUge1xuICAgICAgICAgICAgY29sb3I6ICM1NTU7XG4gICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAge3BhdGg6ICcvc2lnbnVwJywgbmFtZTogJ1NpZ251cCcsIGNvbXBvbmVudDogU2lnbnVwQ29tcG9uZW50LCB1c2VBc0RlZmF1bHQ6IHRydWV9LFxuICAgIHtwYXRoOiAnL2xvZ2luJywgbmFtZTogJ0xvZ2luJywgY29tcG9uZW50OiBMb2dpbkNvbXBvbmVudH0sXG4gICAge3BhdGg6ICcvbG9nb3V0JywgbmFtZTogJ0xvZ291dCcsIGNvbXBvbmVudDogTG9nb3V0Q29tcG9uZW50fSxcbl0pXG5cbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvbkNvbXBvbmVudCB7XG5cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tICdhbmd1bGFyMi9yb3V0ZXInO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2LXBpbGxzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48YSBbcm91dGVyTGlua109XCJbJ01lc3NhZ2VzJ11cIj5NZXNzZW5nZXI8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxhIFtyb3V0ZXJMaW5rXT1cIlsnQXV0aCddXCI+QXV0aGVudGljYXRpb248L2E+PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvaGVhZGVyPlxuICAgIGAsXG4gICAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTXSxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIGhlYWRlciB7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgIHVsIHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuICAgICAgICBsaSB7XG4gICAgICAgICAgICBmbG9hdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgfVxuICAgICAgICAucm91dGVyLWxpbmstYWN0aXZlIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XG4gICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIH1cbiAgICBgXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JvdXRlQ29uZmlnLCBST1VURVJfRElSRUNUSVZFU30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7TWVzc2FnZXNDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50JztcbmltcG9ydCB7QXV0aGVudGljYXRpb25Db21wb25lbnR9IGZyb20gJy4vYXV0aC9hdXRoZW50aWNhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtIZWFkZXJDb21wb25lbnR9IGZyb20gJy4vaGVhZGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8bXktaGVhZGVyPjwvbXktaGVhZGVyPlxuICAgICAgICAgICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGRpcmVjdGl2ZXM6IFtST1VURVJfRElSRUNUSVZFUywgSGVhZGVyQ29tcG9uZW50XVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDogJy8nLCBuYW1lOiAnTWVzc2FnZXMnLCBjb21wb25lbnQ6IE1lc3NhZ2VzQ29tcG9uZW50LCB1c2VBc0RlZmF1bHQ6IHRydWV9LFxuICAgIHtwYXRoOiAnL2F1dGgvLi4uJywgbmFtZTogJ0F1dGgnLCBjb21wb25lbnQ6IEF1dGhlbnRpY2F0aW9uQ29tcG9uZW50fVxuXSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgXG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gJy4vYXV0aC9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHtST1VURVJfUFJPVklERVJTLCBMb2NhdGlvblN0cmF0ZWd5LCBIYXNoTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9odHRwJztcblxuYm9vdHN0cmFwKEFwcENvbXBvbmVudCwgW01lc3NhZ2VTZXJ2aWNlLCBBdXRoU2VydmljZSwgUk9VVEVSX1BST1ZJREVSUywgcHJvdmlkZShMb2NhdGlvblN0cmF0ZWd5LCB7dXNlQ2xhc3M6IEhhc2hMb2NhdGlvblN0cmF0ZWd5fSksIEhUVFBfUFJPVklERVJTXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
