const slide = "https://challenge3-backend-gold.vercel.app/films";

document.addEventListener('DOMContentLoaded', () => {
  fetch(slide)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        displayMovie(data[0]);
        renderMovieList(data);
      }
    })
    .catch(error => console.error('Error fetching movies:', error));
});

function displayMovie(movie) {
  const title = document.querySelector("#title");
  const runtime = document.querySelector("#runtime");
  const filmInfo = document.querySelector("#film-info");
  const showtime = document.querySelector("#showtime");
  const ticketNum = document.querySelector("#ticket-num");
  const poster = document.querySelector("#poster");
  const buyTicket = document.querySelector("#buy-ticket");

  let ticketRem = movie.capacity - movie.tickets_sold;
  title.textContent = movie.title;
  runtime.textContent = `${movie.runtime} minutes`;
  showtime.textContent = movie.showtime;
  filmInfo.textContent = movie.description;
  ticketNum.textContent = ticketRem;
  poster.src = movie.poster;
  buyTicket.textContent = "Buy Ticket";
  buyTicket.disabled = ticketRem === 0;

  buyTicket.onclick = () => {
    if (ticketRem > 0) {
      ticketRem -= 1;
      ticketNum.textContent = ticketRem;

      if (ticketRem === 0) {
        buyTicket.textContent = `Sold Out`;
        buyTicket.disabled = true;
      }
    }
  };
}

function renderMovieList(movies) {
  const films = document.querySelector("#films");
  films.innerHTML = "";

  movies.forEach((movie, index) => {
    const li = document.createElement("li");
    li.className = "film item";
    li.textContent = movie.title;
    films.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("ui", "button");
    deleteButton.style.marginLeft = "5px";
    li.appendChild(deleteButton);

    li.onclick = () => displayMovie(movie);

    deleteButton.onclick = (event) => {
      event.stopPropagation();
      fetch(`http://localhost:3000/films/${index}`, {
        method: "DELETE"
      }).catch(error => console.error('Error deleting movie:', error));
    };
  });
}
