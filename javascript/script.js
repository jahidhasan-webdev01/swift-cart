const trendingContainer = document.getElementById("tredning-product-container");
const cartCount = document.getElementById("cart-count");
const cartDrawerContainer = document.getElementById("cart-drawer-container");

const loadAllProducts = async () => {
    const url = "https://fakestoreapi.com/products";
    const result = await fetch(url);
    const data = await result.json();

    return data;
};

const getTrendingProducts = async () => {
    isLoading(true)
    const data = await loadAllProducts();
    const topSixProduct = data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 6)

    trendingContainer.innerHTML = "";

    topSixProduct.forEach((product) => {
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
                        <button onclick="addToCart(${product.id})" class="btn btn-sm btn-primary"><i class="fa-solid fa-cart-shopping"></i> Add</button>
                    </div>
                </div>
            </div>
    `
        trendingContainer.appendChild(productCardEl);
    });

    isLoading(false);
    trendingContainer.classList.remove("hidden");
};

const getCartData = () => {
    let cart = localStorage.getItem("cart");

    return cart ? JSON.parse(cart) : [];
}

const addToCart = async (id) => {
    const allData = await loadAllProducts();

    const selectedData = allData.find((data) => data.id === id);

    let cart = getCartData();

    const alreadyInCart = cart.find((product) => product.id === id);
    if (alreadyInCart) {
        alreadyInCart.quantity += 1;
    } else {
        cart.push({ ...selectedData, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

const updateCartCount = () => {
    const cart = getCartData();

    console.log(cart);
    cartCount.innerText = `${cart.length}`;

    cartDrawerContainer.innerHTML = "";

    cart.forEach((product, index) => {
        const newEl = document.createElement("div");
        newEl.className = "flex justify-between";
        newEl.innerHTML = `
                        <div class="flex gap-5 items-center">
                        <div>
                            <h1 class="font-bold text-lg">${index + 1}.</h1>
                        </div>
                        <div class="w-12 h-12">
                            <img class="w-full h-full object-contain"
                                src="${product.image}" alt="">
                        </div>
                        <div>
                            <h1 class="font-bold line-clamp-1">${product.title}</h1>
                            <p class="font-semibold text-gray-600">$ <span>${product.price}</span> X <span>${product.quantity} = $${product.price * product.quantity}</span></p>
                        </div>

                    </div>

                    <div class="flex text-2xl font-bold gap-5 items-center">
                        <p onclick="decreaseProductQuantity(${product.id})" class="cursor-pointer">-</p>
                        <p onclick="increaseProductQuantity(${product.id})" class="cursor-pointer">+</p>
                    </div>
        `

        cartDrawerContainer.appendChild(newEl);
    });
}

const increaseProductQuantity = (id) => {
    let cart = getCartData();

    const alreadyInCart = cart.find((product) => product.id === id);
    if (alreadyInCart) {
        alreadyInCart.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

const decreaseProductQuantity = (id) => {
    let cart = getCartData();

    const alreadyInCart = cart.find((product) => product.id === id);
    if (alreadyInCart.quantity === 1) {
        cart = cart.filter((product) => product.id !== id);
    } else {
        alreadyInCart.quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

const isLoading = (status) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (status) {
        loadingSpinner.classList.remove("hidden");
    } else {
        loadingSpinner.classList.add("hidden");
    }
}

getTrendingProducts();
updateCartCount();

