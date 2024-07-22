document.addEventListener('DOMContentLoaded', () => {
    let recommendations = [];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check if data is being fetched correctly
            recommendations = data.countries.flatMap(country => country.cities.map(city => ({
                country: country.name,
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description,
                type: city.type // Assuming type field is added to each city in JSON (e.g., "beach", "temple", "country")
            })));
            displayRecommendations(recommendations);
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('search-button').addEventListener('click', () => {
        search(recommendations);
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        resetSearch(recommendations);
    });
});

function displayRecommendations(recommendations) {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = ''; // Clear previous recommendations
    recommendations.forEach(recommendation => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.className = 'recommendation';

        const img = document.createElement('img');
        img.src = recommendation.imageUrl;
        img.alt = recommendation.name;

        const name = document.createElement('h3');
        name.textContent = recommendation.name;

        const description = document.createElement('p');
        description.textContent = recommendation.description;

        recommendationDiv.appendChild(img);
        recommendationDiv.appendChild(name);
        recommendationDiv.appendChild(description);

        recommendationsContainer.appendChild(recommendationDiv);
    });
}

function search(recommendations) {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    console.log('Search input:', searchInput);

    const filteredRecommendations = recommendations.filter(recommendation => {
        const name = recommendation.name.toLowerCase();
        const description = recommendation.description.toLowerCase();
        const country = recommendation.country.toLowerCase();
        const type = recommendation.type.toLowerCase();
        return name.includes(searchInput) || description.includes(searchInput) || country.includes(searchInput) || type.includes(searchInput);
    });

    console.log('Filtered recommendations:', filteredRecommendations);
    displayRecommendations(filteredRecommendations);
}

function resetSearch(recommendations) {
    document.getElementById('search-input').value = '';
    displayRecommendations(recommendations);
}
