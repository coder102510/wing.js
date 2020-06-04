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
  else if (wing.findElements("p").style.display === "block") { block() }
}
```
Explanation: Get all "p" elements and toggle between hide or show. To do that same thing, do this instead:
```javascript
var button = wing.findElements("button");
button.onclick = function() {
  wing.toggleShow("p")
}
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
  <body>
    <!-- initiate an app, or the application will fail -->
    <div id="app" data-blade-app>
      <form onsubmit="wing()">
        <label for="email">Email:</label>
        <input id="#email" type="email" blade-model="email" />
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
      var app = new blade.app(/* Define a controller function */function() {
        if (isDefined(wing.findElements("form[onsubmit='wing()']"))) {
          wing.hide("#app"); 
          //create function "wing()"
          //define function wing()
          function wing() { wing.CSS.applyStyle("[data-blade-app]", "opacity", Math.random()) }
        }
        //create data to put in application with global object "$scopeData"
        $scopeData = {
          "random": Math.random()
        }
      }, /* Specify which id the data($scopeData) can be displayed in */ "app");
    </script>
  </body>
</html>
```
# There you have it! A short intro to wing.js!
