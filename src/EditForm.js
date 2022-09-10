import "./EditForm.css";
import Button from "./Button";

export default function EditForm(prop) {
  return (
    <div className="edit-todo">
      <h2 className="edit_title">Edit To Do</h2>
      <form onSubmit={prop.onSubmit} className="edit_form">
        <input
          type="text"
          onChange={prop.onChange}
          value={prop.value}
          className="edit_input"
          placeholder="Edit Todo"
        />

        <div className="edit_btn_container">
          <span onClick={prop.editCancel} className="btn_cancel">
            Cancel
          </span>
          <Button type="submit" className="btn_update">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
