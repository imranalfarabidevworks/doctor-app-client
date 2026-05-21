import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// const dns = require("node:dns");
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("docappoint")),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});