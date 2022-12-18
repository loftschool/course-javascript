/* eslint-disable prettier/prettier */
export const getReviews = () => {
    const reviews = localStorage.reviews

    return JSON.parse(reviews || "[]")
}

export const addReview = review => {
    localStorage.reviews = JSON.stringify([...getReviews(), review])
}



