declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SECRET_TOKEN: string;
    EXPIRESIN_TOKEN: string;
    KEY_TOKEN: string;
    CLIENT_SIDE: string;
    
    PGUSER: string;
    PGPASSWORD: string;
    PGHOST: string;
    PGPORT: number;
    PGDATABASE: string;
  }
}
