import { updateOutStockInfo, updateCartInfo } from "./cartInfo.js";

// создание карточек товаров
export function createCartItemElement(item, inStock = true) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  if (!inStock) {
    cartItem.classList.add("outStock");
  }

  let itemDetail = "";
  if (item.details.color) {
    itemDetail += `<div class="cart__item-color">Цвет: ${item.details.color}</div>`;
  }

  console.log(window.innerWidth);
  // Проверка ширины экрана для отображения элемента с или без текста "Размер"
  if (item.details.size && window.innerWidth < 768) {
    itemDetail += `<div class="cart__item-size">${item.details.size}</div>`;
  } else {
    if (item.details.size) {
      itemDetail += `<div class="cart__item-size">Размер: ${item.details.size}</div>`;
    }
  }

  let itemRemains = "";

  if (item.details.remains) {
    itemRemains = `<div class="cart__meta-remains">Осталось ${item.details.remains} шт.</div>`;
  }

  const priceClass = item.price.finalPrice.length > 5 ? "small" : "";

  let noRemainsClass = "";

  const noDetailClass =
    item.details.size || item.details.color ? "" : "noDetail";

  if (inStock) {
    noRemainsClass = item.details.remains ? "" : "noRemains";
  }

  const bigItemClass = item.id === 3 ? "big" : "";

  const sellerInfo = item.seller
    ? `<div class="seller-info-text">
    <div class="seller-info-title">${item.seller.title}</div>

    <div class="seller-info-orgn">ОГРН: ${item.seller.orgn}</div>
    <div class="seller-info-address">${item.seller.address}</div>
    </div>`
    : "";

  let discountPercentage = parseFloat(item.discounts.product);

  let oldPrice = parseFloat(item.price.oldPrice.replace(/\s/g, ""));

  const count = item.count || 1;
  if (count !== 1) {
    oldPrice /= count;
  }

  let discountAmount = Math.round((discountPercentage / 100) * oldPrice);

  let discountUser = Math.round(0.1 * oldPrice);

  cartItem.innerHTML = `
    <div class="cart__item ${bigItemClass} ${inStock ? "" : "outStock"}">
      <div class="cart__main">
      ${
        inStock
          ? `<input type="checkbox" data-id="${item.id}" class="itemCheckbox"/>`
          : ""
      }
        <img src="${item.imgSrc}" alt="" class="cart__main-img ${
    inStock ? "" : "outStock"
  }" />
        <div class="cart__item-info ${priceClass} ${inStock ? "" : "outStock"}">
          <p class="cart__item-title ${
            inStock ? "" : "outStock"
          } ${bigItemClass}">${item.title}</p>
          <div class="cart__item-detail">
            ${itemDetail}
          </div>
          ${
            inStock
              ? `      
              <div class="cart__item-descr ${noDetailClass}">
                <div class="cart__item-location">${item.location}</div>
                  <div class="cart__item-seller">${item.seller.title}
                      <div class="seller-info">
                      <img src="./assets/icons/info.svg" alt="info" />
                      ${sellerInfo}
                </div>
              </div>       
              </div>
              `
              : ""
          }
        </div>
      </div>
      <div class="cart__meta ${
        inStock ? "" : "outStock"
      }">
        <div class="cart__meta-controls">
        ${
          inStock
            ? ` <div class="cart__meta-counter">
                <button type="button" class="cart__meta-counter-minus">
                  −
                </button>
                <input
                  type="number"
                  value="${item.count}"
                  min="1"
                  ${item.details.remains ? `max="${item.details.remains}"` : ""}
                  maxlength="3"
                  class="cart__meta-counter-input"
                />
                <button type="button" class="cart__meta-counter-plus">
                  +
                </button>
              </div>`
            : ""
        }
        ${
          inStock
            ? `
            <div class="cart__meta-remains">${itemRemains}</div>`
            : ""
        }
          <div class="cart__meta-button ${noRemainsClass} ${bigItemClass}">
            <button class="cart__meta-button-favorite" title="В избранное">
            <img src="./assets/icons/favorite.svg" alt="delete" />
            </button>
            <button class="cart__meta-button-delete" title="Удалить">
              <img src="./assets/icons/delete.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="cart__price ${priceClass}">
          ${
            inStock
              ? `
            <div class="cart__price-main">
            <div class="cart__price-main-value ${priceClass}">${item.price.finalPrice}</div>
            <div class="cart__price-main-currency">сом</div></div>
            <div class="cart__price-old ${priceClass}">
            <div class="cart__price-old-value ${priceClass}">${item.price.oldPrice} </div>
            <div class="cart__price-old-currency">сом</div>
            <div class="cart__price-info">

            <div class="cart__price-discount">Скидка ${item.discounts.product}%<span> −${discountAmount} сом</span>
            </div>

            <div class="cart__price-discount">Скидка покупателя 10%<span>−${discountUser} сом</span>
            </div>

            </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;

  // добавление/удаление элементов
  const favoriteButton = cartItem.querySelector(".cart__meta-button-favorite");
  const deleteButton = cartItem.querySelector(".cart__meta-button-delete");

  favoriteButton.addEventListener("click", () => {
    favoriteButton.classList.toggle("active");
  });

  deleteButton.addEventListener("click", () => {
    cartItem.remove();
    const deliveryElements = document.querySelectorAll(`.id-${item.id}`);
    deliveryElements.forEach((element) => element.remove());
    updateCartInfo();
    updateOutStockInfo();
  });

  return cartItem;
}
