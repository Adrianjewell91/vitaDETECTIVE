import React from 'react';
import aws from 'aws-lib';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

        let prodAdv = aws.createProdAdvClient('AKIAIV5LBVLYWEEHDY6Q', 'AHU68vB//Ask3AgqyWWbPoagus5oBvFFTciRopnz', 'vitadetective-20');

        let options = { SearchIndex: "Books", Keywords: "Javascript" }
        
        prodAdv.call("ItemSearch", options, function(err, result) {
            console.log(result);
        });
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