import '@babel/register';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

export default pool;
