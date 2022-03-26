const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        const db = JSON.parse(fs.readFileSync('db.json'));
        const lastUser = db.users[db.users.length - 1];
        res.setHeader("Content-Type", "text/html");
        return res.end(`<!DOCTYPE html>
      
        <body>
            <div id="userInfo">
                First name: ${lastUser.firstName}<br/>
                Last name: ${lastUser.lastName}<br/>
                Age: ${lastUser.city}<br/>
                Active: ${lastUser.active ? 'Yes' : 'No'}<br/>
            </div>
        </body>
        </html>`);
    }

    else if (req.url == "new_user" && req.method == "POST") {
        let chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on("end", () => {
            const dataString = BUFFER.concat(chunks).toString();
            const splittedData = dataString.split('&');
            const new_data = {};
            splittedData.forEach(data => {
                const keyValueSplit = data.split('=');
                const key = keyValueSplit[0];
                const value = keyValueSplit[1];
                new_data[key] = value;

            });
            const new_user = {'firstName': new_data.firstName, 'lastName': new_data.lastName, 'city': new_data.city, 'active': new_data.active ==1};
            const db = JSON.parse(fs.readFileSync("db.json"));
            db.users.push(new_user);
            fs.writeFileSync("db.json", JSON.stringify(db));
            res.writeHead(302,{Location: '/'});
            return res.end();
        }); 
    }
});
server.listen(800);