namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        HASH_SALT: number
        JWT_SECRET: string
        JWT_EXPIRES_IN: number
    }
}