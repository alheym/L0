export function inputValidator() {
  const nameInput = document.getElementById('name')
  const surnameInput = document.getElementById('surname')
  const emailInput = document.getElementById('email')
  const telInput = document.getElementById('tel')
  const innInput = document.getElementById('inn')

  // обработчик инпутов
  const handleInput = (inputElement, validationFunction, errorMessage) => {
    let labelElement = inputElement.previousElementSibling
    let originalPlaceholder = inputElement.placeholder

    // обработчик фокуса на инпуте
    inputElement.addEventListener('focus', () => {
      labelElement.classList.add('focused')
      labelElement.textContent = originalPlaceholder
      inputElement.placeholder = ''
    })

    // обработчик потери фокуса инпутом
    inputElement.addEventListener('blur', () => {
      labelElement.classList.remove('focused')

      const inputValue = inputElement.value.trim()
      if (!validationFunction(inputValue)) {
        showError(inputElement, errorMessage)
      } else {
        hideError(inputElement)
      }

      if (inputElement.value === '') {
        inputElement.placeholder = originalPlaceholder
        labelElement.textContent = ''
      }
    })

    // обрабатываем только телефонный номер
    if (inputElement.id === 'tel') {
      inputElement.addEventListener('input', () => {
        let inputValue = inputElement.value.replace(/\s/g, '')

        // удаление всех символов, кроме цифр
        inputValue = inputValue.replace(/\D/g, '')

        // форматируем номер телефона с пробелами
        inputValue = inputValue
          .replace(/^\+?(\d{1})/, '+$1') // добавляем "+"
          .replace(/(\d{1})(\d{3})/, '$1 $2') // после первой цифры добавляем пробел
          .replace(/(\d{3})(\d{3})/, '$1 $2') // после трех цифр добавляем пробел
          .replace(/(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3') // разделяем последние две цифры пробелом

        // обрезаем до 30 символов
        inputValue = inputValue.slice(0, 30)

        // устанавливаем отформатированное значение
        inputElement.value = inputValue
      })
    }

    // обработка ИНН
    if (inputElement.id === 'inn') {
      inputElement.addEventListener('input', (event) => {
        let inputValue = event.target.value.replace(/\D/g, '') // Удаление всех символов, кроме цифр

        // Ограничение до 14 символов
        if (inputValue.length > 14) {
          inputValue = inputValue.slice(0, 14)
        }

        event.target.value = inputValue // Установка отформатированного значения
      })
    }
  }

  // отображение ошибки
  const showError = (inputElement, errorMessage) => {
    const warningElement = inputElement.nextElementSibling
    inputElement.classList.add('invalid')
    warningElement.textContent = errorMessage
  }

  // окрытие ошибки
  const hideError = (inputElement) => {
    const warningElement = inputElement.nextElementSibling
    inputElement.classList.remove('invalid')
    warningElement.textContent = ''
  }

  // проверка кириллицы
  const isCyrillic = (value) => /^[а-яА-Я]+$/.test(value)
  // проверка номера телефона: +9 999 999 99 99
  const isPhoneNumberValid = (value) =>
    /^\+\d{1}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(value)

  handleInput(nameInput, isCyrillic, 'Укажите имя')
  handleInput(surnameInput, isCyrillic, 'Введите фамилию')
  handleInput(
    emailInput,
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Проверьте адрес электронной почты'
  )
  handleInput(telInput, isPhoneNumberValid, 'Формат: +9 999 999 99 99')
  handleInput(innInput, (value) => /^\d{14}$/.test(value), 'Проверьте ИНН')
}
