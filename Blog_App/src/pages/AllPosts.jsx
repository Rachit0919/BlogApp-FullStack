// import React, {useState, useEffect} from 'react'
// import { Container, PostCard } from '../components'
// import appwriteService from "../appwrite/config";

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     useEffect(() => {}, [])
//     appwriteService.getPosts([]).then((posts) => {
//         if (posts) {
//             setPosts(posts.documents)
//         }
//     })
//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap -mx-2 justify-center'>
//                 {posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
//                         <PostCard {...post} />
//                     </div>
//                 ))}
//             </div>
//         </Container>
//     </div>
//   )
// }

// export default AllPosts

import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([])
        if (response) {
          setPosts(response.documents)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="w-full py-8">
      <Container>
        {loading ? (
          <p className="text-center text-indigo-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-white">No posts available.</p>
        ) : posts.length === 1 ? (
          <div className="flex justify-center">
            <div className="p-2 ">
              <PostCard {...posts[0]} />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center mx-2 items-start">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 "
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default AllPosts
