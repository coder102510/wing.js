export var wing = {};
wing.dom = {};
wing.xhr = {};
wing.ui = {};
wing.css = {};
export {
    wing.dom as dom,
    wing.xhr as xhr,
    wing.ui as ui,
    wing.css as css
}
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
