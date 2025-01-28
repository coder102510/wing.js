var elems = document.getElementsByTagName("*"), 
    application = undefined, 
    i = 0, 
    l = elems.length;
for (var i = 0; i < l; i++) {
    application = elems[i];
    if (application.hasAttributes("blade-app") || application.hasAttributes("data-blade-app")) {
        const nl = document.querySelectorAll("[data-blade-app]") || document.querySelectorAll("[blade-app]"), l = nl.length;
        if (l === 1) {
            var blade = {};
            //create controller and app
            blade.app = function(controller, app) {
                this.controller = controller;
                this.app = app;
                if (this.controller != undefined
                   && this.controller != null
                   && typeof this.controller === "function") {
                    this.controller();
                } else {
                    throw "The BladeJS controller needs to be defined.";
                }
                var i = 0, l = application.childNodes.length;
                for (; i < l; i++) {
                    if (application.childNodes[i].hasAttributes("blade-init")) {
                        let data = application.childNodes[i].getAttribute("blade-init");
                        if (data.match(keypattern)) {
                            var split1 = function() {
                                return data.split("=")[1];
                            }, 
                                split2 = function() {
                                    return data.split("=")[2];
                            }, split3 = function() {
                                return data.split(";")[0];
                            },
                                key = data.substring(split1(), split3()),
                                val = data.substring(split3(), split2()),
                                keyvalpair = "key=" + key + ";" + "value=" + val;
                            if (data = keyvalpair) {
                                blade.data(this.dataplace, {"data": [key,val]);
                            }
                        }
                    } if (application.childNodes[i].hasAttribute("blade-model")) {
                        if (blade.lowercase(application.childNodes[i].tagName) === "input") {
                            blade.data(this.dataplace, {application.childNodes[i].getAttribute("blade-model"): application.childNodes[i].value})
                        } else {
                            throw "The element with the attribute blade-model needs to be an \"input\" tag.";
                        }
                    }
                }
                let s = document.scripts,
                    j = 0,
                    sl = s.length;
                for (; j < sl;) {
                    var innerJS = s[i].innerHTML;
                    if (application.hasAttributes("blade-app") || application.hasAttributes("data-blade-app")) {
                        innerJS();
                    } else {
                       var toStr = innerJS.toString();
                       innerJS = toStr;
                    }
                }
            }
            //end "create app and controller" 


            //init scope data    
            var $scopeData = {}, i;
            for (i in $scopeData) {
                blade.data(i:i[$scopeData])
            }
            //end init scope data     

            //exerpt from w3.js script
            var dataObject = {};
            blade.data = function (id, data) {
                getElementsByAttribute = function (x, att) {
                    var arr = [], arrCount = -1, i, l, y = x.getElementsByTagName("*"), z = att.toUpperCase();
                    l = y.length;
                    for (i = -1; i < l; i += 1) {
                      if (i == -1) {y[i] = x;}
                      if (y[i].getAttribute(z) !== null) {arrCount += 1; arr[arrCount] = y[i];}
                    }
                    return arr;
                  }    
                  var htmlObj, htmlTemplate, html, arr = [], a, l, rowClone, x, j, i, ii, cc, repeat, repeatObj, repeatX = "";
                  htmlObj = document.getElementById(id);
                  htmlTemplate = c_template(id, htmlObj);
                  html = htmlTemplate.cloneNode(true);
                  arr = getElementsByAttribute(html, "blade-repeat");
                  l = arr.length;
                  for (j = (l - 1); j >= 0; j -= 1) {
                    cc = arr[j].getAttribute("w3-repeat").split(" ");
                    if (cc.length == 1) {
                      repeat = cc[0];
                    } else {
                      repeatX = cc[0];
                      repeat = cc[2];
                    }
                    arr[j].removeAttribute("blade-repeat");
                    repeatObj = data[repeat];
                    if (repeatObj && typeof repeatObj == "object" && repeatObj.length != "undefined") {
                      i = 0;
                      for (x in repeatObj) {
                        i += 1;
                        rowClone = arr[j];
                        rowClone = replace_curly(rowClone, "element", repeatX, repeatObj[x]);
                        a = rowClone.attributes;
                        for (ii = 0; ii < a.length; ii += 1) {
                          a[ii].value = replace_curly(a[ii], "attribute", repeatX, repeatObj[x]).value;
                        }
                        (i === repeatObj.length) ? arr[j].parentNode.replaceChild(rowClone, arr[j]) : arr[j].parentNode.insertBefore(rowClone, arr[j]);
                      }
                    } else {
                      console.log("blade-repeat must be an array. " + repeat + " is not an array.");
                      continue;
                    }
                  }
                  html = replace_curly(html, "element");
                  htmlObj.parentNode.replaceChild(html, htmlObj);
                  function c_template(id, obj) {
                    var template;
                    template = obj.cloneNode(true);
                    if (dataObject.hasOwnProperty(id)) {return dataObject[id];}
                    dataObject[id] = template;
                    return template;
                  }
                  function replace_curly(elmnt, typ, repeatX, x) {
                    var value, rowClone, pos1, pos2, originalHTML, lookFor, lookForARR = [], i, cc, r;
                    rowClone = elmnt.cloneNode(true);
                    pos1 = 0;
                    while (pos1 > -1) {
                      originalHTML = (typ == "attribute") ? rowClone.value : rowClone.innerHTML;
                      pos1 = originalHTML.indexOf("{{", pos1);
                      if (pos1 === -1) {break;}
                      pos2 = originalHTML.indexOf("}}", pos1 + 1);
                      lookFor = originalHTML.substring(pos1 + 2, pos2);
                      lookForARR = lookFor.split("||");
                      value = undefined;
                      for (i = 0; i < lookForARR.length; i += 1) {
                        lookForARR[i] = lookForARR[i].replace(/^\s+|\s+$/gm, ''); //trim
                        if (x) {value = x[lookForARR[i]];}
                        if (value == undefined && data) {value = data[lookForARR[i]];}
                        if (value == undefined) {
                          cc = lookForARR[i].split(".");
                          if (cc[0] == repeatX) {value = x[cc[1]]; }
                        }
                        if (value == undefined) {
                          if (lookForARR[i] == repeatX) {value = x;}
                        }
                        if (value == undefined) {
                          if (lookForARR[i].substr(0, 1) == '"') {
                            value = lookForARR[i].replace(/"/g, "");
                          } else if (lookForARR[i].substr(0,1) == "'") {
                            value = lookForARR[i].replace(/'/g, "");
                          }
                        }
                        if (value != undefined) {break;}
                      }
                      if (value != undefined) {
                        r = "{{" + lookFor + "}}";
                        if (typ == "attribute") {
                          rowClone.value = rowClone.value.replace(r, value);
                        } else {
                          w3_replace_html(rowClone, r, value);
                        }
                      }
                      pos1 = pos1 + 1;
                    }
                    return rowClone;
                  }
                  function replace_html(a, r, result) {
                    var b, l, i, a, x, j;
                    if (a.hasAttributes()) {
                      b = a.attributes;
                      l = b.length;
                      for (i = 0; i < l; i += 1) {
                        if (b[i].value.indexOf(r) > -1) {b[i].value = b[i].value.replace(r, result);}
                      }
                    }
                    x = a.getElementsByTagName("*");
                    l = x.length;
                    a.innerHTML = a.innerHTML.replace(r, result);
                  }
             }
            //end exerpt from w3.js script

            //bladeJS API
            blade.uppercase = function(obj) {
                if (typeof obj === "string") {
                    return obj.toUpperCase();
                } else {
                    throw "The \"obj\" parameter has to be a string.";
                }
            }
            blade.lowercase = function(obj) {
                if (typeof obj === "string") {
                    return obj.toLowerCase();
                } else {
                    throw "The \"obj\" parameter has to be a string.";
                }
            }
            blade.isString = function(obj) {
                if (typeof obj === "string") {
                    return true;
                } else {
                    return false;
                }
            }
            blade.isNumber = function(obj) {
                if (typeof obj === "number") {
                    return true;
                } else {
                    return false;
                }
            }
            blade.isDefined = function(obj) {
                if (obj) {
                    return true;    
                } else {
                    return false;
                }
            }
            blade.toCurrency = function(elm, amount, ctype) {
                //exerpt from stack overflow
                String.prototype.replaceAt = function(index, replacement) {
                    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
                }
                //end exerpt from stack overflow
                if (ctype==="$") {
                    amount.replaceAt(amount.length - 2, ".");
                }
                document.querySelectorAll(elm).insertAdjacentHTML("beforeBegin", ctype + amount);
            }
            function forEach(nodelist, func) {
                nodelist.forEach(func)
            }
            //end bladeJS api

            //promise init    
            var init_promise = function(code) {
                return new Promise((resolve) => {
                    resolve(code);
                });
            };
            //end promise init

            // blade.ajax functions    
            var xml = function() {
                if (window.XMLHttpRequest) { return new XMLHttpRequest() }
                else { return new ActiveXObject("Microsoft.XMLHTTP") }
            }, response;
            blade.fetchFile = async function(url, options) {
                options = options||{};
                var prom = await init_promise(function() {
                    response=new xml();
                    xml.prototype.response = this.responseText;
                    xml.prototype.xml = this.responseXML;
                    xml.prototype.json = function() { return JSON.parse(this.responseText) }
                    xml.prototype.ready = this.readyState;
                    xml.prototype.status = this.status;
                    xml.prototype.statusText = this.statusText;
                    if (options) {
                        if (options.method&&options.async&&options.data) {
                            if (options.setCSP) {
                                var csp = document.createElement("meta");
                                csp.setAttribute("http-equiv", "Content-Security-Policy");
                                csp.setAttribute("content", options.setCSP);
                            } if (options.setScriptNonce) {
                                var scripts = document.scripts, 
                                    i = 0, 
                                    l = scripts.length;
                                for (; i < l; i++) {
                                    scripts[i].setAttribute("nonce", options.setScriptNonce);
                                }
                            } if (options.JS) {
                                if (options.JS === true) { this.responseText() }
                                else { console.error("You are using the wrong property."); }
                            }
                            xhttp.open(options.method, url, options.async);
                            xhttp.send(options.data);
                        } else {
                            throw "You have the wrong properties.";
                        }
                    } else {
                        xhttp.open("GET", url, true);
                        xhttp.send(undefined);
                    }
                });
                prom();
                return prom;
            }
            //end blade.ajax functions
        } else {
            throw "There can only be one blade-app or data-blade-app attribute in the document.";
        }
    } else {
        throw "In order for BladeJS to work, you need the blade-app or the data-blade-app attribute.";
    }
}
