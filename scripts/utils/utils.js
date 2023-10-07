// Функция для получения правильного склонения слова "товар"
export function getItemsCountText(count) {
  const cases = [2, 0, 1, 1, 1, 2];
  return `${count} ${
    ["товар", "товара", "товаров"][
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
    ]
  }`;
}
