/* script.js - UPDATED VERSION (Split Products: 125ml, 225ml, Bundle) */

// ------------------------------------------------------------------
// 1. FIREBASE SETUP
// ------------------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDMKRC8Fs4C11v5c4M-Slf52wUtA2RTZLw",
  authDomain: "beautiforia-store.firebaseapp.com",
  projectId: "beautiforia-store",
  storageBucket: "beautiforia-store.firebasestorage.app",
  messagingSenderId: "489069244876",
  appId: "1:489069244876:web:ed721861d649fe9b3f6d69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Connected");

// ------------------------------------------------------------------
// 2. THE MASTER DATABASE
// ------------------------------------------------------------------
const products = [
    // --- 1. NOIR (Men) ---
    {
        id: 1, name: "Noir - 125ml", nameAr: "عطر النوار - عبوة صغيرة",
        price: 150, image: "small/noir small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>أناقة الغموض.. وانتعاش يدوم.</strong><br>الحجم الصغير المثالي.`
    },
    {
        id: 2, name: "Noir - 225ml", nameAr: "عطر النوار - عبوة كبيرة",
        price: 225, image: "big/noir big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>أناقة الغموض.. وانتعاش يدوم.</strong><br>العبوة الكبيرة للتوفير.`
    },
    {
        id: 3, name: "Noir - Full Set", nameAr: "عطر النوار - الطقم الكامل",
        price: 300, image: "images/noir men.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>أناقة الغموض.. وانتعاش يدوم.</strong><br>احصل على العبوتین معاً بسعر خاص.`
    },

    // --- 2. WOMAN SUGAR ---
    {
        id: 4, name: "Woman Sugar - 125ml", nameAr: "وومان شوجر - عبوة صغيرة",
        price: 150, image: "small/woman small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>أنوثة طاغية.. وسحر لا يقاوم.</strong><br>دلّلي نفسك مع Woman Sugar.`
    },
    {
        id: 5, name: "Woman Sugar - 225ml", nameAr: "وومان شوجر - عبوة كبيرة",
        price: 225, image: "big/woman big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>أنوثة طاغية.. وسحر لا يقاوم.</strong><br>العبوة الكبيرة.`
    },
    {
        id: 6, name: "Woman Sugar - Full Set", nameAr: "وومان شوجر - الطقم الكامل",
        price: 300, image: "images/woman sugar.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>أنوثة طاغية.. وسحر لا يقاوم.</strong><br>العرض الأوفر (عبوة صغيرة + كبيرة).`
    },

    // --- 3. LOVELY ---
    {
        id: 7, name: "Lovly - 125ml", nameAr: "لافلي - عبوة صغيرة",
        price: 150, image: "small/lovely small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>تناغم الرقة والدفء.</strong>`
    },
    {
        id: 8, name: "Lovly - 225ml", nameAr: "لافلي - عبوة كبيرة",
        price: 225, image: "big/lovely big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>تناغم الرقة والدفء.</strong>`
    },
    {
        id: 9, name: "Lovly - Full Set", nameAr: "لافلي - الطقم الكامل",
        price: 300, image: "images/lovely.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>تناغم الرقة والدفء.</strong><br>الطقم الكامل بسعر مميز.`
    },

    // --- 4. COCONUT ---
    {
        id: 10, name: "Coconut - 125ml", nameAr: "جوز الهند - عبوة صغيرة",
        price: 150, image: "small/coconut  small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>انتعاش استوائي.</strong>`
    },
    {
        id: 11, name: "Coconut - 225ml", nameAr: "جوز الهند - عبوة كبيرة",
        price: 225, image: "big/coconut big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>انتعاش استوائي.</strong>`
    },
    {
        id: 12, name: "Coconut - Full Set", nameAr: "جوز الهند - الطقم الكامل",
        price: 300, image: "images/coconut.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>انتعاش استوائي.</strong><br>عرض خاص (عبوتين).`
    },

    // --- 5. SO SEXY ---
    {
        id: 13, name: "So Sexy - 125ml", nameAr: "سو سيكسي - عبوة صغيرة",
        price: 150, image: "small/so sexy small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>سر الجاذبية الشرقية.</strong>`
    },
    {
        id: 14, name: "So Sexy - 225ml", nameAr: "سو سيكسي - عبوة كبيرة",
        price: 225, image: "big/so sexy big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>سر الجاذبية الشرقية.</strong>`
    },
    {
        id: 15, name: "So Sexy - Full Set", nameAr: "سو سيكسي - الطقم الكامل",
        price: 300, image: "images/so sexy.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>سر الجاذبية الشرقية.</strong><br>الطقم الكامل.`
    },

    // --- 6. RED NIGHT ---
    {
        id: 16, name: "Red Night - 125ml", nameAr: "ريد نايت - عبوة صغيرة",
        price: 150, image: "small/red night small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>غموض الليل.</strong>`
    },
    {
        id: 17, name: "Red Night - 225ml", nameAr: "ريد نايت - عبوة كبيرة",
        price: 225, image: "big/red night big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>غموض الليل.</strong>`
    },
    {
        id: 18, name: "Red Night - Full Set", nameAr: "ريد نايت - الطقم الكامل",
        price: 300, image: "images/red  night.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>غموض الليل.</strong><br>العرض الأوفر.`
    },

    // --- 7. BUBBLY STARS ---
    {
        id: 19, name: "Bubbly Stars - 125ml", nameAr: "بوبلي ستارز - عبوة صغيرة",
        price: 150, image: "small/bubbly small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>فخامة ناعمة.</strong>`
    },
    {
        id: 20, name: "Bubbly Stars - 225ml", nameAr: "بوبلي ستارز - عبوة كبيرة",
        price: 225, image: "big/bubbly big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>فخامة ناعمة.</strong>`
    },
    {
        id: 21, name: "Bubbly Stars - Full Set", nameAr: "بوبلي ستارز - الطقم الكامل",
        price: 300, image: "images/bubbly splash.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>فخامة ناعمة.</strong><br>الطقم الكامل.`
    },

    // --- 8. BONBON ---
    {
        id: 22, name: "Bonbon - 125ml", nameAr: "بونبون - عبوة صغيرة",
        price: 150, image: "small/bonbon small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>عبير الرقة.</strong>`
    },
    {
        id: 23, name: "Bonbon - 225ml", nameAr: "بونبون - عبوة كبيرة",
        price: 225, image: "big/bonbon big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>عبير الرقة.</strong>`
    },
    {
        id: 24, name: "Bonbon - Full Set", nameAr: "بونبون - الطقم الكامل",
        price: 300, image: "images/bonbon.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>عبير الرقة.</strong><br>الطقم الكامل.`
    },

    // --- 9. STRAWBERRY & CREAM ---
    {
        id: 25, name: "Strawberry - 125ml", nameAr: "فراولة - عبوة صغيرة",
        price: 150, image: "small/strawyberry small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>انتعاش الفراولة.</strong>`
    },
    {
        id: 26, name: "Strawberry - 225ml", nameAr: "فراولة - عبوة كبيرة",
        price: 225, image: "big/straw berry big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>انتعاش الفراولة.</strong>`
    },
    {
        id: 27, name: "Strawberry - Full Set", nameAr: "فراولة - الطقم الكامل",
        price: 300, image: "images/strawberry.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>انتعاش الفراولة.</strong><br>الطقم الكامل.`
    },

    // --- 10. JOYFUL ---
    {
        id: 28, name: "Joyful - 125ml", nameAr: "جوي فول - عبوة صغيرة",
        price: 150, image: "small/joyful small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>انتعاش الزهور.</strong>`
    },
    {
        id: 29, name: "Joyful - 225ml", nameAr: "جوي فول - عبوة كبيرة",
        price: 225, image: "big/joyful big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>انتعاش الزهور.</strong>`
    },
    {
        id: 30, name: "Joyful - Full Set", nameAr: "جوي فول - الطقم الكامل",
        price: 300, image: "images/joyful.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>انتعاش الزهور.</strong><br>الطقم الكامل.`
    },

    // --- 11. DREAMS ---
    {
        id: 31, name: "Dreams - 125ml", nameAr: "دريمز - عبوة صغيرة",
        price: 150, image: "small/dream small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>عالم من الأحلام.</strong>`
    },
    {
        id: 32, name: "Dreams - 225ml", nameAr: "دريمز - عبوة كبيرة",
        price: 225, image: "big/dream big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>عالم من الأحلام.</strong>`
    },
    {
        id: 33, name: "Dreams - Full Set", nameAr: "دريمز - الطقم الكامل",
        price: 300, image: "images/dreams both.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>عالم من الأحلام.</strong><br>الطقم الكامل.`
    },

    // --- 12. VELVET BLUSH ---
    {
        id: 34, name: "Velvet Blush - 125ml", nameAr: "فيلفيت بلاش - عبوة صغيرة",
        price: 150, image: "small/velvet small.png", category: "Body Mist", volume: "125 ml",
        desc: `<strong>الأنوثة والنعومة.</strong>`
    },
    {
        id: 35, name: "Velvet Blush - 225ml", nameAr: "فيلفيت بلاش - عبوة كبيرة",
        price: 225, image: "big/velvet big.png", category: "Body Mist", volume: "225 ml",
        desc: `<strong>الأنوثة والنعومة.</strong>`
    },
    {
        id: 36, name: "Velvet Blush - Full Set", nameAr: "فيلفيت بلاش - الطقم الكامل",
        price: 300, image: "images/velvet blush.jpg", category: "Body Mist", volume: "125ml + 225ml",
        desc: `<strong>الأنوثة والنعومة.</strong><br>الطقم الكامل.`
    },
    
    // --- OTHER PRODUCTS (IDs SHIFTED to 37+) ---
    { id: 37, name: "Hair Wax Stick", nameAr: "واكس ستيك للشعر", price: 250, image: "https://placehold.co/600x800/333/FFF?text=Hair+Wax", category: "Hair Care", volume: "75g", desc: "تصفيف مثالي." },
    { id: 38, name: "Sunscreen SPF50+", nameAr: "واقي شمس SPF50+", price: 400, image: "https://placehold.co/600x800/FFA500/FFF?text=Sunscreen", category: "Skincare", volume: "50ml", desc: "حماية قصوى." },
    { id: 39, name: "Collagen Cream", nameAr: "كريم كولاجين", price: 450, image: "https://placehold.co/600x800/ADD8E6/000?text=Collagen", category: "Skincare", volume: "100ml", desc: "نضارة وشباب." },
    { id: 40, name: "Violet Rose Whitening Deo", nameAr: "مزيل عرق فيوليت روز", price: 150, image: "https://placehold.co/600x800/EE82EE/000?text=Violet+Deo", category: "Deodorant", volume: "50ml", desc: "حماية وتفتيح." },
    { id: 41, name: "Night Kiss Whitening Deo", nameAr: "مزيل عرق نايت كيس", price: 150, image: "https://placehold.co/600x800/191970/FFF?text=Night+Deo", category: "Deodorant", volume: "50ml", desc: "جاذبية المساء." },
    { id: 42, name: "Oud Sauvage Whitening Deo", nameAr: "مزيل عرق عود سوفاج", price: 150, image: "https://placehold.co/600x800/8B4513/FFF?text=Oud+Deo", category: "Deodorant", volume: "50ml", desc: "فخامة العود." },
    { id: 43, name: "Blacknight Whitening Deo", nameAr: "مزيل عرق بلاك نايت", price: 150, image: "https://placehold.co/600x800/000/FFF?text=Blacknight", category: "Deodorant", volume: "50ml", desc: "قوة وثقة." }
];

