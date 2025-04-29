let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Salva il carrello nel localStorage */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/*  Mostra il carrello nella lista */
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li class='list-group-item'>Il carrello è vuoto.</li>";
    return;
  }

  cart.forEach((book, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${book.title} - €${book.price}
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Elimina</button>
    `;
    cartList.appendChild(li);
  });
}

/* Rimuove dal carello */
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

/* Svuota tutto */
function emptyCart() {
  cart = [];
  saveCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Il carrello è vuoto.");
    return;
  }
  alert("Grazie per il tuo acquisto!");
  emptyCart();
}
/* Richiesta di dati  */
fetch("https://striveschool-api.herokuapp.com/books")
  .then((resp) => {
    if (!resp.ok) {
      throw new Error("Errore nella chiamata API");
    }
    return resp.json();
  })
  .then((data) => {
    const contenitoreLibri = document.querySelector(".contLibri");

    data.forEach((libro) => {
      const card = document.createElement("div");
      card.className = "col cardSingola";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${libro.img}" class="card-img-top" alt="${libro.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${libro.title}</h5>
            <p class="card-text">€${libro.price}</p>
            <div class="mt-auto d-flex justify-content-between">
              <button class="btn btn-outline-light  btn-sm scarta">Scarta</button>
              <button class="btn btn-outline-success btn-sm compra">Compra ora</button>
            </div>
          </div>
        </div>
      `;

      contenitoreLibri.appendChild(card);

      /*  Pulsante "Scarta" rimuove la card */
      card.querySelector(".scarta").addEventListener("click", () => {
        card.remove();
      });

      /* Pulsante "Compra ora" aggiunge al carrello */

      card.querySelector(".compra").addEventListener("click", () => {
        cart.push(libro);
        saveCart();
        renderCart();
      });
    });
  })
  .catch((err) => console.error("Errore nel caricamento dei libri:", err));

renderCart();
