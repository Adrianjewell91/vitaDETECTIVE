import { connect } from 'react-redux';
import ProductIndex from './product-index';

const mapStateToProps = (state) => ({ 
    products: state.products 
});

const mapDispatchToProps = (dispatch) => ({ 
    fetchProducts: () => dispatch(fetchProducts)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);