// 3. LOAD CART
let cart = JSON.parse(localStorage.getItem('beautiforiaCart')) || [];

// 4. RENDER ITEMS
const productGrid = document.getElementById('product-grid');
const isHomePage = document.body.classList.contains('home-page');

if (productGrid) {
    if (isHomePage) {
        renderProducts(products.slice(0, 8), productGrid); // Show first 8 on home
    } else {
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(cat => {
            const title = document.createElement('h2');
            title.className = 'section-title';
            title.style.textAlign = 'left';
            title.style.marginTop = '40px';
            title.style.borderBottom = '2px solid #eee';
            title.innerText = cat;
            productGrid.appendChild(title);
            const grid = document.createElement('div');
            grid.className = 'product-grid';
            grid.style.marginBottom = '50px';
            renderProducts(products.filter(p => p.category === cat), grid);
            productGrid.appendChild(grid);
        });
        productGrid.className = ''; 
    }
}

function renderProducts(items, container) {
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const isBodyMist = product.category === "Body Mist";
        const priceDisplay = `EGP ${product.price}`;
        
        const buttonHtml = isBodyMist 
            ? `<button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>`
            : `<button class="btn" disabled style="background-color:#ccc; color:#666; cursor:not-allowed;">Coming Soon</button>`;

        card.innerHTML = `
            <a href="product-details.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p style="font-size:0.85rem; color:#666; margin-bottom:5px;">${product.nameAr}</p>
                <p class="product-price">${priceDisplay}</p>
                ${buttonHtml}
            </div>
        `;
        container.appendChild(card);
    });
}

