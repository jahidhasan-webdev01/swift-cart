const loadAllProducts = async () => {
    const url = "https://fakestoreapi.com/products";
    const result = await fetch(url);
    const data = await result.json();

    return data;
};

const getTrendingProducts = async () => {
    const data = await loadAllProducts();
    const topThreeProduct = data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3)

    const trendingContainer = document.getElementById("tredning-product-container");
    trendingContainer.innerHTML = "";

    topThreeProduct.forEach((product) => {
        const productCardEl = document.createElement("div");
        productCardEl.innerHTML = `
            <div class="border-3 border-gray-200 rounded-xl h-full flex flex-col">
                <div class="bg-gray-200 p-5 h-48 flex items-center justify-center">
                    <img class="h-full object-contain" src='${product.image}' alt="">
                </div>
                <div class="space-y-3 px-2 py-4">
                    <div class="flex justify-between">
                        <p class="bg-blue-200 px-3 py-1 text-xs rounded-4xl">${product.category}</p>
                        <p class="font-bold text-sm"> <span class="text-amber-600"><i
                                    class="fa-solid fa-star"></i></span> ${product.rating?.rate} (${product.rating?.count})</p>
                    </div>

                    <div class="space-y-2">
                        <h1 class="font-bold text-base line-clamp-2">${product.title}</h1>
                        <p class="font-semibold text-sm">$${product.price}</p>
                    </div>

                    <div class="flex justify-between gap-5">
                        <button class="btn btn-sm btn-soft"><i class="fa-regular fa-eye"></i> Details</button>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                    </div>
                </div>
            </div>
    `
        trendingContainer.appendChild(productCardEl);
    });
};

const displayAllProducts = () => {

}

getTrendingProducts();

