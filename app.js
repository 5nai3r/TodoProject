var todoApp = angular.module ('todo',[])

todoApp.directive('ngBlur',function () {
	return function (scope, elem, attrs) {
	  elem.bind('blur',function() {
	  	scope.$apply(attrs.ngBlur)
	  })
	}
})

todoApp.controller ('todoCtrl', function ($scope,filterFilter,$location) {
	var app = $scope;
	var lct = $location;
	app.arrayname = 'project';
	app.path = $location.path();
    if (app.path =='') {app.path = "/"};
    var todosarray =[
  {
    "completed": false,
    "name": "This is Project Example",
    "todos": [
      {
        "completed": false,
        "todo": "And Here Is todo for the Preject"
      },
      {
        "completed": true,
        "todo": "2nd Todo and this is completed "
      }
    ]
  }
];
	if (localStorage.getItem(app.arrayname)==null) {localStorage[app.arrayname] = JSON.stringify(todosarray);};
				app.todos = localStorage.getItem(app.arrayname);
				app.todos = JSON.parse(app.todos);

	app.removeTodo = function (index) {
		app.todos.splice(index,1);
	}
	app.removeTodoprjct = function (parentindex , index) {
		app.todos[parentindex].todos.splice(index,1);

	}
	app.$watch("todos",function(){
		localStorage["project"] = JSON.stringify(app.todos);
		app.remaining = filterFilter(app.todos, {completed:false,}).length;
		app.allCheck = !app.remaining;
	},true);
	app.addTodo = function() {
		if (app.newTodo != "") {app.todos.push({name:app.newTodo,completed:false,todos:[]});};
		app.newTodo = "";
	}
	app.addPrjctTodo = function(parentindex,name) {
		if (name != "") {app.todos[parentindex].todos.push({todo:name,completed:false});};
		app.prjctTodo  = "";
	}
	app.checkF = function(x){
		app.todos.forEach(function(todo) {
			todo.completed=x;
		})
	}
	app.editTodo = function(todo) {
		todo.editing = true;
		console.log(todo)
	}
	app.blurTodo = function(todo) {
	   todo.editing = false;
	   console.log(todo)
	   
	}
	app.visibleChilde = function (a) {
		if (a.currentTarget.className =="destroy more fa fa-chevron-circle-down") {a.currentTarget.className ="destroy more fa fa-chevron-circle-up"} else{a.currentTarget.className ="destroy more fa fa-chevron-circle-down"}; 
		a = a.currentTarget.parentNode.parentNode
		if (a.childNodes[5].style.display == "block") {a.childNodes[5].style.display = "none"} else{a.childNodes[5].style.display = "block";};
	}
	app.showtodo = function (x) {
		if (x.currentTarget.parentNode.className == "addtodo") {x.currentTarget.parentNode.className = "addtodo ok"} else{x.currentTarget.parentNode.className = "addtodo"};
		if (x.currentTarget.className == "fa fa-plus-circle") {x.currentTarget.className = "fa fa-times-circle"} else{x.currentTarget.className = "fa fa-plus-circle"};
	
	}
});

