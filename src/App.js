import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";

let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const App = () => {
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(items);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(list));
  }, [list]);

  const deleteItem = (id) => {
    const filteredItems = list.filter((item) => item.id !== id);
    setList(filteredItems);
  };

  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItemName(itemToEdit.title);
  };

  const clearItems = () => {
    setList([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!itemName) {
      alert("Enter A value");
    } else if (itemName && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: itemName };
          } else {
            return item;
          }
        })
      );
      setItemName("");
      setIsEditing(false);
      setEditId("");
    } else {
      const newItem = { id: uuidv4(), title: itemName };
      setList([...list, newItem]);
      setItemName("");
    }
  };
  return (
    <div>
      <section className="card">
        <h3>TODO LIST</h3>
        <div className="underline"></div>

        <form className="grocery-form" onSubmit={submitHandler}>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="Hello..."
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} deleteItem={deleteItem} editItem={editItem} />
            <button type="button" className="clear-btn" onClick={clearItems}>
              Clear Items
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
