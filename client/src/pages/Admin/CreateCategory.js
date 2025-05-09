import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import API from "../../api/api";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(" ");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/api/v1/category/create-category`, {
        name,
      });
      if (data.success) {
        toast?.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went worng in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await API.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went worng in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //udate cat

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is update`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        console.log();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  //delete cat

  const handleDelete = async (pId) => {
    try {
      const { data } = await API.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`${name} is deleted`);
        getAllCategory();
      } else {
        console.log();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"dashboard-create category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => {
                    return (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setVisible(true);
                                setUpdateName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
