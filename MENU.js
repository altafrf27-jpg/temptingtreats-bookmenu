let cart = [];
let total = 0;

function changeQty(name, price, change) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  } else if (change > 0) {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();

  const qtyEl = document.getElementById(`qty-${name.replaceAll(" ", "-")}`);
  if (qtyEl) {
    const found = cart.find(i => i.name === name);
    qtyEl.textContent = found ? found.qty : 0;
  }
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} (${item.qty}x) - Rp ${subtotal.toLocaleString("id-ID")}
      <button onclick="changeQty('${item.name}', ${item.price}, -1)">−</button>
      <button onclick="changeQty('${item.name}', ${item.price}, 1)">+</button>
    `;
    cartItems.appendChild(li);
  });

  totalPrice.textContent = total.toLocaleString("id-ID");
  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function toggleCart() {
  document.getElementById('cart').classList.toggle('show');
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  localStorage.setItem("checkoutCart", JSON.stringify(cart));
  localStorage.setItem("checkoutTotal", total);
  window.location.href = "Checkout.html";
}

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);

function addToCartAnimation(button, name, price) {
  changeQty(name, price, 1);

  // buat elemen animasi
  const img = document.createElement("div");
  img.textContent = "🛍️";
  img.classList.add("fly-animation");
  document.body.appendChild(img);

  // ambil posisi tombol dan ikon keranjang
  const btnRect = button.getBoundingClientRect();
  const cartIcon = document.getElementById("cart-icon");
  const cartRect = cartIcon.getBoundingClientRect();

  // posisi awal dan akhir
  img.style.left = `${btnRect.left + btnRect.width / 2}px`;
  img.style.top = `${btnRect.top}px`;

  // animasi ke arah keranjang
  img.animate([
    { transform: "translate(0, 0)", opacity: 1 },
    { transform: `translate(${cartRect.left - btnRect.left}px, ${cartRect.top - btnRect.top}px) scale(0.2)`, opacity: 0 }
  ], {
    duration: 800,
    easing: "ease-in-out"
  });

  setTimeout(() => img.remove(), 800);
}
function konfirmasiPesanan() {
  const nama = document.getElementById("nama").value.trim();
  const nomor = document.getElementById("nomor").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const metode = document.getElementById("metode").value;

  if (!nama || !nomor || !alamat) {
    alert("Mohon isi semua data wajib terlebih dahulu!");
    return;
  }

  // simpan ke daftar pesanan admin
  const daftarPesanan = JSON.parse(localStorage.getItem("daftarPesanan") || "[]");
  daftarPesanan.push({
    nama, nomor, alamat, metode,
    items: cart,
    total
  });
  localStorage.setItem("daftarPesanan", JSON.stringify(daftarPesanan));

  alert(`✅ Pesanan berhasil dikonfirmasi!\n\nNama: ${nama}\nWA: ${nomor}\nAlamat: ${alamat}\nMetode: ${metode}\nTotal: Rp ${parseInt(total).toLocaleString("id-ID")}\n\nTerima kasih sudah memesan di Tempting Treats! 🍮`);

  localStorage.removeItem("checkoutCart");
  localStorage.removeItem("checkoutTotal");
  window.location.href = "MENU.html";
}

});
