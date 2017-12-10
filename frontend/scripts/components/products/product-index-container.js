import { connect } from 'react-redux';
import ProductIndex from './product-index';

const mapStateToProps = (state) => ({ 
    products: state.products 
});

const mapDispatchToProps = (dispatch) => ({ 
    fetchProducts: (vitamin) => dispatch(fetchProducts(vitamin))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);