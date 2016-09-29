// @flow
import pgp from 'pg-promise';

export default pgp({})(process.env.DATABASE_URL);
