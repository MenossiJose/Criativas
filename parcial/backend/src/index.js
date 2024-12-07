import express from 'express';
import cors from 'cors';
import { Mongo } from './database/mongo.js';
import {config} from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js';
import ideasRouter from './routes/ideas.js';

config();

async function main() {

  const hostname = 'localhost'
  const port = 3000

  const app = express();

  const mongoConnection = await Mongo.connect({
    mongoConnectionString: process.env.MONGO_CS,
    mongoDbName: process.env.MONGO_DB_NAME
  })

  console.log(mongoConnection)

  app.use(express.json())
  app.use(cors())


  app.get('/', (req, res) => {
    res.send({
      sucess: true,
      statusCode: 200,
      body: 'Welcome to Criativas'
    })
  });

  app.use('/auth', authRouter)
  app.use('/users', usersRouter)
  app.use('/ideas', ideasRouter);

  app.listen(port, () => {
    console.log(`Server rodando em: http://${hostname}:${port}`)
  })
}

main()

