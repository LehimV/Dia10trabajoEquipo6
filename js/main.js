import data from "./data.js";
import dom from "./dom.js";

const URL = "https://api.escuelajs.co/api/v1/products";

// // Traemos el elemento products por su id
// const products = dom.$('#products');

const datos = await data.getData(URL);

// Obten las categorias de los productos
const categories = data.getCategories(datos);

// Insertar las categorias
dom.addCategories(categories);

// Seleccoiona la lista de categorias
const catList = [...dom.$("#categories").children];
let catActive = 0;

// Añadimos los eventos a cada elemento de categoria
catList.forEach((categorie, index) => {
  categorie.addEventListener("click", () => {
    // Si existe la clase, termina la function
    if (categorie.classList.contains("act-categorie")) return;

    // Si no existe, continuamos con la funcion
    categorie.classList.add("act-categorie");

    // Seleccionamos el nodo que tenía la clase activo
    let old = catList[catActive];

    // Removemos la clase activo del nodo antiguo
    old.classList.remove("act-categorie");

    catActive = index;

    // Obtenemos el filtro
    let filtro = categorie.textContent;

    // Filtra por Categorita
    const filtered = filtro === "All" ? datos : data.filtrar(datos, filtro);

    dom.showCards(filtered);
  });
});

// Filtro en el input por nombre

const searchProduct = dom.$("#search-product");

searchProduct.addEventListener("keyup", () => {
  let filtro = searchProduct.value;

  const filtered = filtro === "" ? datos : data.filterByName(datos, filtro);

  dom.showCards(filtered);
});

dom.showCards(datos);

let cardDoom = [...document.querySelector(".card-img").children];
let imgCart = cardDoom[1].childNodes[3].childNodes[1];

imgCart.addEventListener("click", () => {
  if (imgCart.src.includes("/img/icons/bt_add_to_cart.svg")) {
    imgCart.src = "./img/icons/bt_added_to_cart.svg";
    return;
  }

  imgCart.src = "./img/icons/bt_add_to_cart.svg";
});

imgCart.addEventListener("click", () => {
  if (imgCart.src.includes("/img/icons/bt_add_to_cart.svg")) {
    let notification = document.querySelector("#notificacion");
    notification.innerHTML = `0`;
  } else if (imgCart.src.includes("/img/icons/bt_added_to_cart.svg")) {
    let notification = document.querySelector("#notificacion");
    notification.innerHTML = `1`;
  }
});
// const newImage = (imgCart) => {
//   imgCart = cardDoom[1].childNodes[3].childNodes[1];
//   const newImg = ;

//   const imgChanges = imgCart.setAtribute("src", newImg);

//   return imgChanges;
// };

// //ruta de imagen

// console.log(imgCart);

// datos.forEach( element => {
//   // Creamos el card con la informacion del elemento
//   const card = dom.newCard(element);

//   // Agregamos el card al elemento products
//   products.appendChild(card);
// })
