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
  <body>
    <div id="app" data-blade-app>
      <form onsubmit="wing()">
        <label for="text">Example Page Input Text:</label>
        <input id="#text" type="text" blade-model="text" />
      </form>
      {{text}}
    </div>
    <script src="wing.js"></script>
    <script src="blade.js"></script>
    <script>
      var app = new blade.app(function() {
        wing.hide("div")
      }, "app");
    </script>
  </body>
</html>
```
