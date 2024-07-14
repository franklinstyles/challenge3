
const slide = "http://localhost:3000/films";
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const filmInfo = document.getElementById("film-info");
const showtime = document.getElementById("showtime");
const ticketNum = document.getElementById("ticket-num");
const buyTicket = document.getElementById("buy-ticket");
const subtitle = document.getElementById("subtitle");
const films = document.getElementById("films");
const poster = document.getElementById("poster");
const showing = document.getElementById("showing");
const body = document.getElementsByTagName("body")[0];

window.onload = () => {
  fetch(slide)
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is an array of movies and we're focusing on the first movie
      const movieOne = data[0];
      let ticketRem = movieOne.capacity - movieOne.tickets_sold;

      // Initial display of movie details
      title.innerHTML = `${movieOne.title}`;
      runtime.innerHTML = `${movieOne.runtime} minutes`;
      showtime.innerHTML = `${movieOne.showtime}`;
      filmInfo.innerHTML = `${movieOne.description}`;
      ticketNum.innerHTML = `${ticketRem}`;
      poster.src = `${movieOne.poster}`;
      buyTicket.innerHTML = "Buy Ticket";

      // Buy Ticket button functionality
      buyTicket.addEventListener("click", () => {
        if (ticketRem > 0) {
          ticketRem -= 1;
          ticketNum.innerHTML = `${ticketRem}`;

          if (ticketRem === 0) {
            buyTicket.innerHTML = `Sold Out`;
            buyTicket.disabled = true; // Disable the button when sold out
          }
        }
      });

      // Render movie list
      films.innerHTML = "";
      data.forEach((movie, index) => {
        const li = document.createElement("li");
        li.className = "film item";
        li.innerHTML = `${movie.title}`;
        films.appendChild(li);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("ui", "button");
        deleteButton.style.marginLeft = "5px";

        li.appendChild(deleteButton);

        // Delete movie functionality
        deleteButton.addEventListener("click", () => {
          fetch(`http://localhost:3000/films/${index}`, {
            method: "DELETE"
          })
          .then(() => {
            // Optionally, you can refresh the movie list after deletion
            // For example:
            // fetch(slide)
            //   .then((response) => response.json())
            //   .then((updatedData) => {
            //     // Update films or perform any necessary operations
            //   })
            //   .catch((error) => console.error('Error fetching updated data:', error));
          })
          .catch((error) => console.error('Error deleting movie:', error));
        });

        // Click event to display movie details
        li.addEventListener("click", () => {
          ticketRem = movie.capacity - movie.tickets_sold;
          title.innerHTML = `${movie.title}`;
          runtime.innerHTML = `${movie.runtime} minutes`;
          showtime.innerHTML = `${movie.showtime}`;
          filmInfo.innerHTML = `${movie.description}`;
          ticketNum.innerHTML = `${ticketRem}`;
          poster.src = `${movie.poster}`;
          buyTicket.innerHTML = "Buy Ticket";
          buyTicket.disabled = false; // Ensure buy ticket button is enabled
        });
      });
    })
    .catch((error) => console.error('Error fetching movies:', error));
};
