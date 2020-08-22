const users = [
    {
        id: '1',
        name: 'Weylin',
        email: 'hi@weylin.dev',
        age: 23
    },
    {
        id: '2',
        name: 'Cierra',
        email: '4cibear@gmail.com'
    },
    {
        id: '3',
        name: 'Kobin',
        email: 'nibok2000@gmail.com'
    }
]

const posts = [
    {
        id: '111',
        title: 'How to do life',
        body: 'Don\'t',
        published: true,
        author: '1'
    },
    {
        id: '112',
        title: 'Here is an article',
        body: 'Just kidding, there isn\'t one',
        published: false,
        author: '1'
    },
    {
        id: '113',
        title: 'Why',
        body: 'No reason. No reason at all.',
        published: false,
        author: '2'
    }
]

const comments = [
    {
        id: '211',
        text: 'Comment 211',
        author: '1',
        post: '112'
    },
    {
        id: '212',
        text: 'Comment 212',
        author: '1',
        post: '112'
    },
    {
        id: '213',
        text: 'Comment 213',
        author: '3',
        post: '111'
    },
    {
        id: '214',
        text: 'Comment 214',
        author: '2',
        post: '113'
    },
]

export default {
    users,
    posts,
    comments
}