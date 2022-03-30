import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { userService } from './user-service.js'
import { httpService } from './http.service.js'



const ORDERS_KEY = 'ordersDB'
const ENDPOINT = 'order'

export const orderService = {
    add,
    query,
    getById,
    getEmptyOrder
}



async function query() {
    try {
        return await httpService.get(ENDPOINT)
    } catch {
        console.error('cannot load orders')
    }
}



async function getById(entityId) {
    try {
        return await httpService.get(`${ENDPOINT}/${entityId}`)
    } catch {
        console.error('cannot load order')
    }
}


async function add(orderDetails) {
    try{
        if (orderDetails._id) {
            orderDetails = await httpService.put(`${ENDPOINT}/${orderDetails._id}`, orderDetails);
            return orderDetails
        } 
           else{
            const addedOrder = await httpService.post(ENDPOINT, orderDetails)
            return addedOrder
           } 

    } catch {
        console.error('cannot load order')
    }
   
      
}

function getEmptyOrder() {
    const key = utilService.getRandomInt(0, 50)
    return {
        name: '',
        country: '',
        guestName: userService.getLoggedinUser().fullname,
        stay_id: '',
        pricePerNight: '',
        guests: '',
        stayTime: '',
        status: 'Pending',
        ImgUrl: `https://i.pravatar.cc/150?img=${key}`
    };


}