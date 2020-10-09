import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';

//initialize express application
const app = express();

//connect database
connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//API endpoints
/**
 * @route GET /
 * @desc Tset endpoint
 */
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post(
    '/api/users',
    [
        check( 'name', 'Please enter your name').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min : 6})
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        } else {
            return res.send(req.body);
        }     
    }
);

//connection listener
const port = 5000;
app.listen(port, () => console.log('Express server running on port ${port}'));