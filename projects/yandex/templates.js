/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
export const formTemplate = `
<form id="add-form">
    <input type="text" placeholder="Название места" name="place"><br><br>
    <input type="text" placeholder="Ваше имя" name="author"><br><br>
    <textarea placeholder="Ваш отзыв" name="review"></textarea><br><br>
    <button id="add-btn">Добавить</button><br>
</form>
`

export const reviewTemplate = review => {
    return `
        <div class="review">
            <div><strong>Место: </strong>${review.place}</div>
            <div><strong>Имя: </strong>${review.author}</div>
            <div><strong>Отзыв: </strong>${review.reviewText}</div>
        </div>
    `
}