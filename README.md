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
To work with both wing.js and blade.js, we have provided an example:
```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="wing.css" />
  </head>
  <body>
    <div id="app" data-blade-app>
      <form onsubmit="wing()">
        <label for="email">Email:</label>
        <input id="#email" type="email" blade-model="email" />
      </form>
      {{email}}
    </div>
    <div class="tooltip" style="display:none;">
      <div class="tooltip-text"><input blade-model="name" type="text" />
        <br />
        {{name}}
      </div>
    </div>
    <script src="wing.js"></script>
    <script src="blade.js"></script>
    <script>
      var app = new blade.app(function() {
        if (isDefined(wing.findElements("form[onsubmit='wing()']"))) {
          wing.hide("#app"); 
          function wing() { wing.CSS.applyStyle("[data-blade-app]", "opacity", Math.random()) }
        }
      }, "app");
    </script>
  </body>
</html>
```
