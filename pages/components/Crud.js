import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, updateItem } from "../../redux/slices/itemSlice";
import { useState } from "react";

export default function Crud() {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (editId) {
      dispatch(updateItem({ id: editId, name: input }));
      setEditId(null);
    } else {
      dispatch(addItem({ id: Date.now(), name: input }));
    }
    setInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleEdit = (item) => {
    setInput(item.name);
    setEditId(item.id);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
