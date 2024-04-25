const axios = require("axios");

const lotrUrl = "https://the-one-api.dev/v2";
const lotrKey = process.env.LOTR_API_KEY;

//create custom axios instance for lotr api
lotrAxios = axios.create({
  baseURL: lotrUrl,
  headers: {
    Authorization: "Bearer " + lotrKey,
  },
});
exports.getLotr = async (req, res, next) => {
  const lotr_response = await lotrAxios.get("movie");
  movies = lotr_response.data.docs.slice(-3);
  console.log(movies);
  res.render("external-api", {
    pageTitle: "LOTR",
    path: "/lotr",
    movies: movies,
    quote: null,
  });
};

exports.getRandomQuote = async (req, res, next) => {
  const moviesResponse = await lotrAxios.get("movie");
  movies = moviesResponse.data.docs.slice(-3);
  const movieId = req.body.movieId;

  //get a random quote for the selected movie
  const quotesResponse = await lotrAxios.get("/movie/" + movieId + "/quote");
  const quotes = quotesResponse.data.docs;
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //get character name
  if (randomQuote && randomQuote.character) {
    console.log('CHARACTER FOUND', randomQuote.character)
    const characterId = randomQuote.character;
    const characterResponse = await lotrAxios.get("/character/" + characterId);
    const characterName = characterResponse.data.docs[0].name;
    console.log('CHARACTER NAME: ', characterName)
  //render the external-api page with movies, quote and character
  res.render("external-api", {
    pageTitle: "LOTR",
    path: "/lotr",
    movies: movies,
    quote: randomQuote.dialog,
    character: characterName,
  });
} else {
    console.log('character not found')
    res.redirect('/lotr');
  }
};
