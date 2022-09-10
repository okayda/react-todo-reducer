import { GoDiffAdded } from "react-icons/go";
import "./AddForm.css";
import Button from "./Button";

export default function AddForm(prop) {
  return (
    <div className="add-todo">
      <h2 className="add_title">Add To Do</h2>
      <form onSubmit={prop.onSubmit} className="add_form">
        <input
          type="text"
          onChange={prop.onChange}
          value={prop.value}
          className="add_input"
          placeholder="Add Todo"
        />
        <Button type="submit" className="add_btn">
          <GoDiffAdded />
          Submit
        </Button>
      </form>
    </div>
  );
}