// 5. RENDER DETAILS PAGE
const detailContainer = document.getElementById('product-detail-container');
if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const product = products.find(p => p.id == id);
    if (product) {
        let sizeHtml = '';
        if(product.variants) {
            sizeHtml = `<select id="size-select" class="size-selector" onchange="updatePrice()">`;
            product.variants.forEach(v => {
                sizeHtml += `<option value="${v.size}" data-price="${v.price}">${v.size} - EGP ${v.price}</option>`;
            });
            sizeHtml += `</select>`;
        } else {
            sizeHtml = `<p><strong>Volume:</strong> ${product.volume}</p>`;
        }

        const isBodyMist = product.category === "Body Mist";
        const buttonHtml = isBodyMist
            ? `<button class="btn" style="width:100%; max-width:300px; padding:15px;" onclick="addToCart(${product.id})">Add to Cart</button>`
            : `<button class="btn" disabled style="width:100%; max-width:300px; padding:15px; background-color:#ccc; color:#666; cursor:not-allowed;">Coming Soon</button>`;

        detailContainer.innerHTML = `
            <div class="detail-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="detail-info" style="text-align:left;">
                <h1>${product.name}</h1>
                <h2 style="color:#666; margin-bottom:10px;">${product.nameAr}</h2>
                <div style="border-bottom:1px solid #ddd; padding-bottom:15px; margin-bottom:15px;">
                    <span id="price-display" style="font-size:1.8rem; color:#b12704; font-weight:bold;">EGP ${product.price}</span>
                    <br><span style="color:#007600; font-weight:bold;">${isBodyMist ? "In Stock" : "Coming Soon"}</span>
                </div>
                <div style="background:#f3f3f3; padding:15px; border-radius:5px; margin-bottom:20px;">
                    <p><strong>Category:</strong> ${product.category}</p>
                    ${sizeHtml}
                </div>
                <div class="description" style="line-height:1.6;">${product.desc}</div>
                <br>
                ${buttonHtml}
            </div>
        `;
    } else {
        detailContainer.innerHTML = "<h2>Product not found</h2>";
    }
}

