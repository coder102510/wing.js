var wing = {};
wing.dom = {};
wing.xhr = {};
wing.ui = {};
wing.css = {};
wing.dom.createDom = (element, css, innerhtml) => {
    const elem = document.createElement(element);
    wing.css.Css(elem, css);
    elem.innerHTML = innerhtml;
    document.body.appendChild(elem);
}
wing.dom.getDom = element => {
    const elem = document.querySelectorAll(element);
    if (typeof(elem) === "undefined" || elem === null) { 
        const elm = wing.dom.createDom(element, undefined, undefined);
        return elm;
    } if (typeof element === "object") { return [element] }
    else { return elem; }
}
wing.dom.render = (element, newhtml) => {
    element.innerHTML += newhtml;
}
wing.dom.html = (element, newhtml) => {
    if (newhtml === undefined) {
        return element.innerHTML
    } else {
        element.innerHTML = newhtml;
    }
}
wing.css.Css = (element, cssobj) => {
    if (typeof cssobj === "object") {
        let i;
        for (i in cssobj) {
            element.style[i.toString()] = cssobj[i];
        }
    }
}
let xml = () => {
    if (window.XMLHttpRequest) { return new XMLHttpRequest() }
    else { return new ActiveXObject("") }
}, init_promise = (res, rej) => new Promise((resolve, reject) => {
    resolve(res);
    reject(rej);
}), xhr;
wing.xhr.request = async (url, options) => {
    var prom = await init_promise(() => {
        xhr=new xml();
        xml.prototype.data = this.responseText;
        xml.prototype.xml = this.responseXML;
        xml.prototype.json = JSON.parse(this.responseText);
        xml.prototype.ready = this.readyState;
        xml.prototype.status = this.status;
        xml.prototype.statusText = this.statusText;
        if (options) {
            if (options.method && options.async && options.data) {
                if (options.setCSP) {
                    var csp = document.createElement("meta");
                    csp.setAttribute("http-equiv", "Content-Security-Policy");
                    csp.setAttribute("content", options.setCSP);
                    document.head.appendChild(csp);
                } if (options.setScriptNonce) {
                    var scripts = document.scripts, 
                        i = 0, 
                        l = scripts.length;
                        for (; i < l; i++) {
                            scripts[i].setAttribute("nonce", options.setScriptNonce);
                        }
               } if (options.JS) {
                   if (options.JS === true) { 
                       void function() {
                           xhr.responseText;
                       }();
                   } else { throw "You are using the wrong property."; }
               }
               xhr.open(options.method, url, options.async);
               xhr.send(options.data);
            } else {
                throw "You have the wrong properties.";
            }
        } else {
            xhr.open("GET", url, true);
            xhr.send(undefined);
        }
    }, new Error("XHR error."))
    .then(value => { value() }, 
          error => { throw error })
    return prom;
}
let json;
wing.xhr.getJSON = (file, options) => {
    return wing.xhr.request(file, options).then(value => {
        json = JSON.parse(xhr.data);
        value = json;
        return value;
    });
}
wing.xhr.script = (jsfile, options) => {
    return wing.xhr.request(jsfile, options).then(value => {
        value;
    })    
}
wing.ui.container = element => {
    const cont = "container";
    if (element.classList.contains(cont)) {
        element.style.paddingTop = "10px";
        element.style.paddingBottom = "10px";
        element.style.paddingLeft = "16px";
        element.style.paddingLeft = "16px";
    }
}
wing.ui.hide = element => {
    element.style.display = "none";
}
wing.ui.show = element => {
    element.style.display = "block";
}
wing.ui.toggleView = element => {
    if (element.style.display === "block") { wing.ui.hide(element) }
    if (element.style.display === "none") { wing.ui.show(element) }
}

/* standard object new prototype methods */

Array.prototype.all = function() { Promise.all(this) }
Object.prototype.all = function() { Promise.all([this]).then(value => value[0]) }
Function.prototype.all = function() { return Promise.all([this]).then(value => value[0]) }
var iterable, object, array;
Object.prototype.each = function(func) {
    object = this;
    for (iterable in object) {
        func();
    }
}
Array.prototype.each = function(func) {
    array = this;
    for (iterable of array) {
        func();
    }
}
let initgetsetobj = function(obj, prop)  {
    this.set = value => {
        obj[prop.toString()] = value;
    }
}
Object.prototype.get = function(property) {
    return new initgetsetobj(this, property)
}
Array.prototype.getUptill = function(index1, index2) {
    let arr = [], i = index1;
    arr.push(this[index1]);
    for (; i <= index2; i++) {
      	if (i === index1) {
          	continue;
        } if (this[i] === undefined) {
        	throw new Error("One of the array indexes specified is equal to undefined.");	  
          	return;
        } else {
        	arr.push(this[i]);
        }
    }
    return arr;
}
wing.object = {};
wing.object.create = obj => {
  	  if (typeof obj === "object") {
      	return obj;
      } else {
        return new Object(obj);
      }
}
wing.array = {};
wing.array.create = array => {
    if (Array.isArray(array)) {
        return array;
    } else {
        throw new TypeError("The 'Array' parameter needs to be an array")
    }
}
wing.function = {};
wing.function.create = func => {
    if (typeof func === "function") {
        return func;
    } else {
        throw new TypeError("The 'Func' parameter needs to be a function.");
    }
}

const arrproto = Array.prototype, 
      objproto = Object.prototype,
      funcproto = Function.prototype;

export default wing;
export {
    wing.dom as dom,
    wing.css as css, 
    wing.xhr as xhr,
    wing.ui as ui,
    wing.object as object,
    wing.array as array,
    wing.function as functions
}

// second export for prototype methods

export {
    arrproto as arrayPrototype,
    objproto as objectPrototype,
    funcproto as functionPrototype
}
