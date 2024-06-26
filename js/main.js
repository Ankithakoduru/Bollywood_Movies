document.addEventListener('DOMContentLoaded', () => {
  const movieForm = document.getElementById('movie-form');
  const movieTableBody = document.getElementById('movie-table-body');
  const moviesChartCanvas = document.getElementById('moviesChart');

  let movies = JSON.parse(localStorage.getItem('bollywoodMovies')) || [];

  if (movies.length === 0) {
    const initialData = [
      { title: "3 Idiots", actor: "Aamir Khan", actress: "Kareena Kapoor", director: "Rajkumar Hirani", year: 2009, genre: "Comedy/Drama" },
      { title: "Dilwale Dulhania Le Jayenge", actor: "Shah Rukh Khan", actress: "Kajol", director: "Aditya Chopra", year: 1995, genre: "Romance/Drama" },
      { title: "Lagaan", actor: "Aamir Khan", actress: "Gracy Singh", director: "Ashutosh Gowariker", year: 2001, genre: "Drama/Sport" },
      { title: "Sholay", actor: "Dharmendra", actress: "Hema Malini", director: "Ramesh Sippy", year: 1975, genre: "Action/Adventure" },
      { title: "Mughal-E-Azam", actor: "Prithviraj Kapoor", actress: "Madhubala", director: "K. Asif", year: 1960, genre: "Epic/Drama" },
      { title: "Gol Maal", actor: "Amol Palekar", actress: "Bina Rai", director: "Hrishikesh Mukherjee", year: 1979, genre: "Comedy/Drama" },
      { title: "Mother India", actor: "Nargis", actress: "Sunil Dutt", director: "Mehboob Khan", year: 1957, genre: "Drama/Family" },
      { title: "Baahubali: The Beginning", actor: "Prabhas", actress: "Anushka Shetty", director: "S. S. Rajamouli", year: 2015, genre: "Epic/Action" },
      { title: "PK", actor: "Aamir Khan", actress: "Anushka Sharma", director: "Rajkumar Hirani", year: 2014, genre: "Comedy/Drama" },
      { title: "Andaz Apna Apna", actor: "Aamir Khan", actress: "Raveena Tandon", director: "Rajkumar Santoshi", year: 1994, genre: "Comedy/Romance" },
      { title: "Gadar: Ek Prem Katha", actor: "Sunny Deol", actress: "Ameesha Patel", director: "Anil Sharma", year: 2001, genre: "Action/Drama" },
      { title: "Devdas", actor: "Shah Rukh Khan", actress: "Madhuri Dixit", director: "Sanjay Leela Bhansali", year: 2002, genre: "Romance/Drama" },
      { title: "Kabhi Khushi Kabhie Gham", actor: "Shah Rukh Khan", actress: "Kajol", director: "Karan Johar", year: 2001, genre: "Drama/Romance" },
      { title: "Bajrangi Bhaijaan", actor: "Salman Khan", actress: "Kareena Kapoor", director: "Kabir Khan", year: 2015, genre: "Drama/Action" },
      { title: "Dil Chahta Hai", actor: "Aamir Khan", actress: "Preity Zinta", director: "Farhan Akhtar", year: 2001, genre: "Comedy/Drama" },
      { title: "Dabangg", actor: "Salman Khan", actress: "Sonakshi Sinha", director: "Abhinav Kashyap", year: 2010, genre: "Action/Comedy" },
      { title: "Chak De! India", actor: "Shah Rukh Khan", actress: "Vidya Malvade", director: "Shimit Amin", year: 2007, genre: "Drama/Sport" },
      { title: "Swades", actor: "Shah Rukh Khan", actress: "Gayatri Joshi", director: "Ashutosh Gowariker", year: 2004, genre: "Drama" },
      { title: "Om Shanti Om", actor: "Shah Rukh Khan", actress: "Deepika Padukone", director: "Farah Khan", year: 2007, genre: "Drama/Romance" },
      { title: "Jodhaa Akbar", actor: "Hrithik Roshan", actress: "Aishwarya Rai", director: "Ashutosh Gowariker", year: 2008, genre: "Drama/Romance" }
    ];
    movies = initialData;
    localStorage.setItem('bollywoodMovies', JSON.stringify(initialData));
  }

  if (movieForm && movieTableBody) {
    renderMovies();

    movieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newMovie = {
        title: document.getElementById('movie-title').value,
        actor: document.getElementById('movie-actor').value,
        actress: document.getElementById('movie-actress').value,
        director: document.getElementById('movie-director').value,
        year: document.getElementById('movie-year').value,
        genre: document.getElementById('movie-genre').value
      };
      movies.push(newMovie);
      localStorage.setItem('bollywoodMovies', JSON.stringify(movies));
      renderMovies();
      movieForm.reset();
    });
  }

  function renderMovies() {
    movieTableBody.innerHTML = '';
    movies.forEach((movie, index) => {
      const row = document.createElement('tr');
      Object.keys(movie).forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = movie[key];
        row.appendChild(cell);
      });

      const actionsCell = document.createElement('td');
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.className = 'btn btn-warning btn-sm';
      updateButton.onclick = () => updateMovie(index);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.onclick = () => deleteMovie(index);

      actionsCell.appendChild(updateButton);
      actionsCell.appendChild(deleteButton);
      row.appendChild(actionsCell);

      movieTableBody.appendChild(row);
    });
  }

  function updateMovie(index) {
    const movie = movies[index];
    document.getElementById('movie-title').value = movie.title;
    document.getElementById('movie-actor').value = movie.actor;
    document.getElementById('movie-actress').value = movie.actress;
    document.getElementById('movie-director').value = movie.director;
    document.getElementById('movie-year').value = movie.year;
    document.getElementById('movie-genre').value = movie.genre;

    movies.splice(index, 1);
    localStorage.setItem('bollywoodMovies', JSON.stringify(movies));
    renderMovies();
  }

  function deleteMovie(index) {
    movies.splice(index, 1);
    localStorage.setItem('bollywoodMovies', JSON.stringify(movies));
    renderMovies();
  }

  if (moviesChartCanvas) {
    renderChart();
  }

  function renderChart() {
    const ctx = moviesChartCanvas.getContext('2d');

    const movies = JSON.parse(localStorage.getItem('bollywoodMovies')) || [];

    const moviesByYear = movies.reduce((acc, movie) => {
      acc[movie.year] = (acc[movie.year] || 0) + 1;
      return acc;
    }, {});

    const years = Object.keys(moviesByYear).sort((a, b) => a - b);
    const movieCounts = years.map(year => moviesByYear[year]);

    if (window.moviesChart) {
      window.moviesChart.destroy();
    }

    window.moviesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Number of Movies Released',
          data: movieCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }
});
