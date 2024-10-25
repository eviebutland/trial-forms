import { useState } from "react";

interface UserDetail {
  name: string;
  email: string;
  phone: string;
  room: number;
}

const BookRoomForm = () => {
  const initialModel: UserDetail = {
    name: "",
    email: "",
    phone: "",
    room: 0,
  };
  const [model, setModel] = useState(initialModel);

  // Add missing type here
  const onUpdateField = (e) => {
    const nextFormState = {
      ...model,
      [e.target.name]: e.target.value,
    };
    setModel(nextFormState);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    alert(JSON.stringify(model, null, 2));
  };

  return (
    // Using a fragment to save another div (excessive in this case)
    <>
      <h2>Book Room</h2>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="name">Your name</label>
        <input
          type="string"
          aria-label="your name field"
          name="name"
          value={model.name}
          onChange={onUpdateField}
        />

        <label htmlFor="email">Your email</label>
        <input
          type="string"
          aria-label="your email field"
          name="email"
          value={model.email}
          onChange={onUpdateField}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="string"
          aria-label="your phone field"
          name="phone"
          value={model.phone}
          onChange={onUpdateField}
        />

        <label htmlFor="room">Room</label>
        <input
          type="number"
          aria-label="your room field"
          name="room"
          value={model.room}
          onChange={onUpdateField}
        />

        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default BookRoomForm;
