# wing.js JavaScript Library
# Intro to wing
wing.js is a modern JS library.
The RawGit is: 
```html
<script src="https://raw.githubusercontent.com/coder102510/wing.js/master/wing.js"></script>
```
This is the minified version.
Basic code is: 
```javascript
function hide() {
  //make p elements invisible
  wing.DOM.hide("p");
}
function show() {
  //make p elements visible
  wing.DOM.show("p")
}
//search for a button in the dom
var button = Wing("button")[0];
//onclick event
button.onclick = function() {
  //conditions: if invisible show if visible hide
  if (Wing("p")[0].style.display === "none") { 
    show();
    button.html("Hide all p elements");
  }
  else if (Wing("p")[0].style.display === "block") { 
    hide();
    button.html("Show all p elements")
  }
}
//if Wing function's first parameter starts with an "" or a ".", it returns a HTMLCollection object
//if Wing function's first parameter starts with an "#", it returns a HTMLElement object
//if no conditions match it returns a NodeList object
```
Explanation: Get all "p" elements and toggle between hide or show on the click of a button. To do that same thing, do this instead:
```javascript
var button = Wing("button");
button.onclick = function() {
  wing.DOM.toggleShow(Wing("p")[0]);
}
```
# blade.js JS Framework
# Intro to blade
blade.js is a modern JS framework.
The RawGit is:
```html
<script src="https://raw.githubusercontent.com/coder102510/wing.js/master/blade.js"></script>
```
Here is a basic example:
```html
<!doctype html>
<html>
  <head>
    <!-- get wing.css stylesheet --> 
    <link rel="stylesheet" href="wing.css" />
  </head>
  <body id="bladeApp">
    <div class="card" blade-app>
      <div class="card-body bg-blue tooltip">
        Hover to see my full name!
        <div class="tooltip-text">
          <p>{{fullname}}</p>
        </div>
      </div>
    </div>
    <script>
      $(
        //define a app
        var app = new blade.app(/* define a controller */ function() {
          $scopeData = {
            "fname":"Jack",
            "lname":"Stone",
            "fullname": function() {
              return this.fname + " " + this.lname;
            }
          }
        }, /* define the id where data from $scopeData, blade-model, and blade-init can go */ "bladeApp");
      )
    </script>
  </body>
</html>
```
Now, lets break it down.
First, we download the wing.css stylesheet.
```html
<link rel="stylesheet" href="wing.css" />
```
Then we make an id for the body, or application container.
```html
<body id="bladeApp">
```
Then, we make a div element with the attribute blade-app.
```html
<div class="card" blade-app>
```
Inside, we make a wing.css tooltip with the content from the Blade JS $scopeData object.
```html
<!-- {{ }} are placeholders for blade.js data! -->
<p>{{fullname}}</p>
```
And inside the script tag, we define an app.
```javascript
var app = new blade.app(function() {
  $scopeData = {
    "fname":"Jack",
    "lname":"Stone",
    "fullname": function() {
      return this.fname + " " + this.lname;
    }
  }
}, "bladeApp");
```
The $scopeData object inside the controller function works like the Angular JS $scope object. The second parameter("bladeApp") is the id where data can be displayed. Before the app we execute the $ function. It works like a ready function. If the type of the parameter in the $ function is a function, it gets evaluated. It get evaluated even if you don't wrap the code in a function!
```javascript
//ready with parameter as nameless function
$(function() {
  console.log("ready function")
});
//or 
$(
  console.log("ready function2")
);
```
# wing.js with blade.js
It is reccomended to work with both wing.js and blade.js, so we have provided an example:
```html
<!doctype html>
<html>
  <head>
    <!-- get wing.css stylesheet -->
    <link rel="stylesheet" href="wing.css" />
  </head>
  <body id="app">
    <!-- initiate an app, or the application will fail -->
    <div id="form" class="alert" data-blade-app>
      <form onsubmit="wing()">
        <label for="email">Email:</label>
        <input id="#email" type="email" blade-model="email" />
        <input type="image" src="submit.jpg" alt="submit" width="128px" height="128px" />
      </form>
      <!--{{data goes here}} are blade.js placeholders for data  -->
      {{email}}
      <!-- wing.css tooltip -->
      <div class="tooltip" style="display:none;">
        <div class="tooltip-text"><input blade-model="name" type="text" />
          <br />
          {{name}}
        </div>
      </div>
    </div>
    <!-- $scopeData object random example -->
    <p>Status: {{random}}</p>
    <!-- get wing.js and blade.js libraries -->
    <script src="wing.js"></script>
    <script src="blade.js"></script>
    <script>
      //define an app
      var app = new blade.app(/* define a controller function */ function() {
        if (/* Check if element exists */ isDefined(Wing("form[onsubmit='wing()']"))) {
          wing.hide(Wing("#app"));
          var 
          //create function "wing()"
          //define function wing()
          wing = function() {
            var sdata = JSON.parse($scopeData);
            wing.CSS.applyStyle(Wing("[data-blade-app]"), "opacity", sdata.random) 
          }
        }
        //create data to put in application with global object "$scopeData"
        $scopeData = {
          "random": Math.random()
        }
      }, /* Specify which id the data($scopeData, blade-model, blade-init) can be displayed in */ "app");
    </script>
  </body>
</html>
```
# There you have it! A short intro to wing.js and blade.js!
