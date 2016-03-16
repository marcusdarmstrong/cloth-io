import configurable from 'pg-promise';

const pgp = configurable();

export default () => pgp(process.env.DATABASE_URL);
