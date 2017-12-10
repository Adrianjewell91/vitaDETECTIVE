import React from 'react';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.match.url);
        const vitamin = this.props.match.url.slice(1);
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
