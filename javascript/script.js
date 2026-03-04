const loadAllProducts = async () => {
    const url = "https://fakestoreapi.com/products";
    const result = await fetch(url);
    const data = await result.json();

    displayTrending(data);
}

const displayTrending = (data) => {
    const topFourProduct = data.sort((a,b) => b.rating.rate - a.rating.rate).slice(0,4)

    const trendingContainer = document.getElementById("tredning-container");
    // trendingContainer.innerHTML = "";
}

loadAllProducts()

