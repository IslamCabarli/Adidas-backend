import { join } from "path";
import { config } from 'dotenv'

const envPath = join(__dirname, '../../.env')

config({ path: envPath })

export default {
    databaseURL: process.env.DATABASE_URL,
    superSecret: process.env.JWT_SECRET
}