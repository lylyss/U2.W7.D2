fetch("https://striveschool-api.herokuapp.com/books")
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((resp) => {
    /* console.log(resp); */
    const contenitoreLibri = document.querySelector(".contLibri");
    resp.forEach((libro) => {
      console.log(libro);

      let htmlCard =
        `<div id="` +
        libro.asin +
        `" class="col cardSingola">
              <div class="card shadow-sm">
                <img class="copertinaLibro" src="` +
        libro.img +
        `"
                alt="">
                 
               
                <div class="card-body">
                  <p class="titleLibro card-text">
                    ` +
        libro.title +
        `
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Scarta</button>
                      
                    </div>
                    <div>
                    <small class="text-body-secondary">Prezzo: </small>
                    <small class="text-body-secondary">` +
        libro.price +
        `€</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

      contenitoreLibri.innerHTML += htmlCard;
    });
  });