// MAKE GLOBAL: updatePrice is used in HTML onchange=""
window.updatePrice = function() {
    const select = document.getElementById('size-select');
    const priceDisplay = document.getElementById('price-display');
    if(select && priceDisplay) {
        const selectedOption = select.options[select.selectedIndex];
        const newPrice = selectedOption.getAttribute('data-price');
        priceDisplay.innerText = `EGP ${newPrice}`;
    }
}

// 6. CART LOGIC
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    let selectedSize = product.volume;
    let selectedPrice = product.price;

    const sizeSelect = document.getElementById('size-select');
    const urlParams = new URLSearchParams(window.location.search);
    if (sizeSelect && urlParams.get('id') == id) {
        selectedSize = sizeSelect.value;
        selectedPrice = parseFloat(sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-price'));
    }

    const existing = cart.find(i => i.id === id && i.size === selectedSize);
    if (existing) { existing.quantity++; } 
    else { cart.push({ id: product.id, name: product.name, image: product.image, price: selectedPrice, size: selectedSize, quantity: 1 }); }
    
    updateCartUI();
    alert("Added to cart!");
}

window.removeFromCart = function(id, size) {
    cart = cart.filter(i => !(i.id === id && i.size === size));
    updateCartUI();
}

// ** FULL LIST OF EGYPTIAN GOVERNORATES **
const egyptGovs = [
    "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", 
    "Gharbiya", "Ismailia", "Monufia", "Minya", "Qalyubia", "New Valley", "Suez", 
    "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia", "South Sinai", 
    "Kafr Al Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
];

