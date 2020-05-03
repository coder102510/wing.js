/* Minified wing.js library | Based on w3.js JS library | wing.js created by Eshanth B.G */
"use strict" var wing = {}; wing.hide = function(elm) {wing.hideElms(wing.findElements(elm));} wing.hideElm = function(elm) {wing.elementStyle(elm, "display", "none");} wing.hideElms = function(elm) {var i, l = elm.length; for(i = 0; i < l; i++) {wing.hideElm(elm[i]);}} wing.show = function(elm, a) {var elements = wing.findElements(elm); if (a) {wing.hideElms(elm)}; wing.showElms(elm);} wing.showElm = function(elm) {wing.elementStyle(elm, "display", "block");} wing.showElms = function(elm) {var i, l = elm.length; for (i = 0; i < l; i++) {wing.showElm(elm[i]);}} wing.applyStyle = function(elm, p, v) {wing.style(wing.findElements(elm), p, v);} wing.applyStyles = function(elm, p, v) {var i, l = elm.length; for (i = 0; i < l; i++) {wing.applyStyleElm(elm[i], p, v);}} wing.applyStyleElm = function(elm, p, v) {elm.style.setProperty(p, v);} wing.toggleView = function(elm) {var i, x = wing.findElements(elm), l = x.length; for (i = 0; i < l; i++) {if (x[i] == "none"){wing.applyStyleElm(elm, "display", "block")} else (x[i] == "none") {wing.applyStyleElm(elm, "display", "block");}}} wing.applyClass = function(elm, cname) {wing.applyClassElms(wing.findElements(elm), name);} wing.applyClassElms = function(elm, cname) {var i, l = elm.length; for (i = 0; i < l; i++) {wing.applyClassElm(elm[i], cname);}} wing.applyClassElm = function(elm, cname) {var i, a, b; a = elm.className.split(" "); b = cname.split(" "); for (i = 0; i < b.length ; i++) {if (a.indexOf(b[i] == -1) {elm.className += " " +b[i];}}} wing.detachClass = function(elm, cname) {wing.detachClassElms(wing.findElements(elm), cname);} wing.detachClassElms = function (elm, cname) {var i, l = elements.length, a, b, j; for (i = 0; i < l; i++) {wing.detachClassElm(elements[i], name);}} wing.detachClassElm = function (elm, cname) {var i, a, b; a = element.className.split(" "); b = cname.split(" "); for (i = 0; i < b.length; i++) {while (a.indexOf(b[i]) > -1) {a.splice(a.indexOf(arr2[i]), 1);}} element.className = a.join(" ");} wing.toggleClass = function(elm, a, b) {wing.toggleClassElms(wing.findElements(elm), a, b);} wing.toggleClassElms = function(elm, a, b) {wing.toggleClassElm(wing.findElements(elm), a, b);} wing.toggleClassElm = function (element, a, b) {var c, d, cArr, dArr, j, e, allPresent; c = (c1 || ""); d = (c2 || ""); cArr = c.split(" "); dArr = d.split(" "); e = element.className.split(" "); if (dArr.length == 0) {allPresent = true; for (j = 0; j < cArr.length; j++) {if (e.indexOf(cArr[j]) == -1) {allPresent = false;}} if (allPresent) {wing.detachClassElm(element, c);} else {wing.applyClassElm(element, d);}} else {allPresent = true; for (j = 0; j < cArr.length; j++) {if (e.indexOf(cArr[j]) == -1) {allPresent = false;}} if (allPresent) {wing.detachClassElm(element, c); wing.applyClassElm(element, d); } else {wing.detachClassElm(element, d); wing.applyClassElm(element, c);}}} wing.findElement = function(elm) {if (typeof elm == "object"){return[elm];} else {return document.querySelector(elm);}} wing.findElements = function(elm) {if (typeof elm == "object") {return [elm]} else {return document.querySelectorAll(elm)}} wing.selectById = function(iname) {document.getElementById(iname);} wing.selectByClass = function(cname) {document.getElementsByClassName(cname);} wing.selectByTagName = function(tname) {document.getElementsByTagName(tname);} wing.selectByName = function(name) {document.getElementsByName(name);} wing.Interval = function(func, time) {setInterval(func, time);} wing.Timeout = function(func, time) {setTimeout(func, time)} wing.findHttpData = function(file, func) {wing.Http(file, function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText);} else {document.write("Server request failed.");}}} wing.findHttpObject = function(file, func) {wing.Http(file, function() {if (this.readyState == 4 && this.status == 200) {func(JSON.parse(this.responseText));} else {document.write("Server request failed.");}}} wing.Http = function(method, target, data, readyfunc) {var httpr; if (!method) {method = "GET"} if (window.XMLHttpRequest) {httpr = new XMLHttpRequest();} if (window.ActiveXObject) {httpr = new ActiveXObject("Microsoft.XMLHttp")}if (readyfunc) {httpr.onreadystatechange = readyfunc;} else {document.write("Error");} if (httpr) {httpr.open(method, target, true); httpr.send(data);}} wing.JSON.toJS = function(item) {JSON.parse(item);} wing.JSON.toJSON = function(item) {JSON.stringify(item);} wing.openStream = function() {document.open();} wing.write = function(txt) {document.write(txt);} wing.closeStream = function() {document.close();} wing.createAttr = function(elm, attr, val) {var att = document.createAttribute(attr); att.value = val; elm.setAttributeNode(att);} wing.setAttr = function(elm, attr, val) {elm.setAttribute(attr, val);} wing.normal = function(elm) {elm.normalize();} wing.addEvent = function(event, func) {addEventListener(event, func);} wing.removeEvent = function(event, func) {removeEventListener(event, func);} wing.changeAnimation = function(elm, a) {elm.style.animation = a;}
