console.log("Let's get this party started!");


class GiphyApp {

  constructor(apiKey) {
      this.apiKey = apiKey;
      this.gifForm = $('#gif-form');
      this.gifContainer = $('#gif-container');
      this.removeGifsButton = $('#remove-gifs');
      this.setupEventListeners();
  }

  setupEventListeners() {

      this.gifForm.on('submit', (e) => {
          e.preventDefault();
          this.searchGif();
      });

      this.removeGifsButton.on('click', () => {
          this.removeGifs();
      });
  }

  async searchGif() {

      const searchTerm = $('#search-term').val();
      const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${this.apiKey}`;

      try {
          const response = await $.ajax({
              url: apiUrl,
              method: 'GET',
          });

          const randomIndex = Math.floor(Math.random() * response.data.length);
          const gifUrl = response.data[randomIndex].images.fixed_height.url;

          this.displayGif(gifUrl);
      } catch (error) {
          console.error('Error fetching data from Giphy API:', error);
      }
  }

  displayGif(gifUrl) {
      const gifImage = $('<img>');
      gifImage.attr('src', gifUrl);
      this.gifContainer.append(gifImage);
  }

  removeGifs() {
      this.gifContainer.empty();
  }
}

$(document).ready(function () {
  // Initialize the application with your API key
  const apiKey = 'zKrgBAOldBenFol0VlKwCxD0QVcoI10a';
  const giphyApp = new GiphyApp(apiKey);
});
