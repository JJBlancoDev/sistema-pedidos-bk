export const EnvConfiguration = () => ({
  PORT: process.env.PORT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
});
