import { Component, Fragment } from "react";
import AppNavbar from "./AppNavbar";
import icon from "./user-icon.jpg";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  CardSubtitle,
  Button,
  Container,
  Alert,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../actions/userActions";

class User extends Component {
  state = {
    loaded: false,
    result: null,
  };

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    userList: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  onGetUsers = async () => {
    await this.props.getUsers();
    this.state.loaded = true;
  };

  onDeleteUser = async (userId) => {
    var res = window.confirm("Confirm Delete User");
    if (res) {
      await this.props.deleteUser(userId);
    }
  };

  render() {
    const userList = this.props.userList;
    const user = this.props.user;
    console.log("list", userList, "\n", "user", user);

    if (this.props.isAuthenticated && user.isAdmin && !this.state.loaded) {
      this.onGetUsers();
    }

    return (
      <div>
        <AppNavbar />
        {this.props.isAuthenticated ? (
          <Fragment>
            {userList && userList.length > 0 ? null : (
              <Alert color="info" className="text-center">
                No Users Found!
              </Alert>
            )}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">
            Login to View!
          </Alert>
        )}

        {this.props.isAuthenticated && user.isAdmin && userList ? (
          <Container>
            <div className="row">
              {userList.map((user) =>
                !user.isAdmin ? (
                  <div className="col-md-3">
                    <Card style={{ backgroundColor: "#d4f1f4" }}>
                      <CardImg
                        top
                        className="w-100 h-100"
                        src={icon}
                        alt="User Icon"
                      />
                      <CardBody>
                        <CardTitle tag="h5">{user.name}</CardTitle>
                        <CardSubtitle tag="h6">
                          Email: {user.email}
                        </CardSubtitle>
                        <CardText>
                          Registration Date - {user.registerDate.substr(0, 10)}
                        </CardText>
                        <Button
                          color="danger"
                          onClick={this.onDeleteUser.bind(this, user._id)}
                        >
                          Delete User
                        </Button>
                      </CardBody>
                    </Card>
                    <br />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userList: state.user.userList,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getUsers,
  deleteUser,
})(User);
