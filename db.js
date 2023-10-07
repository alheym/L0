export const state = {
  products: [
    {
      id: 1,
      selected: true,
      count: 1,
      favorite: false,
      title: "Футболка UZcotton мужская",
      price: {
        original: 1051,
        discount: 529,
        finalPrice: "522",
        oldPrice: "1051",
      },
      discounts: {
        product: 55,
        personal: 10,
      },
      imgSrc: "./assets/images/Tshirt.png",
      details: {
        color: "белый",
        size: 56,
        remains: 2,
        date: "5—6 февраля",
      },
      location: "Коледино WB",
      seller: {
        title: "OOO Вайлдберриз",
        orgn: "4567746237148",
        address: "109028, Москва, Серебряническая набережная, 29",
      },
    },
    {
      id: 2,
      selected: true,
      count: 200,
      favorite: false,
      title:
        "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
      price: {
        original: 115000,
        discount: 5175,
        finalPrice: "2 100 047",
        oldPrice: "2 300 047",
      },
      discounts: {
        product: 30,
        personal: 10,
      },
      imgSrc: "./assets/images/Case.png",
      details: {
        color: "прозрачный",
        date: "5—6 февраля",
      },
      location: "Коледино WB",
      seller: {
        title: "OOO Мегапрофстиль",
        orgn: "5167746237148",
        address:
          "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
      },
    },
    {
      id: 3,
      selected: true,
      count: 2,
      favorite: false,
      title: `Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell`,
      price: {
        original: 475,
        discount: 290,
        finalPrice: "494",
        oldPrice: "950",
      },
      discounts: {
        product: 38,
        personal: 10,
      },
      imgSrc: "./assets/images/Fiber.png",
      details: {
        remains: 2,
        date: "7—8 февраля",
      },
      location: "Коледино WB",
      seller: {
        title: "OOO Вайлдберриз",
        orgn: "1267746237148",
        address: "109028, Москва, Серебряническая набережная, 29",
      },
    },
  ],
};
