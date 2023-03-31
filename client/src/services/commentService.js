import { customAxiosWithAuth } from './api'

export async function deleteCommentFromOrder(commentId, orderId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.delete(`/comments/p/${orderId}/c/${commentId}`)
    } catch(err) {
        console.log(err.message)
    }
}

export async function createCommentForOrder(comment, orderId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post(`/comments/p/${orderId}`, comment)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function getCommentFromOrder(commentId, orderId) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.get(`/comments/p/${orderId}/c/${commentId}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateCommentOfIdFromOrder(comment, commentId, orderId) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/comments/p/${orderId}/c/${commentId}`, comment)
    } catch(err) {
        console.log(err.message)
    }
}