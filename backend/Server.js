const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const instructionalRoutes = require('./routes/InstructionalRoutes')
const filmRoutes = require('./routes/FilmRoutes')
const postRoutes = require('./routes/PostRoutes')
const cors = require('cors');
app.use(cors());


app.use(express.json());
  
mongoose.connect('mongodb://localhost:27017/jiuJitsuAppDB')
  .then(() => console.log('Connected to MongoDB jiuJitsuAppDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/film', filmRoutes)
app.use('/api/instructional', instructionalRoutes)
app.use('/api/posts', postRoutes);
app.get('/secret-wipe-database', async (req, res) => {
   try {
    await mongoose.connection.db.dropDatabase();
    console.log('Database wiped successfully');
    res.send('Database wiped successfully');
  } catch (error) {
    console.error('Error wiping database:', error);
    res.status(500).send('Failed to wipe database');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
