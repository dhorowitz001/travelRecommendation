let btnSearch = document.getElementById('btnSearch');
let btnClear = document.getElementById('btnClear');
let inputDestination = document.getElementById('searchInput');
let recommendationsList = document.getElementById('recommendationsList');

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', clearResults);

inputDestination.addEventListener('keydown', (event) => {
    // Check if the key pressed is "Enter"
    if (event.key === 'Enter') {
        // Prevent the default form submission behavior (if the input is in a form)
        event.preventDefault(); 
        // Trigger the search function
        searchDestination();
    }
});

function searchDestination() {
    const input = inputDestination.value.trim().toLowerCase();

    if (input !== 'country' && input !== 'temple' && input !== 'beach') {
        recommendationsList.innerHTML = '<h2>Invalid search. Please enter "country", "temple", or "beach".</h2>';
        recommendationsList.style.display = 'block';
        return;
    }

    fetch('travel_recommendations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let recommendations = [];

            if (input === 'country') {
                recommendations = data.countries?.flatMap(country => country.cities) ?? [];
            } else if (input === 'temple') {
                recommendations = data.temples ?? [];
            } else if (input === 'beach') {
                recommendations = data.beaches ?? [];
            }

            displayResults(recommendations);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            recommendationsList.innerHTML = '<p>An error occurred while fetching data. Please try again later.</p>';
            recommendationsList.style.display = 'block';
        });
}

function displayResults(recommendations) {
    recommendationsList.innerHTML = '';

    if (recommendations.length === 0) {
        recommendationsList.innerHTML = '<h2>No recommendations found.</h2>';
    } else {
    recommendations.forEach(item => {
       const cardHtml = `
            <div class="card">
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            `;
            recommendationsList.innerHTML += cardHtml;
        });
    }
    recommendationsList.style.display = 'block';
}

function clearResults() {
    inputDestination.value = '';
    recommendationsList.innerHTML = '';
    recommendationsList.style.display = 'none';
}

