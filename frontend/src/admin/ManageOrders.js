import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getAllOrders } from "./helper/adminapicall";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getAllOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage orders here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {orders.length} orders</h2>
          <table className="table">
            {
              orders && 
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>orderId</th>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Price</th>
                        <th>TransactionId</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => {
                        return (
                          <tr>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.createdAt}</td>
                          <td>
                            {order.products.map((product, i) => {
                              return (
                                <div>
                                <h6>{product.name}</h6>
                                <p>{product.price}</p>
                              </div>
                              )
                            })}
                          </td>
                          <td>{order.amount}</td>
                          <td>{order.transaction_id}</td>
                          <td>{order.status}</td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </table>
        </div>
      </div>
    </Base>
  );
};

export default ManageOrders;
