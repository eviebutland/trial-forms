import { useState } from "react";

interface UserDetail {
  name?: string;
  email?: string;
  phone?: string;
  room?: number;
}

const BookRoomForm = () => {
  const initialModel: UserDetail = {
    name: undefined,
  };
  const [model, setModel] = useState(initialModel);
  return (
    // Using a fragment to save another div (excessive in this case)
    <>
      <h2>Book Room</h2>
      <form>
        <label>Your name</label>
        <input value={model.name} type="text" />

        {model.name}
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default BookRoomForm;
