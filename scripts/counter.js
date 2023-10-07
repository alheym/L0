import { updateTotalPrice } from "./checkboxes.js";

export function productCounter() {
  const plusButtons = document.querySelectorAll(".cart__meta-counter-plus");
  const minusButtons = document.querySelectorAll(".cart__meta-counter-minus");

  plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      incrementCounter(index);
      updateTotalPrice();
    });
  });

  minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      decrementCounter(index);
      updateTotalPrice();
    });
  });
}

function incrementCounter(index) {
  const itemCountInput = document.querySelectorAll(".cart__meta-counter-input")[
    index
  ];
  let currentValue = parseInt(itemCountInput.value, 10);
  const maxCount = parseInt(itemCountInput.getAttribute("max"), 10);

  if (!maxCount || currentValue < maxCount) {
    itemCountInput.value = currentValue + 1;
    updatePrice(index);
  }
}

function decrementCounter(index) {
  const itemCountInput = document.querySelectorAll(".cart__meta-counter-input")[
    index
  ];
  let currentValue = parseInt(itemCountInput.value, 10);
  const minCount = parseInt(itemCountInput.getAttribute("min"), 10);

  if (!isNaN(minCount) && currentValue > minCount) {
    itemCountInput.value = currentValue - 1;
    updatePrice(index);
  }
}

let unitPrices = [];

function updatePrice(index) {
  const itemCountInput = document.querySelectorAll(".cart__meta-counter-input")[
    index
  ];
  const itemPriceElement = document.querySelectorAll(".cart__price-main-value")[
    index
  ];
  const itemPriceOldElement = document.querySelectorAll(
    ".cart__price-old-value",
  )[index];

  if (typeof unitPrices[index] === "undefined") {
    const itemPrice = parseFloat(
      itemPriceElement.textContent.replace(/\s/g, "").replace(" сом", ""),
    );
    const itemCount = parseInt(itemCountInput.getAttribute("value"), 10);
    const unitPrice = itemPrice / itemCount;
    unitPrices[index] = unitPrice;
  }

  const currentValue = parseInt(itemCountInput.value, 10);

  let productPrice, productPriceOld;

  if (currentValue > 0) {
    productPrice = Math.round(unitPrices[index] * currentValue);
    productPriceOld = Math.round(
      (parseFloat(
        itemPriceOldElement.textContent.replace(/\s/g, "").replace(" сом", ""),
      ) /
        parseFloat(itemCountInput.getAttribute("value"))) *
        currentValue,
    );
  } else {
    productPrice = parseFloat(
      itemPriceElement.textContent.replace(/\s/g, "").replace(" сом", ""),
    );
    productPriceOld = parseFloat(
      itemPriceOldElement.textContent.replace(/\s/g, "").replace(" сом", ""),
    );
  }

  itemPriceElement.textContent = `${productPrice
    .toFixed(0)
    .replace(/\d(?=(\d{3})+$)/g, "$& ")}`;
  itemPriceOldElement.textContent = `${productPriceOld
    .toFixed(0)
    .replace(/\d(?=(\d{3})+$)/g, "$& ")}`;
}
