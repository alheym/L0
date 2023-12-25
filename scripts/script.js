import { state } from '../db.js'
import { updateButtonText, updateCartInfo } from './cartInfo.js'
import { createCartItemElement } from './cartListItem.js'
import { productCheckboxes } from './checkboxes.js'
import { productCounter } from './counter.js'
import { handlerDeliveryModal, handlerPaymentModal } from './modal.js'
import { inputValidator } from './validate.js'

const cartList = document.querySelector('.cart__list-inStock')
const cartListOutStock = document.querySelector('.cart__list-outStock')
const menuArrow = document.querySelector('.cart__menu-arrow')
const outStockArrow = document.querySelector('.outStock-arrow')
const menuText = document.querySelector('.cart__menu-checkbox')
const menuHidenText = document.querySelector('.cart__menu-checkbox-info')

menuArrow.addEventListener('click', () => {
  cartList.classList.toggle('collapsed')
  menuText.classList.toggle('collapsed-info')
  menuHidenText.classList.toggle('info-count')

  menuArrow.classList.toggle('rotate')
  updateCartInfo()
})

outStockArrow.addEventListener('click', () => {
  cartListOutStock.classList.toggle('collapsed')

  outStockArrow.classList.toggle('rotate')
  updateOutStockInfo()
})

for (const item of state.products) {
  const cartItem = createCartItemElement(item, true)
  cartList.appendChild(cartItem)
}

for (const item of state.products) {
  const cartItemOutStock = createCartItemElement(item, false)
  cartListOutStock.appendChild(cartItemOutStock)
}

// обработчики для кнопок
const deliveryChangeButtons = document.querySelectorAll(
  '.delivery-address-change'
)
const paymentChangeButtons = document.querySelectorAll('.payment-change')

deliveryChangeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handlerDeliveryModal()
  })
})

paymentChangeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handlerPaymentModal()
  })
})

updateButtonText()
productCounter()
productCheckboxes()
inputValidator()
