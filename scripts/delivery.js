import { state } from '../db.js'
// обновление дат доставки
export function updateDeliveryInterval(selectedProfucts) {
  const deliveryIntervalContainer = document.querySelector('.delivery__time')
  if (!deliveryIntervalContainer) return

  const dateImageMap = {}

  // очищаем контейнер
  deliveryIntervalContainer.innerHTML = ''

  // перебираем данные
  selectedProfucts.forEach((productId) => {
    const product = state.products.find((product) => product.id === productId)
    if (product && product.selected) {
      if (dateImageMap[product.details.date]) {
        // блок уже существует, добавляем только изображение
        const imgElement = document.createElement('img')
        imgElement.src = `${product.imgSrc}`
        imgElement.alt = `${product.title}`

        // создаем элемент с информацией о количестве товаров
        const countMarker = document.createElement('div')
        countMarker.classList.add('count-marker')
        countMarker.textContent = `${product.count}`

        // обертка для изображения с маркером
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('delivery__content-wrapper')
        imgContainer.classList.add(`id-${product.id}`)
        imgContainer.appendChild(imgElement)
        imgContainer.appendChild(countMarker)

        dateImageMap[product.details.date].imgContainer.appendChild(
          imgContainer
        )
      } else {
        const intervalElement = document.createElement('div')
        intervalElement.classList.add('delivery__interval')

        // дата доставки
        const dateElement = document.createElement('div')
        dateElement.classList.add('delivery__title')
        dateElement.textContent = product.details.date

        const imgElement = document.createElement('img')
        imgElement.src = `${product.imgSrc}`
        imgElement.alt = `${product.title}`

        // создаем элемент с информацией о количестве товаров
        const countMarker = document.createElement('div')
        countMarker.classList.add('count-marker')
        countMarker.textContent = `${product.count}`

        // обертка для изображения с маркером
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('delivery__content-wrapper')
        imgContainer.classList.add(`id-${product.id}`)
        imgContainer.appendChild(imgElement)
        imgContainer.appendChild(countMarker)

        // изображения
        const productsContainer = document.createElement('div')
        productsContainer.classList.add('delivery__content-img')
        productsContainer.appendChild(imgContainer)
        intervalElement.appendChild(dateElement)
        intervalElement.appendChild(productsContainer)

        deliveryIntervalContainer.appendChild(intervalElement)

        // сохраняем блок для данной даты
        dateImageMap[product.details.date] = {
          intervalElement,
          imgContainer,
        }
      }
    }
  })
}
