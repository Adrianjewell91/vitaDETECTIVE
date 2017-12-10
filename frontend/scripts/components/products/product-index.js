import React from 'react';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Items: [] }
    }

    componentDidMount() {
        const vitamin = 'Vitamin C';
        this.props.requestProducts(vitamin).then(res => this.setState({ Items: res.products.Items.Item }));
    }

    render() {
        console.log(this.state.Items);
        return (
            <div className="products-container">
                <div className="products-inner-container">
                    { Object.values(this.state.Items).map((item) => {
                        const URL = item.ImageSets.ImageSet;
                        let imageURL;
                        if (URL instanceof Array) {
                            URL.forEach((imageSet) => {
                                if (imageSet['@'].Category === 'primary') {
                                    imageURL = imageSet.MediumImage.URL;
                                }
                            })
                        } else {
                            imageURL = URL.MediumImage.URL;
                        }
                        return <div className="item-container" key={item.ASIN}>
                                    <img src={ imageURL }></img>
                                    <h3>{ item.ItemAttributes.Brand }</h3>
                                    <h3>{ item.ItemAttributes.Title}</h3>
                                </div>
                      })
                    }
                </div>
            </div>
        );
    }
}

export default ProductIndex;