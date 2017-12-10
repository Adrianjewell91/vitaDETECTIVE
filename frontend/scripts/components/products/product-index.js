import React from 'react';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const vitamin = 'Vitamin A';
        this.props.requestProducts(vitamin).then(res => console.log(res));
    }

    render() {
        return (
            <div>
                <h1>I am the Product Index</h1>
            </div>
        );
    }
}

export default ProductIndex;