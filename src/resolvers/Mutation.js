import uuidv4 from 'uuid/v4'

export default {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some(user => user.email === args.data.email)
        if (emailTaken) throw new Error('This email is already in use!')
        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user)
        return user
    },
    updateUser(parent, args, { db }, info) {
        const user = db.users.find(user => user.id === args.id)
        if (!user) throw new Error('This user doesn\'t exist')
        if (typeof args.data.email === 'string') {
            const emailTaken = db.users.some(user => user.email === args.data.email)
            if (emailTaken) throw new Error('This email is already in use!')
            user.email = args.data.email
        }
        if (typeof args.data.name === 'string') user.name = args.data.name
        if (typeof args.data.age !== undefined) user.age = args.data.age
        return user
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex(user => user.id === args.id)
        if (userIndex === -1) throw new Error('This user doesn\'t exist!')
        const deletedUser = db.users.splice(userIndex, 1)[0]
        db.posts = db.posts.filter(post => {
            const match = post.author === args.id
            if (match) comments = comments.filter(comment => comment.post !== post.id)
            return !match
        })
        db.comments = db.comments.filter(comment => comment.author !== args.id)
        return deletedUser
    },
    createPost(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some(user => user.id === args.data.author)
        if (!userExists) throw new Error('This user doesn\'t exist!')
        const post = {
            id: uuidv4(),
            ...args.data
        }
        db.posts.push(post)
        if (post.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
        }
        return post
    },
    updatePost(parent, args, { db, pubsub }, info) {
        const post = db.posts.find(post => post.id === args.id)
        const originalPost = { ...post }
        if (!post) throw new Error('This post doesn\'t exist!')
        if (typeof args.data.title === 'string') post.title = args.data.title
        if (typeof args.data.body === 'string') post.body = args.data.body
        if (typeof args.data.published === 'boolean') post.published = args.data.published
        if (originalPost.published && !post.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'DELETED',
                    data: originalPost
                }
            })
        } else if (!originalPost.published && post.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
        } else if (post.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }
        return post
    },
    deletePost(parent, args, { db, pubsub }, info) {
        const postIndex = db.posts.findIndex(post => post.id === args.id)
        if (postIndex === -1) throw new Error('This post doesn\'t exist!')
        const deletedPost = db.posts.splice(postIndex, 1)[0]
        db.comments = db.comments.filter(comment => comment.post !== args.id)
        if (deletePost.published) {
            pubsub.publish('post', { 
                post: {
                    mutation: 'DELETED',
                    data: deletePost
                }
            })
        }
        return deletedPost
    },
    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some(user => user.id === args.data.author)
        const postExists = db.posts.some(post => post.id === args.data.post)
        if (!userExists) throw new Error('This user doesn\'t exist!')
        if (!postExists) throw new Error('This post doesn\'t exist!')
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment)
        pubsub.publish(`comment:${comment.post}`, { 
            comment: {
                mutation: 'CREATED',
                data: comment 
            }
        })
        return comment
    },
    updateComment(parent, args, { db, pubsub }, info) {
        const comment = db.comments.find(comment => comment.id === args.id)
        if (!comment) throw new Error('This comment doesn\'t exist!')
        if (typeof args.data.text === 'string') comment.text = args.data.text
        pubsub.publish(`comment:${comment.post}`, { 
            comment: {
                mutation: 'UPDATED',
                data: comment 
            }
        })
        return comment
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id)
        if (commentIndex === -1) throw new Error('This comment doesn\'t exist!')
        const deletedComment = db.comments.splice(commentIndex, 1)[0]
        pubsub.publish(`comment:${deletedComment.post}`, { 
            comment: {
                mutation: 'DELETED',
                data: deletedComment 
            }
        })
        return deletedComment
    }
}