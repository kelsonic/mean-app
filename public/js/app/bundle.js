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
                    this.editClicked = new core_1.EventEmitter();
                    this.color = "red";
                }
                MessageComponent.prototype.onClick = function () {
                    this.editClicked.emit('Changed');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', message_1.Message)
                ], MessageComponent.prototype, "message", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], MessageComponent.prototype, "editClicked", void 0);
                MessageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-message',
                        template: "\n        <article class=\"panel panel-default\" [ngStyle]=\"{'background-color': color}\" (mouseenter)=\"color = 'red'\" (mouseleave)=\"color = 'white'\">\n            <div class=\"panel-body\">\n                {{ message.content }}\n            </div>\n            <footer>\n                <div class=\"author\">\n                    {{ message.username }}\n                </div>\n                <div class=\"config\">\n                    <a href=\"#\" (click)=\"onClick()\">Edit</a>\n                    <a href=\"#\">Delete</a>\n                </div>\n            </footer>\n        </article>\n    ",
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
System.register("app.component", ['angular2/core', "messages/message.component", "messages/message"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, message_component_1, message_2;
    var AppComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (message_component_1_1) {
                message_component_1 = message_component_1_1;
            },
            function (message_2_1) {
                message_2 = message_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.message = new message_2.Message('A new message', null, 'Max');
                }
                AppComponent = __decorate([
                    core_2.Component({
                        selector: 'my-app',
                        template: "\n        <div class=\"row\">\n        </div>\n        <div class=\"row\">\n            <section class=\"col-md-8 col-md-offset-2\">  \n                <my-message [message]=\"message\" (editClicked)=\"message.content = $event\"></my-message>\n            </section>\n        </div>\n    ",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzL21lc3NhZ2UudHMiLCJtZXNzYWdlcy9tZXNzYWdlLmNvbXBvbmVudC50cyIsImFwcC5jb21wb25lbnQudHMiLCJib290LnRzIiwiYXV0aC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBQTtnQkFNSSxpQkFBYSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxRQUFpQixFQUFFLE1BQWU7b0JBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUV6QixDQUFDO2dCQUNMLGNBQUM7WUFBRCxDQWJBLEFBYUMsSUFBQTtZQWJELDZCQWFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ3VCRDtnQkFBQTtvQkFHYyxnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO29CQUVuRCxVQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUtsQixDQUFDO2dCQUhHLGtDQUFPLEdBQVA7b0JBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBUkQ7b0JBQUMsWUFBSyxFQUFFOztpRUFBQTtnQkFFUjtvQkFBQyxhQUFNLEVBQUU7O3FFQUFBO2dCQXJDYjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxZQUFZO3dCQUN0QixRQUFRLEVBQUUsbW1CQWVUO3dCQUNELE1BQU0sRUFBRSxDQUFDLDJUQWFSLENBQUM7cUJBQ0wsQ0FBQzs7b0NBQUE7Z0JBWUYsdUJBQUM7WUFBRCxDQVZBLEFBVUMsSUFBQTtZQVZELCtDQVVDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQzlCRDtnQkFBQTtvQkFDSSxZQUFPLEdBQVksSUFBSSxpQkFBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBZkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLGtTQVFUO3dCQUNELFVBQVUsRUFBRSxDQUFDLG9DQUFnQixDQUFDO3FCQUNqQyxDQUFDOztnQ0FBQTtnQkFHRixtQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsdUNBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNkRCxtQkFBUyxDQUFDLDRCQUFZLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7WUNKeEI7Z0JBQ0ksY0FBbUIsS0FBYSxFQUFFLFFBQWdCLEVBQUUsU0FBa0IsRUFBRSxRQUFpQjtvQkFBdEUsVUFBSyxHQUFMLEtBQUssQ0FBUTtnQkFFaEMsQ0FBQztnQkFDTCxXQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCx1QkFJQyxDQUFBIiwiZmlsZSI6Ii4uLy4uLy4uL21lYW4tYXBwL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgICBjb250ZW50OiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICB1c2VySWQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yIChjb250ZW50OiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZywgdXNlcm5hbWU/OiBzdHJpbmcsIHVzZXJJZD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLm1lc3NhZ2VJZCA9IG1lc3NhZ2VJZDtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXJJZDtcblxuICAgIH1cbn0iLCJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9jb3JlJztccmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlJztcckBDb21wb25lbnQoe1xyICAgIHNlbGVjdG9yOiAnbXktbWVzc2FnZScsXHIgICAgdGVtcGxhdGU6IGBcciAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKG1vdXNlZW50ZXIpPVwiY29sb3IgPSAncmVkJ1wiIChtb3VzZWxlYXZlKT1cImNvbG9yID0gJ3doaXRlJ1wiPlxyICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj5cciAgICAgICAgICAgICAgICB7eyBtZXNzYWdlLmNvbnRlbnQgfX1cciAgICAgICAgICAgIDwvZGl2PlxyICAgICAgICAgICAgPGZvb3Rlcj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0aG9yXCI+XHIgICAgICAgICAgICAgICAgICAgIHt7IG1lc3NhZ2UudXNlcm5hbWUgfX1cciAgICAgICAgICAgICAgICA8L2Rpdj5cciAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29uZmlnXCI+XHIgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPkVkaXQ8L2E+XHIgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCI+RGVsZXRlPC9hPlxyICAgICAgICAgICAgICAgIDwvZGl2PlxyICAgICAgICAgICAgPC9mb290ZXI+XHIgICAgICAgIDwvYXJ0aWNsZT5cciAgICBgLFxyICAgIHN0eWxlczogW2BcciAgICAgICAgLmF1dGhvciB7XHIgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHIgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XHIgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHIgICAgICAgICAgICB3aWR0aDogODAlO1xyICAgICAgICB9XHIgICAgICAgIC5jb25maWcge1xyICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHIgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHIgICAgICAgICAgICB3aWR0aDogMTklO1xyICAgICAgICB9XHIgICAgYF1ccn0pXHJccmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29tcG9uZW50IHtcciAgICBASW5wdXQoKSBtZXNzYWdlOk1lc3NhZ2U7XHJcciAgICBAT3V0cHV0KCkgZWRpdENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxyICAgIGNvbG9yID0gXCJyZWRcIjtcclxyICAgIG9uQ2xpY2soKSB7XHIgICAgICAgIHRoaXMuZWRpdENsaWNrZWQuZW1pdCgnQ2hhbmdlZCcpO1xyICAgIH1ccn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VDb21wb25lbnR9IGZyb20gJy4vbWVzc2FnZXMvbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2UnO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+ICBcbiAgICAgICAgICAgICAgICA8bXktbWVzc2FnZSBbbWVzc2FnZV09XCJtZXNzYWdlXCIgKGVkaXRDbGlja2VkKT1cIm1lc3NhZ2UuY29udGVudCA9ICRldmVudFwiPjwvbXktbWVzc2FnZT5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBkaXJlY3RpdmVzOiBbTWVzc2FnZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgICBtZXNzYWdlOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2UoJ0EgbmV3IG1lc3NhZ2UnLCBudWxsLCAnTWF4Jyk7XG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuYm9vdHN0cmFwKEFwcENvbXBvbmVudCk7IiwiZXhwb3J0IGNsYXNzIFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBmaXJzdE5hbWU/OiBzdHJpbmcsIGxhc3ROYW1lPzogc3RyaW5nKSB7XG4gICAgICAgIFxuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
