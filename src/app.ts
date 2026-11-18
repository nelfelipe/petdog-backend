import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/clientes.routes';
import comprasRoutes from './routes/compras.routes';
import inventarioRoutes from './routes/inventario.routes';
import categoriasRoutes from './routes/categorias.routes';
import reportesRoutes from './routes/reportes.routes';
import usuariosRoutes from './routes/usuarios.routes';
import loginRoutes from './routes/login.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK'
  });
});

app.use('/api/v1/clientesitos', clientesRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/v1/compras', comprasRoutes);
app.use('/api/v1/inventario', inventarioRoutes);
app.use('/api/v1/categorias', categoriasRoutes);
app.use('/api/v1/reportes', reportesRoutes);
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/login', loginRoutes);

// Rutas cortas: http://localhost:3000/clientes, /compras, /inventario
app.use('/clientes', clientesRoutes);
app.use('/compras', comprasRoutes);
app.use('/inventario', inventarioRoutes);

export default app;
