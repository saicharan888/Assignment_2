var contentNode = document.getElementById('contents');

class ProductAvailable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => React.createElement(ProductRow, { key: product.id, product: product }));
    return React.createElement(
      "table",
      { className: "bordered-table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Product Name"
          ),
          React.createElement(
            "th",
            null,
            "Price"
          ),
          React.createElement(
            "th",
            null,
            "Category"
          ),
          React.createElement(
            "th",
            null,
            "Image"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        productRows
      )
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        product.name
      ),
      React.createElement(
        "td",
        null,
        "$",
        product.price
      ),
      React.createElement(
        "td",
        null,
        product.category
      ),
      React.createElement(
        "td",
        null,
        React.createElement(
          "a",
          { href: product.image, target: "_blank" },
          " View"
        )
      )
    );
  }
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var form = document.forms.productAdd;
    this.props.createProduct({
      id: form.id.value,
      name: form.productName.value,
      price: form.price.value,
      category: form.category.value,
      image: form.imageURL.value
    });
    form.productName.value = '';
    form.price.value = '';
    form.imageURL.value = '';
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "productAdd", onSubmit: this.onSubmit },
        React.createElement(
          "div",
          { className: "gridview" },
          React.createElement(
            "label",
            null,
            "Category"
          ),
          React.createElement("br", null),
          React.createElement(
            "select",
            { name: "category" },
            React.createElement(
              "option",
              { value: "Shirts" },
              "Shirts"
            ),
            React.createElement(
              "option",
              { value: "Jeans" },
              "Jeans"
            ),
            React.createElement(
              "option",
              { value: "Jackets" },
              "Jackets"
            ),
            React.createElement(
              "option",
              { value: "Sweaters" },
              "Sweaters"
            ),
            React.createElement(
              "option",
              { value: "Accessories" },
              "Accessories"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "gridview" },
          React.createElement(
            "label",
            null,
            "Price Per Unit "
          ),
          " ",
          React.createElement("br", null),
          React.createElement("input", { type: "text", name: "price", placeholder: "$" })
        ),
        React.createElement(
          "div",
          { className: "gridview" },
          React.createElement(
            "label",
            null,
            " Product Name"
          ),
          React.createElement("br", null),
          React.createElement("input", { type: "text", name: "productName" })
        ),
        React.createElement(
          "div",
          { className: "gridview" },
          React.createElement(
            "label",
            null,
            "Image URL"
          ),
          React.createElement("br", null),
          React.createElement("input", { type: "text", name: "imageURL", placeholder: "URL" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { type: "submit" },
            "Add Product"
          )
        )
      )
    );
  }
}

const products = [];

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ products: products });
    }, 500);
  }

  createProduct(newProduct) {
    const newProducts = this.state.products.slice();
    newProduct.id = this.state.products.length + 1;
    newProducts.push(newProduct);
    this.setState({ products: newProducts });
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "My Company Inventory"
      ),
      React.createElement(
        "h2",
        null,
        "Showing all available products"
      ),
      React.createElement("hr", null),
      React.createElement(ProductAvailable, { products: this.state.products }),
      React.createElement(
        "h2",
        null,
        "Add a new product to inventory"
      ),
      React.createElement("hr", null),
      React.createElement(ProductAdd, { createProduct: this.createProduct })
    );
  }
}
ReactDOM.render(React.createElement(ProductList, null), contentNode);