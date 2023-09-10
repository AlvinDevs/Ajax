$(document).ready(function () {
  
  class TVMazeApp {
    constructor() {
      this.showsList = $('#showsList');
      this.episodesArea = $('#episodesArea');
      this.searchForm = $('#searchForm');

      this.searchForm.on('submit', (e) => {
        e.preventDefault();
        this.searchForShowAndDisplay();
      });
    }

    async searchForShowAndDisplay() {
      console.log('searchForShowAndDisplay called');
      const term = $('#searchForm-term').val();
      const shows = await this.getShowsByTerm(term);
    
      this.episodesArea.hide();
      this.populateShows(shows);
    }
    

    async getShowsByTerm(term) {
      console.log('getShowsByTerm called');
      const apiUrl = `http://api.tvmaze.com/search/shows?q=${term}`;
      try {
        const response = await $.ajax({
          url: apiUrl,
          method: 'GET',
        });

        const formattedShows = response.map((result) => {
          const show = result.show;
          return {
            id: show.id,
            name: show.name,
            summary: show.summary,
            image: show.image ? show.image.medium : 'https://tinyurl.com/tv-missing',
          };
        });

        return formattedShows;
      } catch (error) {
        console.error('Error fetching data from TV Maze API:', error);
        return [];
      }
    }

    async getEpisodesOfShow(showId) {
      console.log('getEpisodesOfShow called');
      const apiUrl = `http://api.tvmaze.com/shows/${showId}/episodes`;
      try {
        const response = await $.ajax({
          url: apiUrl,
          method: 'GET',
        });

        // Process and format the episodes data
        const formattedEpisodes = response.map((episode) => {
          return {
            id: episode.id,
            name: episode.name,
            season: episode.season,
            number: episode.number,
            summary: episode.summary,
            image: episode.image ? episode.image.medium : 'https://tinyurl.com/tv-missing',
          };
        });

        // call a function to display them
        this.displayEpisodes(formattedEpisodes);

        return formattedEpisodes;
      } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
      }
    }

    // Add a function to display episodes
    displayEpisodes(episodes) {
      console.log("displayEpisodes called");
      const episodesList = $('#episodesList');
      episodesList.empty();

      for (let episode of episodes) {
        const $episode = $(`
          <li data-episode-id="${episode.id}">
            <h4>${episode.name}</h4>
            <p>Season ${episode.season}, Episode ${episode.number}</p>
            <p>${episode.summary}</p>
            <img src="${episode.image}" alt="${episode.name}"/>
          </li>
        `);

        // Append the episode element to the episodesList
        episodesList.append($episode);
      }

      // Show the episodes section
      this.episodesArea.show();
    }

    populateShows(shows) {
      this.showsList.empty();

     // Inside the populateShows function
    for (let show of shows) {
    const $show = $(`
      <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
      <div class="card">
        <img class="card-img-top" src="${show.image}" alt="${show.name}">
        <!-- ... (other card content) ... -->
        <button class="btn btn-primary mt-2 show-episodes-button" data-show-id="${show.id}">Episodes</button>
      </div>
      </div>
      `);
 
  // Append the show element to the showsList
  this.showsList.append($show);
    }

    this.showsList.on('click', '.show-episodes-button', (e) => {
      e.preventDefault();
      const showId = $(e.currentTarget).data('show-id');
      this.loadEpisodesDropdown(showId);
    });
    
    }



async getEpisodesOfShow(showId) {
  const apiUrl = `http://api.tvmaze.com/shows/${showId}/episodes`;
  try {
    const response = await $.ajax({
      url: apiUrl,
      method: 'GET',
    });

    // Process and format the episodes data
    const formattedEpisodes = response.map((episode) => {
      return {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number,
        summary: episode.summary,
        image: episode.image ? episode.image.medium : 'https://tinyurl.com/tv-missing',
      };
    });

    // call a function to display them
    this.displayEpisodes(formattedEpisodes);

    return formattedEpisodes;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}

displayEpisodes(episodes) {
  
  const episodesList = $('#episodesList');
  episodesList.empty();

  for (let episode of episodes) {
    const $episode = $(`
      <li data-episode-id="${episode.id}">
        <h4>${episode.name}</h4>
        <p>Season ${episode.season}, Episode ${episode.number}</p>
        <p>${episode.summary}</p>
        <img src="${episode.image}" alt="${episode.name}"/>
      </li>
    `);

    // Append the episode element to the episodesList
    episodesList.append($episode);
  }

  // Show the episodes section
  this.episodesArea.show();
}
async loadEpisodesDropdown(showId) {
  console.log("loadEpisodesDropdown called");
  const episodesDropdown = $('#episodesDropdown');

  // Fetch episodes data for the selected show
  const episodes = await this.getEpisodesOfShow(showId);

  // Call the displayEpisodes function to display episodes in the designated area
  this.displayEpisodes(episodes);

  // Update the dropdown with episodes (if needed)
  if (episodes.length > 0) {
    episodesDropdown.empty(); // Clear previous options
    episodes.forEach((episode) => {
      const option = $('<option></option>')
        .attr('value', episode.id)
        .text(`Season ${episode.season}, Episode ${episode.number}: ${episode.name}`);
      episodesDropdown.append(option);
    });
    console.log("show dropdown list is called");
    episodesDropdown.show(); // Show the dropdown
  }
  
  
}

  }

  const tvmazeApp = new TVMazeApp();
});


