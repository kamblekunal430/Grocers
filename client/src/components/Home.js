import { Component } from "react";
import AppNavbar from "./AppNavbar";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  Button,
  CardFooter,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { postCartItem } from "../actions/cartActions";
import { postWishlistItem } from "../actions/wishlistActions";
import UpdateItem from "./UpdateItem";

class Home extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    postCartItem: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
    postWishlistItem: PropTypes.func.isRequired,
  };

  onAddToCart = async (id, itemId) => {
    await this.props.postCartItem(id, itemId, 1);
    alert("Item added to Cart");
  };

  onPostWishlistItem = async (id, itemId) => {
    await this.props.postWishlistItem(id, itemId);
    alert("Item Wishlisted");
  };

  onDeleteItem = async (itemId) => {
    var res = window.confirm("Confirm Delete Item");
    if (res) {
      await this.props.deleteItem(itemId);
    }
  };
  onUpdateItem = async (itemId) => {
    //await this.props.updateItem(itemId);
  };
  render() {
    const { items } = this.props.item;
    const user = this.props.user;
    return (
      <div>
        <AppNavbar />
        <Container>
          <div className="row">
            {items.map((item) => (
              <div className="col-md-3">
                <Card className="mb-4" style={{ backgroundColor: "#d4f1f4" }}>
                  <CardImg
                    top
                    width="100%"
                    style={{ height: "300px", padding: "5px" }}
                    src={item.image}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardSubtitle tag="h6">Rs. {item.price}</CardSubtitle>
                    <CardText>{item.category}</CardText>
                  </CardBody>
                  {this.props.isAuthenticated ? (
                    this.props.user.isAdmin ? (
                      <CardFooter>
                        <Button
                          color="danger"
                          size="sm"
                          className="m-1 p-2"
                          onClick={this.onDeleteItem.bind(this, item._id)}
                        >
                          Delete Item
                        </Button>
                        <Button size="sm" color="info">
                          <span>
                            <UpdateItem item={item} />
                          </span>
                        </Button>
                      </CardFooter>
                    ) : (
                      <CardFooter>
                        <Button
                          className="mx-3"
                          color="success"
                          size="sm"
                          onClick={this.onAddToCart.bind(
                            this,
                            user._id,
                            item._id
                          )}
                        >
                          Add To Cart
                        </Button>

                        <Button
                          className="mx-3"
                          color="dark"
                          size="sm"
                          onClick={this.onPostWishlistItem.bind(
                            this,
                            user._id,
                            item._id
                          )}
                        >
                          Add to Wishlist
                        </Button>
                      </CardFooter>
                    )
                  ) : null}
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getItems,
  postWishlistItem,
  postCartItem,
  deleteItem,
})(Home);
