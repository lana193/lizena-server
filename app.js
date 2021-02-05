import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
import { initializeStrategy } from './src/middleware/passport';
import config from './config/keys';
import { projectsRouter } from './src/route/projects';
import { authRouter } from './src/route/auth';
import { contactsRouter } from './src/route/contacts';
import { forSaleRouter } from './src/route/for-sale';
// import cors from 'cors';
// import corsOptions from './config/cors';

const app = express();
// use it before all route definitions
// app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

initializeStrategy(passport);

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI || config.mongoURI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Static Files
const directory = path.join(__dirname, 'public');
app.use(express.static(directory));

// Routes
app.use('/lizena', projectsRouter);
app.use('/lizena', authRouter);
app.use('/lizena', contactsRouter);
app.use('/lizena', forSaleRouter);
// app.use('/');
// app.use('*', (req, res) => res.status(404).send('Not found'));

const hostname = '185.229.224.187';
const port = process.env.PORT || 3003;

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
