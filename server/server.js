const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // umożliwia komunikację z front-endem bo są na innych portach, bez tego nie było by łączności
app.use(express.json()); // przetwarza dane z front-endu które są w JSONie, na obiekt req.body


// Połączenie
const db = new sqlite3.Database("./training.db", (err) => {
    if (err){
        console.error("Error tworzenie DB : ", err.message);
    }
    else {
        console.log("Connected to SQLite DB");
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
            `);
            db.run(`
                CREATE TABLE IF NOT EXISTS workout_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    exercise_id INTEGER NOT NULL,
                    repetitions INTEGER NOT NULL,
                    weight REAL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            `);
    }
})

app.post("/api/auth", (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).json({ error: "Nie ma loginu lub hasla"});
    }
    db.get(`SELECT * FROM users WHERE username = ? `, [username], (err, row) => {
        if(err) return res.status(500).json({error: err.message});
        if (row){
            //SELECT znalazl nazwe
            if(password !== row.password) {
                return res.status(401).json({error: "Zle haslo"});
            }
            console.log(username);
            console.log(password);
            res.json({id: row.id, username: row.username});
        }else{
            //SELECT nie znalazl nazwy
            db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function (err) {
                if(err) return res.status(500).json({error: err.message});
                res.status(201).json({id:this.lastID, username});
            })

        }

    })
})
app.post("/api/workout", (req, res) => {
    const { user_id, exercise_id, repetitions, weight } = req.body;
    console.log({ user_id, exercise_id, repetitions, weight });
    // Walidacja danych
    if (!user_id || !exercise_id || !repetitions) {
        return res.status(400).json({ error: "Brak wymaganych danych (user_id, exercise_id, repetitions)" });
    }

    // Zapis do bazy
    db.run(
        `INSERT INTO workout_logs (user_id, exercise_id, repetitions, weight) VALUES (?, ?, ?, ?)`,
        [user_id, exercise_id, repetitions, weight || null], // weight może być opcjonalny
        function (err) {
            if (err) {
                console.error("Błąd przy zapisie treningu: ", err.message);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                user_id,
                exercise_id,
                repetitions,
                weight,
                message: "Trening zapisany pomyślnie",
            });
        }
    );
});

app.listen(port, () => {
    console.log(`Server uruchomiony na porcie ${port}`);
})