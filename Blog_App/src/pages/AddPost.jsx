// import React from 'react'
// import { Container, PostForm } from '../components'

// function AddPost() {
//   return (
//     <div className='py-8'>
//         <Container>
//             <PostForm />
//         </Container>
//     </div>
//   )
// }

// export default AddPost


import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <section className="py-8">
      <Container>
        <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">
            Create a New Post
          </h2>
          <PostForm />
        </div>
      </Container>
    </section>
  )
}

export default AddPost
