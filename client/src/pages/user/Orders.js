import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import API from "../../api/api";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await API.get(`/api/v1/auth/orders`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const { data } = await API.put(
        `/api/v1/auth/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success(data.message);
      getOrders();
    } catch (error) {
      console.log("cancel order", error);
      toast.error("Error canceling order");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            {orders?.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders?.map((o, i) => (
                <div key={o._id} className="card mb-4 p-3 shadow-sm">
                  <h5>Order #{i + 1}</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>
                          {o?.payment?.method ? "Cash on Delivery" : "Online"}
                        </td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="row">
                    {o?.products.map((p) => (
                      <div key={p._id} className="col-md-6 mb-3">
                        <div className="card p-2 d-flex flex-row align-items-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL}api/v1/product/product-photo/${p._id}`}
                            className="img-fluid me-3"
                            alt={p.name}
                            width="100"
                            height="100"
                          />
                          <div>
                            <p className="mb-1">
                              <strong>{p.name}</strong>
                            </p>
                            <p className="mb-1">Price: ₹{p.price}</p>
                            {o?.status !== "Delivered" && (
                              <button
                                className="btn btn-danger btn-sm mt-1"
                                onClick={() => handleCancelOrder(o._id)}
                                disabled={
                                  o?.status === "Cancel" ||
                                  o?.status === "Delivered"
                                }
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