// 7. NEW: CALCULATE TOTALS WITH SHIPPING
window.calculateTotals = function() {
    const govSelect = document.getElementById('c-gov');
    const gov = govSelect ? govSelect.value : "";
    
    // Calculate items subtotal
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    // Determine Shipping Logic
    let shippingFee = 0;
    
    if (gov) {
        if (gov === "Cairo" || gov === "Giza") {
            shippingFee = 65;
        } else {
            shippingFee = 85;
        }
    }

    // Update UI elements if they exist
    const subEl = document.getElementById('display-subtotal');
    const shipEl = document.getElementById('display-shipping');
    const grandEl = document.getElementById('display-grand-total');

    if (subEl) subEl.innerText = `EGP ${subtotal}`;
    
    if (shipEl) {
        if (gov) {
            shipEl.innerText = `EGP ${shippingFee}`;
        } else {
            shipEl.innerText = "Select City";
        }
    }

    if (grandEl) {
        const grandTotal = subtotal + shippingFee;
        grandEl.innerText = `EGP ${grandTotal}`;
    }
}

function updateCartUI() {
    localStorage.setItem('beautiforiaCart', JSON.stringify(cart));
    const countEl = document.querySelector('.cart-count');
    if (countEl) countEl.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);

    const itemsEl = document.querySelector('.cart-items');
    if (itemsEl) {
        // 1. Render Items
        let itemsHtml = '';
        let subtotal = 0;
        
        if (cart.length === 0) {
            itemsHtml = `<p style="text-align:center; padding:20px; color:#666;">Your cart is empty.</p>`;
        } else {
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                itemsHtml += `
                    <div class="cart-item">
                        <img src="${item.image}">
                        <div class="cart-item-details">
                            <p><strong>${item.name}</strong></p>
                            <p style="font-size:0.8rem; color:#666;">${item.size}</p>
                            <p>${item.quantity} x EGP ${item.price}</p>
                        </div>
                        <div class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">&times;</div>
                    </div>`;
            });
        }

        // 2. Render Checkout Form
        const govOptions = egyptGovs.map(g => `<option value="${g}">${g}</option>`).join('');

        itemsEl.innerHTML = `
            ${itemsHtml}
            
            ${cart.length > 0 ? `
            <div style="background:#f9f9f9; padding:15px; border-radius:5px; margin-bottom:20px; border:1px solid #eee;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Subtotal:</span>
                    <span id="display-subtotal" style="font-weight:bold;">EGP ${subtotal}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#666;">
                    <span>Shipping:</span>
                    <span id="display-shipping">Select City</span>
                </div>
                <div style="display:flex; justify-content:space-between; border-top:1px solid #ddd; padding-top:10px; font-size:1.2rem; font-weight:bold; color:#000;">
                    <span>Grand Total:</span>
                    <span id="display-grand-total">EGP ${subtotal}</span>
                </div>
            </div>
            
            <div class="checkout-section">
                <h4>Shipping Details</h4>
                <div class="form-group"><label>FULL NAME</label><input type="text" id="c-name" class="form-input" placeholder="Mahmoud Roshdy"></div>
                <div class="form-group"><label>PHONE NUMBER</label><input type="tel" id="c-phone" class="form-input" placeholder="01xxxxxxxxx"></div>
                <div class="form-group">
                    <label>GOVERNORATE</label>
                    <select id="c-gov" class="form-select" onchange="calculateTotals()">
                        <option value="" disabled selected>Select Governorate</option>
                        ${govOptions}
                    </select>
                </div>
                <div class="form-group"><label>DETAILED ADDRESS</label><input type="text" id="c-address" class="form-input" placeholder="Street / Building / Apt"></div>
                
                <button class="checkout-btn" onclick="placeOrder()">PLACE ORDER | تنفيذ الطلب</button>
            </div>
            ` : ''}
        `;
    }
}

