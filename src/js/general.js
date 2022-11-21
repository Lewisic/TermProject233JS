const Owlbot = require('owlbot-js');
const token = '34c41aabe34a273f226d13afde510740491536b3';

class Definition
{
    constructor() {
        this.client = Owlbot(token);
        if (!localStorage["DEFINITION"]) {
            this.dictionary = {
                word: "Baseball",
                Image: "./images/Example.png",
                definition: "the hard ball used in the game of baseball.",
                sentence: "His fame is rooted in his extraordinary ability to hit baseballs where fielders could not catch them."
            }
        }
        else {
            this.dictionary = JSON.parse(localStorage["DEFINITION"]);
        }
        this.fillDictionary(this.dictionary);
        document.getElementById("form").onsubmit = this.addDictionary.bind(this);
    }

    generateDefinitionHtml(dictionary){
        return `
        <div class="row pt-4 mx-auto" style="width: 500px;">
                <div class="col-sm-3 border border-2 border-dark" style="height: 110px;">
                    <img src="${dictionary.Image}" class="img-fluid p-2">
                </div>
                <!--This is empty to make the next column look better on the book image -->
                <div class="col-sm-3 border border-2 border-start-0 border-end-0 border-dark"></div>
                <div class="col-sm-6 border border-2 border-start-0 border-dark d-flex align-items-center"
                    style="height: 110px;">
                    <p class="word mx-auto">${dictionary.word}</p>
                </div>
                <div class="col-sm-12 border border-2 border-top-0 border-dark" style="height: 100px;">
                    <span class="word2">Definition:</span>
                    <p class="d-flex align-items-center">${dictionary.definition}</p>
                </div>
                <div class="col-sm-12 border border-2 border-top-0 border-dark " style="height: 100px;">
                    <span class="word2">Example Sentence:</span>
                    <p class="d-flex align-items-center">${dictionary.sentence}</p>
                </div>
            </div>
        `;
    }

    fillDictionary() {
        localStorage["DEFINITION"] = JSON.stringify(this.dictionary);
        let dictionaryHtml = this.generateDefinitionHtml(this.dictionary);
        document.getElementById("definition").innerHTML = dictionaryHtml;
    }

    resetDictionary() {
        document.getElementById("definition").innerHTML = "";
    }

    addDictionary(event) {
        event.preventDefault();
        const defineWord = document.getElementById("word").value;
        this.client.define()
            .then(response => response.json())
            .then(data => {
                const dictionary = {
                    word: defineWord,
                    image: data.definitions.image_url,
                    definition: data.definitions.definition,
                    sentence: data.definitions.example
                };
                this.resetDictionary();
                this.fillDictionary(dictionary);
            })
            .catch(error => {
                console.log('There was a problem getting info!');
            }); 
    }
}

let dictionary;
window.onload = () => {dictionary = new Definition}