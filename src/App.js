import React, { useState, useEffect } from "react";

import List from "./components/List";

import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./utils/firebase/firebase";

const App = () => {
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));

    onSnapshot(q, (querySnapShot) => {
      setList(
        querySnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        })
      );
    });

    console.log(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = async (id) => {
    try {
      const itemToEditRef = await doc(db, "tasks", id);
      await deleteDoc(itemToEditRef);
    } catch (err) {
      console.log(err);
    }
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!itemName) {
      alert("Enter A value");
    } else if (itemName && isEditing) {
      try {
        const itemToEditRef = await doc(db, "tasks", editId);
        await updateDoc(itemToEditRef, {
          title: itemName,
        });
      } catch (err) {
        console.log(err);
      }

      setItemName("");
      setIsEditing(false);
      setEditId("");
    } else {
      setItemName("");

      try {
        await addDoc(collection(db, "tasks"), {
          title: itemName,
          created: Timestamp.now(),
        });
      } catch (err) {
        console.log(err);
      }
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
              placeholder="Apple..."
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
        {/* {console.log(list)} */}
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
