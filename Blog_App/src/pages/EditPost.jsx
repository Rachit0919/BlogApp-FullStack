import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost

// import React, { useEffect, useState } from 'react'
// import { Container, PostForm } from '../components'
// import appwriteService from '../appwrite/config'
// import { useNavigate, useParams } from 'react-router-dom'

// function EditPost() {
//   const [post, setPost] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const { slug } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchPost = async () => {
//       if (!slug) {
//         navigate('/')
//         return
//       }

//       try {
//         const response = await appwriteService.getPost(slug)
//         if (response) {
//           setPost(response)
//         } else {
//           navigate('/') // redirect if post not found
//         }
//       } catch (error) {
//         console.error('Error fetching post:', error)
//         navigate('/')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPost()
//   }, [slug, navigate])

//   if (loading) {
//     return (
//       <section className="py-8">
//         <Container>
//           <p className="text-center text-indigo-600">Loading post...</p>
//         </Container>
//       </section>
//     )
//   }

//   if (!post) {
//     return null
//   }

//   return (
//     <section className="py-8">
//       <Container>
//         <PostForm post={post} />
//       </Container>
//     </section>
//   )
// }

// export default EditPost
