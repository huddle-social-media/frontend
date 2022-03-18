const getPosts = async () => {
    // use fetch call for get following object
    return [{ imgs: [`https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`], title: "This is a sample post about cricket", interest: "Cricket", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat nihil sint consectetur beatae perspiciatis quo voluptate.", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, name: "Rajitha Kumara", username: "rajitha_kumar", time: "18hr", likes: "999m", comments: "999m", id: 1},

    { imgs: [`https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`], title: "This is a sample post about cricket", interest: "Cricket", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat nihil sint consectetur beatae perspiciatis quo voluptate.", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, name: "Rajitha Kumara", username: "rajitha_kumar", time: "18hr", likes: "999m", comments: "999m", id: 2}
    ];
}

const getPost = async (username, id) => {
    return { imgs: [`https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`], title: "This is a sample post about cricket", interest: "Cricket", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quam, excepturi nisi quaerat nihil sint consectetur beatae perspiciatis quo voluptate.", propicUrl: `https://source.unsplash.com/random/1900x800?sig=${Math.floor(Math.random()*100)}`, name: "Rajitha Kumara", username: username, time: "18hr", likes: "999m", comments: "999m", id: id}
}

export { getPosts, getPost };