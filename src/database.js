import {createPool} from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerseSalud'
});

export default pool;