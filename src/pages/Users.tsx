import { useState } from "react";
import { User } from "../types/user";
import Button from "../components/atoms/Button";
import Alert from "react-bootstrap/Alert";
import { Badge, ButtonProps } from "react-bootstrap";

export const Users = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [displayApiError, setDisplayApiError] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("api/users.json");
      const data = await response.json();

      setAllUsers(data);
      setInitialUsers(data);
    } catch (error) {
      // display error on screen
      console.log(error);
      setDisplayApiError(true);
    } finally {
      setIsFirstLoad(false);
    }
  };

  if (!allUsers.length && isFirstLoad) {
    fetchAllUsers();
  }

  function filterUsersBySearchQuery(e) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setAllUsers(initialUsers);
    } else {
      setAllUsers(
        allUsers.filter((user) => {
          return user.name.toLowerCase().includes(e.target.value);
        }),
      );
    }
  }

  function handleReset() {
    setSearchQuery("");
    setAllUsers(initialUsers);
  }
  const ratings = [5, 4, 3, 2, 1];

  function handleFilterByRating(rating: number) {
    console.log(rating);

    // TODO fix this
    // going back to 1 star doesn't work
    setAllUsers(allUsers.filter((user) => user.rating >= rating));

    console.log(allUsers);
  }

  function ratingVariant(rating: number) {
    let variant: ButtonProps["variant"] = "info";
    switch (rating) {
      case 5:
      case 4:
        variant = "success";
        break;
      case 3:
      case 2:
        variant = "warning";
        break;
      case 1:
        variant = "danger";
        break;
    }
    return variant;
  }

  return (
    <div>
      <h1 className="font-bold text-center my-8">All users</h1>
      <section className="">
        <div className="w-full px-8 flex space-x-2">
          <input
            className="border w-full"
            value={searchQuery}
            placeholder="Filter user by name"
            onChange={filterUsersBySearchQuery}
          />

          <Button variant="danger" onClick={handleReset} label="Clear" />
        </div>

        <div>
          {ratings.map((rating) => (
            <Button
              key={rating}
              variant={ratingVariant(rating)}
              label={`${rating}/5 +`}
              onClick={() => handleFilterByRating(rating)}
            />
          ))}
        </div>

        {!!allUsers.length ? (
          <ul className="p-8 grid grid-cols-4 gap-4">
            {allUsers.map((user) => (
              <li className="border rounded p-4" key={user.id}>
                <a href={`/users/${user.id}`}>
                  <div className="bg-gray-200 p-8 text-center mb-2">
                    Image here
                  </div>

                  <p>Name: {user.name}</p>
                  <p>
                    {user.location.address.city && (
                      <span> City: {user.location.address.city}</span>
                    )}
                    {user.location.address.region && (
                      <span> Region: {user.location.address.region}</span>
                    )}
                  </p>
                  <Badge bg={user.age > 20 ? "success" : "warning"}>
                    {user.age}
                  </Badge>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8">
            <Alert variant="warning">
              No users matching this search, please try again!
            </Alert>
          </div>
        )}

        {displayApiError && (
          <p className="text-red-900 font-bold">
            Something has gone wrong! Please try again later
          </p>
        )}
      </section>
    </div>
  );
};
