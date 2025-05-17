declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_PASSWORD: string;
    DB_NAME: number;
    DB_PORT: string;
    DB_USERNAME: string;
    SALT_ROUNDS: number;
    SECRET_KEY_JWT: string;
  }
}
