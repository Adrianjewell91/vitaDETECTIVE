import { connect } from 'react-redux';
import ProductIndex from './product-index';
import { requestProducts } from '../../actions/product_actions';

const mapStateToProps = (state) => ({ 
    products: state.products 
});

const mapDispatchToProps = (dispatch) => ({ 
    requestProducts: (vitamin) => dispatch(requestProducts(vitamin))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);
