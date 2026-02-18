var products = [
{
id:1,
name:"Men Casual Shirt",
category:"Men",
price:49,
oldPrice:79,
rating:4.5,
image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
sizes:["S","M","L","XL"],
colors:["Black","White","Blue"]
},
{
id:2,
name:"Women Summer Dress",
category:"Women",
price:69,
oldPrice:99,
rating:4.8,
image:"https://images.unsplash.com/photo-1520975922284-9c39f3c9e5d5",
sizes:["S","M","L"],
colors:["Red","Pink","Yellow"]
},
{
id:3,
name:"Kids Hoodie",
category:"Kids",
price:39,
oldPrice:59,
rating:4.4,
image:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
sizes:["XS","S","M"],
colors:["Green","Blue"]
}
];

var cart = JSON.parse(localStorage.getItem("cart")||"[]");
var wishlist = JSON.parse(localStorage.getItem("wishlist")||"[]");
var currentFilter="all";

function renderProducts(){
var grid=document.getElementById("products-grid");
var html="";
var filtered=currentFilter==="all"?products:products.filter(p=>p.category===currentFilter);

filtered.forEach(p=>{
var discount=Math.round(((p.oldPrice-p.price)/p.oldPrice)*100);
html+=`
<div class="product-card">
<div class="discount-badge">-${discount}%</div>
<div class="wishlist-btn" onclick="toggleWishlist(${p.id})">${wishlist.includes(p.id)?"❤️":"🤍"}</div>
<div class="product-image"><img src="${p.image}"></div>
<div class="product-body">
<div class="product-name">${p.name}</div>
<div class="price-box">
<span class="new-price">$${p.price}</span>
<span class="old-price">$${p.oldPrice}</span>
</div>
<select id="size-${p.id}" class="option-select">
${p.sizes.map(s=>`<option>${s}</option>`).join("")}
</select>
<select id="color-${p.id}" class="option-select">
${p.colors.map(c=>`<option>${c}</option>`).join("")}
</select>
<button class="add-to-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
</div>
</div>
`;
});
grid.innerHTML=html;
}

function filterCategory(cat,e){
currentFilter=cat;
document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
e.target.classList.add("active");
renderProducts();
}

function addToCart(id){
var p=products.find(x=>x.id===id);
var size=document.getElementById("size-"+id).value;
var color=document.getElementById("color-"+id).value;
cart.push({...p,size,color,quantity:1});
localStorage.setItem("cart",JSON.stringify(cart));
updateCartBadge();
renderCart();
}

function toggleWishlist(id){
if(wishlist.includes(id)) wishlist=wishlist.filter(x=>x!==id);
else wishlist.push(id);
localStorage.setItem("wishlist",JSON.stringify(wishlist));
renderProducts();
}

function updateCartBadge(){
document.getElementById("cart-badge").textContent=cart.length;
}

function renderCart(){
var container=document.getElementById("cart-items");
var total=0;
var html="";
cart.forEach(item=>{
total+=item.price*item.quantity;
html+=`<div>${item.name} (${item.size}/${item.color}) - $${item.price}</div>`;
});
container.innerHTML=html;
document.getElementById("total-amount").textContent=total;
}

function openCart(){document.getElementById("cart-modal").classList.add("show")}
function closeCart(){document.getElementById("cart-modal").classList.remove("show")}
function closeCartBg(e){if(e.target.id==="cart-modal")closeCart()}
function checkout(){alert("Order Placed Successfully 🎉");cart=[];localStorage.setItem("cart","[]");updateCartBadge();renderCart();closeCart()}

renderProducts();
updateCartBadge();
renderCart();
