document.addEventListener("DOMContentLoaded", function () {
  const selectedProductId = localStorage.getItem("prodId");


  if (selectedProductId) {
  
      const PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

      fetch(PRODUCT_URL)
          .then(response => response.json())
          .then(productData => {
              // Mostrar la información del producto en la página
              displayProductDetails(productData);
          })
          .catch(error => {
              console.error("Error al cargar los datos del producto", error);
          });
  } else {
      // Si no se ha seleccionado un producto, mostrar un mensaje de error o redirigir a otra página
      document.getElementById("product-details-container").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
  }
});

function displayProductDetails(productData) {
  // Crear el contenido HTML para mostrar los detalles del producto
  const productHTML = `
      <h1 class="productTitulo">${productData.name}</h1>
      </br>
      </br>
      <div class="productInfo"
      <p><strong>Imagenes ilustrativas:</strong></p>
      </br>
      <div id="img" class="img"></div>
      </br>
      <p><strong>Precio:</strong> ${productData.currency} ${productData.cost}</p>
      <p><strong>Descripción:</strong> ${productData.description}</p>
      <p><strong>Cantidad Vendidos:</strong> ${productData.soldCount}</p>
      <p><strong>Categoria:</strong> ${productData.category}</p>
      </div>
  `;
  document.getElementById("product-details-container").innerHTML = productHTML;
  for (let i = 0; i < productData.images.length; i++){ //
    let img = `<img src="${productData.images[i]}">` //comillas para definir un string 
    document.getElementById("img").innerHTML += img
    //esto si se coloca arriba no iba a estar en el html por eso se coloca luego del get ele by id prod detail cont
  }
}

// funcion para mostrar comentarios //

document.addEventListener("DOMContentLoaded", function () {
  const selectedProductCommentsId = localStorage.getItem("prodId");

  if (selectedProductCommentsId) {
    const PRODUCTCOMMENTS_URL = `https://raw.githubusercontent.com/JaPCeibal/emercado-api/main/products_comments/${selectedProductCommentsId}.json`;

    fetch(PRODUCTCOMMENTS_URL)
      .then(response => response.json())
      .then(product_commentsData => {
        // Mostrar los comentarios del producto en la página
        displayProductComments(product_commentsData);
      })
      .catch(error => {
        console.error("Error al cargar los datos del producto", error);
      });
  } else {
    // Si no se ha seleccionado un producto, mostrar un mensaje de error o redirigir a otra página
    document.getElementById("product-details-comments").innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
  }
});

//////////// funcion para calificacion con estrellas //////////////

function createStarRating(score) {
  const starCount = 5; // Número total de estrellas
  const filledStars = Math.round(score); // Número de estrellas llenas. La funcion Math.round rendea a numeros enteros.

  let starRatingHTML = ''; // Cadena HTML para las estrellas

  // Creamos estrellas llenas
  for (let i = 0; i < filledStars; i++) {
    starRatingHTML += '<i class="fa fa-star"></i>'; // fa fa-star hace referencia a estrellas llenas
  }

  // Creamos las estrellas vacías (las que faltan)
  for (let i = filledStars; i < starCount; i++) {
    starRatingHTML += '<i class="fa fa-star-o"></i>'; // fa fa-star-o hace referencia a estrellas vacias
  }

  return starRatingHTML; // Devolver la cadena HTML de las estrellas
}



function displayProductComments(commentsData) {
  // Verifica si hay comentarios en los datos
  if (commentsData && commentsData.length > 0) {
    // Muestra los comentarios del producto
    let commentsHTML = "<p><strong>Comentarios:</strong></p>";

    commentsData.forEach(comment => {
      const starRatingHTML = createStarRating(comment.score); // Se crea la calificación con estrellas

      commentsHTML += `
        <div class="comment">
          <p><span class="user">${comment.user}</span> - ${comment.dateTime} <div class="star-rating">${starRatingHTML}</div></p>
          <p>${comment.description}</p> 
        </div>
      `;
    });

    document.getElementById("product-details-comments").innerHTML = commentsHTML;
  } else {
    console.error("No hay comentarios disponibles para este producto.");
  }
}




