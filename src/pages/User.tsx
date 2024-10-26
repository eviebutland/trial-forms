import { useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

export const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  async function fetchUser() {
    try {
      const response = await fetch("/api/users.json");
      const data: User[] = await response.json();

      setCurrentUser(data.find((user) => String(user.id) === params.userid));
    } catch (error) {
      console.log("error is here", error);
    } finally {
      setIsFirstLoad(false);
    }
  }

  if (!currentUser && isFirstLoad) {
    fetchUser();
  }

  function handleGoBack() {
    navigate("/users");
  }

  return (
    <div>
      <Button variant="info" onClick={handleGoBack} label="go back"></Button>
      <p>User here {params.userid}</p>
      <p>Age: {currentUser?.age}</p>
      <p>Email: {currentUser?.email}</p>
      {/* form here */}
    </div>
  );
};
