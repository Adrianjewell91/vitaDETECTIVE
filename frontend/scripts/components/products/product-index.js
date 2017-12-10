import React from 'react';

class ProductIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Items: [] }
    }

    componentDidMount() {
        const vitamin = this.props.match.url.slice(1);
        this.props.requestProducts(vitamin).then(res => this.setState({ Items: res.products.Items.Item }));
    }

    render() {
        return (
            <div className="top-level">
                <div className="header-container">
                    <h1 className="header">Vita-Detective Suggested Supplements</h1>
                </div>
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
                                    <div className="image-container">
                                        <img src={ imageURL }></img>
                                    </div>
                                    <h5 className="brand">{ item.ItemAttributes.Brand }</h5>
                                    <h5 className="product-title">{ item.ItemAttributes.Title}</h5>
                                    <a href={item.DetailPageURL} className="amazon-link">Shop on Amazon</a>
                                </div>
                      })
                    }
                </div>
            </div>
            </div>
        );
    }
}

export default ProductIndex;
