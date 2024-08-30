import express from "express"
import db from "./config/database.js"
import cors from "cors"
import session from "express-session"
import dotenv from "dotenv"
import SequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/UserRoute.js"
import ProductRoute from "./routes/ProductRoute.js"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});


// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    rolling:true,
    store: store,
    cookie:{
        secure:'auto'
    }
}));
const port = process.env.PORT_SERVER;

app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});