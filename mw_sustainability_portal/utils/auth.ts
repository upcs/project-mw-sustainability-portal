import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
    database: new Database("./sqlite.db"),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false //defaults to true
    },
});
