export const formTemplate = `
<form id="add-form" class="form">
  <h3 class="form__title">Отзыв:</h3>
  <div class="form__row">
    <input type="text" placeholder="Укажите ваше имя" name="author" class="form__input">
  </div>
  <div class="form__row">
    <input type="text" placeholder="Укажите место" name="place" class="form__input">
  </div>
  <div class="form__row">
    <textarea placeholder="Оставить отзыв" name="review" class="form__input form__input--textarea"></textarea>
  </div>
  <button id="add-btn" class="btn">Добавить</button>
</form>
`;
