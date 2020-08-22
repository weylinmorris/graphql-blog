export default {
    users(parent, { query }, { db }, info) {
        return !query ? db.users : db.users.filter((user) => {
            return user.name.toLowerCase().includes(query.toLowerCase()) 
        })
    },
    posts(parent, { query }, { db }, info) {
        return !query ? db.posts : db.posts.filter((post) => {
            return (
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.body.toLowerCase().includes(query.toLowerCase())
            )
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments
    },
    me() {
        return ({
            id: "1234",
            name: 'Weylin Morris',
            email: 'hi@weylin.dev',
            age: 23
        })
    },
    post() {
        return ({
            id: "5678",
            title: "The Mystery",
            body: "",
            published: false
        })
    }
}