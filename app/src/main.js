const Editor = require("./editor");
const Vue = require("vue");
const UIkit = require("uikit");

window.editor = new Editor()

window.onload = () => {
    window.editor.open("index.html");
}


new Vue({
    el: "#app",
    methods: {
        onBtnSave() {
            console.log("fdsf")
        }
    }
})






// const Vue = require("vue")
// const axios = require("axios")

// new Vue({
//     el: "#app",
//     data: {
//         "pageList": [],
//         "newPageName": ""
//     }, 
//     methods: {
//         createPage() {
//             axios
//             .post("./api/createNewHtmlPage.php", {"name": this.newPageName})
//             .then(() => this.updatePageList())
//         },
//         updatePageList() {
//             axios
//             .get("./api/")
//             .then((response) => {
//                 this.pageList = response.data
//             })
//         },
//         deletePage(page) {
//             axios
//                 .post("./api/deletePage.php", {"name": page})
//                 .then(() => this.updatePageList())
//         }
//     },
//     created() {
//         this.updatePageList();
//     },
// })