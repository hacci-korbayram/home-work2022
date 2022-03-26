const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.get("/", (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json"));
    const lastUser = db.users[db.users.length - 1];
    res.setHeader("Content-Type", "text/html");
    return res.end(`<!doctype html>
    <html lang="en">
    <head>
  
</head>
    <body>
    <div id="userInfo">
            First name: ${lastUser.firstName}<br/>
            Last name: ${lastUser.lastName}<br/>
            city: ${lastUser.city}<br/>
            Active: ${lastUser.active?'Yes':'No'}<br/>
        </div>
    </body>
    <form action="/new_user" method="POST">
            <fieldset>
                <div>
                    <label for="firstName">First name:</label>
                    <input type="text" id="firstName" name="firstName" required autofocus placeholder="Enter your first name">
                </div>
                <div>
                    <label for="lastName">Last name:</label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Enter your last name">
                </div>
                <div>
                    <label for="city">city:</label>
                    <input type="text" step="1" id="city" name="city" required placeholder="Enter your city">
                </div>
                <div>
                    <input type="checkbox" id="active" name="active" value="1" checked>
                    <label for="active">Active</label>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </fieldset>
        </form>
    </body>
    </html>`);
});

    app.post("/new_user",(req, res) => {
        const new_user = {'firstName': req.body.firstName, 'lastName': req.body.lastName, 'city': req.body.city, 'active': req.body.active==1};
        const db = JSON.parse(fs.readFileSync("db.json"));
        db.users.push(new_user);
        fs.writeFileSync("db.json",JSON.stringify(db));
        return res.redirect('/');
    
    })


app.listen(800);