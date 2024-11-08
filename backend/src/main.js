// import cookieParser from 'cookie-parser'
import cors from 'cors';
import express from 'express';
import passport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import storageRoutes from './routes/storage.js';
import progressRoutes from './routes/progressRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
// app.use(cookieParser());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/books', passport.authenticate('jwt', { session: false }), bookRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), storageRoutes);
// app.use('/api', passport.authenticate('jwt', { session: false }), progressRoutes);
app.use('/api', progressRoutes);

app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
