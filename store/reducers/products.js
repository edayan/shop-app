import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODCUT } from '../actions/products'
const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODCUT:
            const productId = action.pid;
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id === productId),
                availableProducts: state.availableProducts.filter(product => product.id === productId)
            }
    }
    return state;
}