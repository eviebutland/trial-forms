import { useState } from "react";
import { User } from "../types/user";

export const Users = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("api/users.json");
      const data = await response.json();

      setAllUsers(data);
      setInitialUsers(data);
    } catch (error) {
      // display error on screen
      console.log(error);
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

          <button
            className="border rounded bg-gray-200 px-2"
            onClick={() => setSearchQuery("")}
          >
            Clear
          </button>
        </div>
        {!!allUsers.length && (
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
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
