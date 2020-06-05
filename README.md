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
  wing.hide("p");
}
function show() {
  wing.show("p")
}
var button = wing.findElements("button");
button.onclick = function() {
  if (wing.findElements("p").style.display === "none") { show() }
  else if (wing.findElements("p").style.display === "block") { hide() }
}
```
Explanation: Get all "p" elements and toggle between hide or show on the click of a button. To do that same thing, do this instead:
```javascript
var button = wing.findElements("button");
button.onclick = function() {
  wing.toggleShow("p")
}
```
# blade.js JS Framework
# Intro to blade
blade.js is a modern JS framework.
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
The $scopeData object inside the controller function works like the Angular JS $scope object. The second parameter("bladeApp") is the id where data can be displayed.
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
        if (isDefined(wing.findElements("form[onsubmit='wing()']"))) {
          wing.hide("#app");
          var 
          //create function "wing()"
          //define function wing()
          function wing() {
            var sdata = JSON.parse($scopeData);
            wing.CSS.applyStyle("[data-blade-app]", "opacity", sdata.random) 
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
# There you have it! A short intro to wing.js!
