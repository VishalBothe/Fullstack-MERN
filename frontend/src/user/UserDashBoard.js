import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { getMyOrders, getUser, updateUser } from "./helper/userapicalls";

const UserDashBoard = () => {
  
  const [userData, setUserData] = useState({});
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(false)

  const [values, setValues] = useState({
    success : false,
    updateError : false
  })

  // const {name, email} = userData;
  const {success, updateError} = values;
  const {user, token} = isAutheticated()

  const getUserDetails = (userId, token) => {
    getUser(userId, token)
      .then(data => {
        if(data.error){
          setError(true)
        }else{
          setUserData(data)
          setPurchases(data.purchases)
        }
      })
      .catch(err => console.log(err));
  }  

  useEffect(() => {
    getUserDetails(user._id, token);
  }, []);

  const handleNameChange = event => {
    setUserData({...userData, name:event.target.value});
  }
  const handleEmailChange = event => {
    setUserData({...userData, email:event.target.value})
  }
  // const handleChange = name => event => {
  //   setValues({ ...values, error: false, [name]: event.target.value });
  // };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    updateUser(user._id, token, { name:userData.name, email:userData.email })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const updateForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <h3>Profile</h3>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleNameChange}
                value={userData.name}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleEmailChange}
                value={userData.email}
                className="form-control"
                type="email"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Updated successfully!
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <Base title={`Hello, ${userData.name}`} description="Welcome to your dashboard">
      {
        purchases &&
        <div className="row">
          <div className="col-md-6">
            <h3>Your orders</h3>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Transaction id</th>
                  <th scope="col">Date</th>
                  <th scope="col">products</th>
                  <th scope="col">price</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{purchase.transaction_id}</td>
                      <td>{purchase.createdAt}</td>
                      <td>{purchase.products.map((product,i) => {
                        return (
                          <div>
                            <h4>{product.name}</h4>
                            <h6>{product.price}</h6>
                          </div>
                        )
                      })}</td>
                      <td>{purchase.amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            {successMessage()}
            {errorMessage()}
            {updateForm ()}
          </div>
        </div>
      }
    </Base>
  );
};

export default UserDashBoard;
