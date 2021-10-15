const Vue = require("vue")
const axios = require("axios")

new Vue({
    el: "#app",
    data: {
        "pageList": [],
        "newPageName": ""
    }, 
    methods: {
        createPage() {
            axios
            .post("./api/createNewHtmlPage.php", {"name": this.newPageName})
            .then(response => console.log(response))
        }
    },
    created() {
        axios
            .get("./api/")
            .then((response) => {
                this.pageList = response.data
            })
    },
})