// 8. MODAL EVENTS
const overlay = document.querySelector('.cart-overlay');
const closeBtn = document.querySelector('.close-cart');
const cartIcon = document.querySelector('.cart-icon');

function openCart() {
    if(overlay) {
        overlay.classList.add('open');
        document.body.classList.add('no-scroll');
    }
}

function closeCart() {
    if(overlay) {
        overlay.classList.remove('open');
        document.body.classList.remove('no-scroll');
    }
}

if (cartIcon) cartIcon.addEventListener('click', openCart);
if (closeBtn) closeBtn.addEventListener('click', closeCart);
if (overlay) overlay.addEventListener('click', (e) => { if(e.target === overlay) closeCart(); });

// 9. PLACE ORDER (UPDATED TO INCLUDE SHIPPING)
window.placeOrder = async function() {
    if(cart.length === 0) { alert("Cart is empty"); return; }
    
    const name = document.getElementById('c-name').value;
    const phone = document.getElementById('c-phone').value;
    const address = document.getElementById('c-address').value;
    const govSelect = document.getElementById('c-gov');
    const gov = govSelect ? govSelect.value : "";

    if(!name || !phone || !address || !gov) { alert("Please fill all details / يرجى ملء جميع البيانات"); return; }

    const btn = document.querySelector('.checkout-btn');
    btn.innerText = "PROCESSING...";
    btn.disabled = true;

    // Calculate Final Totals
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    let shippingFee = 85; // Default
    if (gov === "Cairo" || gov === "Giza") {
        shippingFee = 65;
    }
    const grandTotal = subtotal + shippingFee;

    try {
        // Create the order object
        const orderData = {
            customer: { name, phone, address, gov },
            items: cart,
            financials: {
                subtotal: subtotal,
                shipping: shippingFee,
                total: grandTotal
            },
            total: grandTotal, // Kept for backward compatibility with your Admin panel
            createdAt: new Date().toISOString(),
            status: 'new'
        };

        // WRITE TO FIREBASE
        const docRef = await addDoc(collection(db, "orders"), orderData);
        
        // Success
        alert(`Order Placed Successfully!\n\nReference ID: ${docRef.id}\nTotal Amount: EGP ${grandTotal}\n\nWe will contact you shortly.`);
        cart = [];
        updateCartUI();
        closeCart();

    } catch(e) {
        console.error("Error placing order:", e);
        alert("Connection Failed: Could not send order to database.");
    }

    if(btn) {
        btn.innerText = "PLACE ORDER | تنفيذ الطلب";
        btn.disabled = false;
    }
}

// ------------------------------------------------------------------
// 10. MOBILE MENU LOGIC
// ------------------------------------------------------------------
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page jumping
        nav.classList.remove('active');
    });
}

// Initial Load
updateCartUI();