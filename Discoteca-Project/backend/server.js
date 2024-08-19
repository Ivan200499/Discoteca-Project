const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurazione del pool di connessione al database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware per gestire le richieste JSON
app.use(express.json());

// Endpoint per ottenere gli eventi
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore del server');
  }
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
