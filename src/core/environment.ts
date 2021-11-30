let env = process.env.NODE_ENV


export const Environment = {
    DEV: env === 'dev' ? true : false,
    
    PROD : env === 'prod' ? true : false
}