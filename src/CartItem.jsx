import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ item, quantity }) => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const cost = typeof item.cost === 'string' ?
                parseFloat(item.cost.replace('$', '')) :
                item.cost;
            return total + (item.quantity * cost);
        }, 0).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            handleRemove(item);
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const calculateTotalCost = (item) => {
        const cost = typeof item.cost === 'string' ?
            parseFloat(item.cost.replace('$', '')) :
            item.cost;
        return (item.quantity * cost).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map((item) => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">Unit Price: ${typeof item.cost === 'string' ? item.cost.replace('$', '') : item.cost}</div>
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
                Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button1">
                    Checkout
                </button>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
    quantity: PropTypes.number.isRequired
};

export default CartItem;