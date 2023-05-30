import React from "react";

import { FaEdit, FaTrash } from "react-icons/fa";

const list = ({ items, deleteItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <div className="flex">
              <p className="title">{title}</p>
              <div className="btn-container">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => editItem(id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteItem(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default list;
