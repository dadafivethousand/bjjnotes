const Post = require('../models/Post'); // Replace with the actual path to your Post model

exports.deleteData = async (req, res) => { 
        const { id } = req.params;
        try {
            await Post.findByIdAndDelete(id);
            res.status(200).send({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).send(error);
        }
     
}

exports.getData = async (req, res) => {
    const { userId } = req.params;
    try {
        const populatedPosts = await Post.find({ user: userId }).populate('user').sort({trainingDate: -1});

       const formattedPosts = populatedPosts.map(post => ({
            ...post._doc,
            trainingDate: post.trainingDate.toISOString().split('T')[0],
        }));  
      
        res.json(formattedPosts);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
};

exports.editData = async(req,res) => {
    console.log('**BODY of the request**')
    console.log(req.body)
    const { id } = req.params;
    const { trainingDate, ...restOfBody } = req.body;

    // Safely convert the date to a JavaScript Date object
 
    // Convert the date string to a Date object
    const safeDate = new Date(req.body.trainingDate);
    try {
        console.log('**POST ID**')
        console.log(id)
        console.log('**find post by ID**')
        const p = await Post.findById(id);
        console.log(p)
        // Update the document, ensuring the date is a Date object
        const updatedPost = await Post.findByIdAndUpdate(id, { ...restOfBody, trainingDate: safeDate }, { new: true });

        console.log(updatedPost)
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send(error);
    }
}


/*
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', '_id');
        console.log(hi)
        console.log(posts)
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Error fetching posts');
    }
};*/

exports.addPost = async (req, res) => {
    try {
        // Extracting data from the request body
        const { title, preTrainingGoals, whatWentRight, whatWentWrong, takeAways, trainingDate, user } = req.body;
    
        // Create a new post instance
        const newPost = new Post({
            title,
            preTrainingGoals,
            whatWentRight,
            whatWentWrong,
            takeAways,
            trainingDate,
            user // Assuming this is the ID of the user creating the post
        });

        // Save the new post to the database
        await newPost.save();

        // Send back the created post
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error in addPost: ', error);
        res.status(500).send('Error adding new post');
    }
};
