import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PostContext = createContext()
let baseUrl = "http://127.0.0.1:3001/"

export const PostProvider = (props) => {
  const [posts, setPosts] = useState()

  useEffect(() => {
    async function getPosts() {
      await refreshPosts()
    }
    getPosts()
  }, []);

  function refreshPosts() {
    return axios.get(baseUrl + "api/posts")
      .then(response => {
        setPosts(response.data)
      })
  }

  function getPost(id) {
    return axios.get(baseUrl + `api/posts/${id}`)
      .then(response =>
        new Promise((resolve) => resolve(response.data))
      )
      .catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  function addPost(post) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.post(baseUrl + "api/posts", post, { headers: myHeaders })
      .then(response => {
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function getUserPost(userId) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.get(baseUrl + "api/posts/user/" + userId, { headers: myHeaders })
      .then(response => {
        refreshPosts()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function updatePost(post) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.put(baseUrl + `api/posts/${post.postId}`, post, {headers: myHeaders})
      .then(response => {
        refreshPosts()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function deletePost(id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.delete(baseUrl + `api/posts/${id}`, { headers: myHeaders })
      .then(refreshPosts())
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getPost,
        addPost,
        updatePost,
        getUserPost,
        deletePost,
        refreshPosts
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}