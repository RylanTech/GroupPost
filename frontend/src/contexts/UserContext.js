import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()
let baseUrl = "http://127.0.0.1:3001/"

export const UserProvider = (props) => {
    const [user, setUser] = useState()

    // useEffect(() => {
    //     async function getUsers() {
    //       await refreshUsers()
    //     }
    //     getUsers()
    //   }, []);

    function signInUser(username, password) {
        let user = { username, password };

        return axios.post(baseUrl + "api/user/login", user)
            .then(response => {
                localStorage.setItem('GroupPostLoginToken', response.data.userAndToken.token)
                // localStorage.setItem('userId', response.data.userAndToken.userId)
                // console.log(response.data.userAndToken.userId)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function refreshUser(id) {
        return axios.get(baseUrl + "api/user/" + id)
          .then(response => {
            setUser(response.data)
          })
      }

    function isLoggedIn() {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
        };
        return axios.get(baseUrl + "api/user/isloggedin", {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data));
        }).catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
      )
    }

    function getUser(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
        };
        return axios.get(baseUrl + `api/user/${id}`, {headers: myHeaders})
          .then(response =>
            new Promise((resolve) => resolve(response.data))
          )
          .catch((error) =>
            new Promise((_, reject) => reject(error.response.statusText))
          )
      }

    function createUser(user) {
        return axios.post(baseUrl + "api/user", user)
        .then(response => {
        // refreshPosts(response.data.user.userId)
        return new Promise((resolve) => resolve(response.data))
        })
      }
    
      function editUser(user) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
        };
        return axios.put(baseUrl + `api/user/${user.userId}`, user, {headers: myHeaders})
        .then(response => {
          return new Promise((resolve) => resolve(response.data))
        })
      }

    function deleteUser(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
        };
        return axios.delete(baseUrl + `api/user/${id}`, {headers: myHeaders})
    }
    
    return (
        <UserContext.Provider
          value={{
            user,
            signInUser,
            getUser,
            isLoggedIn,
            refreshUser,
            editUser,
            createUser,
            deleteUser
          }}
        >
          {props.children}
        </UserContext.Provider>
      )
}