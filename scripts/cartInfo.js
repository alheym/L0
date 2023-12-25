import { getItemsCountText } from './utils/utils.js'

export function updateButtonText() {
  const checkbox = document.getElementById('paymentCheckbox')
  const paymentText = document.getElementById('paymentText')
  const submitButton = document.querySelector('.info__submit-button')

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      submitButton.textContent = 'Оплатить 2 101 063 сом'
      paymentText.style.display = 'none'
    } else {
      submitButton.textContent = 'Заказать'
      paymentText.style.display = 'block'
    }
  })
}

// информация о товарах в наличии
export function updateCartInfo() {
  const itemCountInputs = document.querySelectorAll('.cart__meta-counter-input')
  const totalItemCount = Array.from(itemCountInputs).reduce(
    (acc, input) => acc + parseInt(input.value, 10),
    0
  )

  const itemPriceElements = document.querySelectorAll('.cart__price-main-value')
  const totalPrice = Array.from(itemPriceElements).reduce(
    (acc, element) =>
      acc +
      parseFloat(element.textContent.replace(/\s/g, '').replace('сом', '')),
    0
  )

  const cartInfoElement = document.querySelector('.cart__menu-checkbox-info')
  cartInfoElement.textContent = `${getItemsCountText(
    totalItemCount
  )} · ${totalPrice.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$& ')} сом`
}

// информация о товарах, которые отсутствуют
export function updateOutStockInfo() {
  const outStockItems = document.querySelectorAll('.cart__item.outStock')
  const totalOutStockItems = outStockItems.length

  const outStockInfoElement = document.querySelector('.cart__outStock-title')
  outStockInfoElement.textContent = `Отсутствуют · ${getItemsCountText(
    totalOutStockItems
  )}`
}
