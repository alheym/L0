import { updateDeliveryInterval } from './delivery.js'
import { getItemsCountText } from './utils/utils.js'

export let updateTotalPrice

export function productCheckboxes() {
  const selectAllCheckbox = document.getElementById('selectAllCheckbox')
  const itemCheckboxes = document.querySelectorAll('.itemCheckbox')
  const totalPriceElement = document.getElementById('totalPrice')
  const submitButton = document.querySelector('.info__submit-button')
  const totalDiscountCart = document.getElementById('totalDiscount')
  const totalPriceOldElement = document.getElementById('totalPriceOld')
  const totalCount = document.getElementById('totalCount')
  const checkbox = document.getElementById('paymentCheckbox')

  updateTotalPrice = function () {
    let totalPrice = 0
    let totalDiscount = 0
    let totalItemCount = 0
    let totalPriceOld = 0

    itemCheckboxes.forEach((itemCheckbox, index) => {
      if (itemCheckbox.checked && !itemCheckbox.disabled) {
        const itemPriceElement =
          document.querySelectorAll('.cart__price-main')[index]
        const itemPriceOldElement =
          document.querySelectorAll('.cart__price-old')[index]
        const itemPrice = parseFloat(
          itemPriceElement.textContent.replace(/\s/g, '').replace(' сом', '')
        )
        const itemPriceOld = parseFloat(
          itemPriceOldElement.textContent.replace(/\s/g, '').replace(' сом', '')
        )

        let discountValue = itemPriceOld - itemPrice

        const itemCountInput = document.querySelectorAll(
          '.cart__meta-counter-input'
        )[index]
        const itemCount = parseInt(itemCountInput.value, 10)

        totalItemCount += itemCount
        totalPrice += itemPrice
        totalDiscount += discountValue
        totalPriceOld += itemPriceOld
      }
    })

    if (totalPriceOld > 0) {
      totalPriceOldElement.textContent = `${totalPriceOld
        .toFixed(0)
        .replace(/\d(?=(\d{3})+$)/g, '$& ')} сом`
    } else {
      totalPriceOldElement.textContent = '0 сом'
    }

    totalCount.textContent = getItemsCountText(totalItemCount)

    totalPriceElement.textContent = `${totalPrice
      .toFixed(0)
      .replace(/\d(?=(\d{3})+$)/g, '$& ')}`

    if (checkbox.checked) {
      const price = `${totalPrice
        .toFixed(0)
        .replace(/\d(?=(\d{3})+$)/g, '$& ')}`
      submitButton.textContent = `Оплатить ${price} сом`
    }

    if (totalDiscount > 0) {
      totalDiscountCart.textContent = `−${totalDiscount
        .toFixed(0)
        .replace(/\d(?=(\d{3})+$)/g, '$& ')} сом`
    } else {
      totalDiscountCart.textContent = '0 сом'
    }
  }

  selectAllCheckbox.addEventListener('change', function () {
    const isChecked = this.checked
    itemCheckboxes.forEach((itemCheckbox) => {
      if (!itemCheckbox.disabled) {
        itemCheckbox.checked = isChecked
      }
    })
    const selectedProducts = Array.from(itemCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => parseInt(checkbox.getAttribute('data-id')))
    updateTotalPrice()
    updateDeliveryInterval(selectedProducts)
  })

  itemCheckboxes.forEach((itemCheckbox) => {
    itemCheckbox.addEventListener('change', function () {
      selectAllCheckbox.checked = [...itemCheckboxes].every(
        (checkbox) => checkbox.checked && !checkbox.disabled
      )
      const selectedProducts = Array.from(itemCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => parseInt(checkbox.getAttribute('data-id')))
      updateTotalPrice()
      updateDeliveryInterval(selectedProducts)
    })
  })
}
