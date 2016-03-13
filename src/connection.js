import pgp from 'pg-promises';

export default () => pgp(process.env.DATABASE_URL);
