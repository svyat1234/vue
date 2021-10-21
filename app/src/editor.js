const axios = require("axios");

const DOMHelper = require("./dom-helper");
const EditorText = require("./editor-text");

require("./iframe-load");

module.exports = class Editor {
    constructor() {
        this.iframe = document.querySelector("iframe");
    }

    open(page) {
        this.currentPage = page;
        axios
            .get("../" + page)
            .then((res) => DOMHelper.parseStrToDom(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                DOMHelper.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDomToStr)
            .then((html) => axios.post("./api/saveTempPage.php", { html }))
            .then(() => this.iframe.load("../temp.html"))
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
    }


    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach((element) => {
            const id = element.getAttribute("nodeid");
            const virtualElement = DOMHelper.virtualDom.body.querySelector(`[nodeid="${id}"]`)
            new EditorText(element, virtualElement);
        })
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }


    save() {
        const newDom = DOMHelper.virtualDom.cloneNode(  DOMHelper.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDomToStr(newDom);
        axios.post("./api/savePage.php", { pageName: this.currentPage, html})
    }
}

