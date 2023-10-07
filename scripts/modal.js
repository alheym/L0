export function handlerDeliveryModal() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const modalElement = document.createElement("div");
  modalElement.className = "modal";

  // созднание контента модального окна
  modalElement.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    Способ доставки
    <button class="modal-close-button" id="close-modal"></button>
  </div>
  <div class="modal-body">
    <div class="modal-variants">
      <button class="pickup-point">В пункт выдачи</button>
      <button class="courier">Курьером</button>
    </div>
    <div class="modal-addresses">
      Мои адреса
      <div class="modal-addresses-list" id="modal-addresses-pickup">
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>
                г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/2
              </p>
              <span class="modal-rating">
                <img src="./assets/icons/star.svg" alt="star" />
                <span>4.99</span>
                Пункт выдачи
              </span>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>
                г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/2
              </p>
              <span class="modal-rating">
                <img src="./assets/icons/star.svg" alt="star" />
                <span>4.99</span>
                Пункт выдачи
              </span>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>г. Бишкек, улица Табышалиева, д. 57</p>
              <span class="modal-rating">
                <img src="./assets/icons/star.svg" alt="star" />
                <span>4.99</span>
                Пункт выдачи
              </span>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
      </div>
      <div class="modal-addresses-list" id="modal-addresses-courier">
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>
                г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/2
              </p>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>
                г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/2
              </p>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
        <div class="modal-addresses-list-item">
          <div class="modal-address">
            <input
              type="radio"
              class="input-radio delivery-radio"
              name="delivery-address"
              id="delivery-address-1"
              checked
            />
            <div class="modal-address-info">
              <p>г. Бишкек, улица Табышалиева, д. 57</p>
            </div>
          </div>
          <div class="delete-address">
            <button class="delete-address-button" title="Удалить">
              <img src="./assets/icons/delete-address.svg" alt="delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-save">Выбрать</button>
</div>
  `;

  // добавляем модальное окно на страницу
  overlay.appendChild(modalElement);
  document.body.appendChild(overlay);

  // обработчик для кнопки закрытия
  const closeButton = document.getElementById("close-modal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  }

  const deleteButtons = document.querySelectorAll(".delete-address-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const listItem = button.closest(".modal-addresses-list-item");

      if (listItem) {
        listItem.remove();
      }
    });
  });

  const variantButtons = document.querySelectorAll(".modal-variants button");
  variantButtons.forEach((button) => {
    button.addEventListener("click", () => {
      variantButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const pickupAddresses = document.getElementById("modal-addresses-pickup");
      const courierAddresses = document.getElementById(
        "modal-addresses-courier"
      );

      // показываем/скрываем соответствующий список адресов
      if (button.classList.contains("pickup-point")) {
        pickupAddresses.style.display = "flex";
        courierAddresses.style.display = "none";
      } else if (button.classList.contains("courier")) {
        pickupAddresses.style.display = "none";
        courierAddresses.style.display = "flex";
      }
    });
  });
}

export function handlerPaymentModal() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const modalElement = document.createElement("div");
  modalElement.className = "modal";
  modalElement.classList.add("modal-payments");

  modalElement.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    Способ оплаты
    <button class="modal-close-button" id="close-modal"></button>
  </div>
  <div class="modal-body">
    <div class="modal-payments">
      <div class="modal-payments-list">
        <div class="modal-payments-list-item">
          <div class="modal-payment">
            <input type="radio" class="input-radio payment-radio" name="payment-card" />
            <div class="modal-payment-info">
              <img src="./assets/icons/mir.svg" alt="mir" />
              <p>1234 56•• •••• 1234</p>
            </div>
          </div>
        </div>
        <div class="modal-payments-list-item">
          <div class="modal-payment">
            <input type="radio" class="input-radio payment-radio" name="payment-card" />
            <div class="modal-payment-info">
              <img src="./assets/icons/visa.svg" alt="visa" />
              <p>1234 56•• •••• 1234</p>
            </div>
          </div>
        </div>
        <div class="modal-payments-list-item">
          <div class="modal-payment">
            <input type="radio" class="input-radio payment-radio" name="payment-card" />
            <div class="modal-payment-info">
              <img src="./assets/icons/maestro.svg" alt="maestro" />
              <p>1234 56•• •••• 1234</p>
            </div>
          </div>
        </div>
        <div class="modal-payments-list-item">
          <div class="modal-payment">
            <input type="radio" class="input-radio payment-radio" name="payment-card" />
            <div class="modal-payment-info">
              <img src="./assets/icons/mastercard.svg" alt="maestro" />
              <p>1234 56•• •••• 1234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button class="modal-save">Выбрать</button>
</div>
    `;

  overlay.appendChild(modalElement);
  document.body.appendChild(overlay);

  const closeButton = document.getElementById("close-modal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  }
}
