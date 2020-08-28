import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { name, picture, email, sub } = user;

  async function saveUserData() {
    try {
      let newUser = {
        name: name,
        picture: picture,
        email: email,
        uid: sub.split("|", 2)[1],
      };

      axios.post("http://localhost:5500/api/users/", newUser);
    } catch (e) {}
  }

  async function addUserIfNotExist() {
    try {
      let uid = sub.split("|", 2)[1];
      await axios.get(`http://localhost:5500/api/users/${uid}`);

      return true;
    } catch (e) {
      if (e.response.status === 404) {
        saveUserData();
      }
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      addUserIfNotExist();
    }
  });

  return <></>;
};

export default Profile;
