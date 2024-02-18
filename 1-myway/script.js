let $ = document;
let inpWordEl = $.querySelector("#inp-word");
let searchBtn = $.querySelector("#search-btn");
let result = $.querySelector("#result");
let wordH3El = $.querySelector(".word h3");
let phoneticEl = $.querySelector("#phonetic");
let partOfSpeech = $.querySelector("#partOfSpeech");
let wordMeaning = $.querySelector(".word-meaning");
let audioEl = $.querySelector(".audio");
let resultEl = $.querySelector("#result");
let wordExample = $.querySelector(".word-example");

searchBtn.addEventListener("click", (e) => {
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + inpWordEl.value)
    .then((res) => res.json())
    .then((data) => {
      wordH3El.innerHTML = data[0].word;
      phoneticEl.innerHTML = data[0].phonetic;
      partOfSpeech.innerHTML = data[0].meanings[0].partOfSpeech;
      wordMeaning.innerHTML = "";
      wordMeaning.innerHTML = data[0].meanings[0].definitions[1].definition;
      let fetchedAudio = new Audio(data[0].phonetics[2].audio);
      audioEl.addEventListener("click", (e) => {
        fetchedAudio.play();
      });
      wordExample.innerHTML =  data[0].meanings[0].definitions[1].example || "";
    })
    .catch((err) => {
      resultEl.innerHTML = `<h1 class="error">could not find the word</h1>`
      return false
    });
});
