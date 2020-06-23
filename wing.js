var wing = {};
wing.dom = {};
wing.xhr = {};
wing.ui = {};
wing.css = {};
wing.dom.createDom = (element, css, innerhtml) => {
    wing.dom.createDomElements(element, css, innerhtml);
}
wing.dom.createDomElements = (element, css, innerhtml) => {
    const elem = document.createElement(element);
    wing.css.setStyle(elem, css);
    elem.innerHTML = innerhtml;
    document.body.appendChild(elem);
    return elem;
}
wing.dom.getDom = (element) => {
    const elem = document.querySelectorAll(element);
    if (!elem) { 
        const elm = wing.dom.createDom(element, undefined, undefined);
        return elm;
    }
    if (typeof element === "object") { return [element] }
    else { return elem; }
}
wing.dom.render = (element, newhtml) => {
    const elem = wing.dom.getDom(element);
    elem.innerHTML += newhtml;
}
wing.css.setStyle = function(element, cssobj) {
    const elm = wing.dom.getDom(element);
    if (typeof cssobj === "object") {
        let i;
        for (i in cssobj) {
            elm.style[i.toString()] = cssobj[i];
        }
    }
}
let xhr;
wing.xhr.XHR = (url) => {
    let xmlhttp = await new Promise((resolve, reject) => {
        resolve(function() {
           xhr = new XMLHttpRequest();
           xhr.open("get", url, true);
           xhr.send()
        });
        reject(new Error("XHR failure."))
    }).then((value) => { 
        value()
    }, (error) => { 
        throw error;
    })
    return xmlhttp;
}
wing.ui.container = (element) => {
    var elm = wing.dom.getDom(element), cont = /container/i;
    if (elm.className.match(cont)) {
        elm.style.paddingTop = "10px";
        elm.style.paddingBottom = "10px";
        elm.style.paddingLeft = "16px";
        elm.style.paddingLeft = "16px";
    }
}
