import configurable from 'pg-promise';

const pgp = configurable({});

export default () => {
  const db = pgp(process.env.DATABASE_URL);
  console.log('DB created: ' + JSON.stringify(Object.keys(db)));
  return db;
};
