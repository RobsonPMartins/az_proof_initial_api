import app from './app';

const connectToDataBase = require('./config/database')

connectToDataBase()

const PORT = process.env.PORT || 3333;
// Configurei pelo .env

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT} 🚀`)
});
