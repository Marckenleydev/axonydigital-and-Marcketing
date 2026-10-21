import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { bootstrapAdminSchema } from "../lib/validation/auth";
import CrmLoginLimit from "../models/CrmLoginLimit";
import CrmUser from "../models/CrmUser";

if (process.env.CRM_BOOTSTRAP_TARGET !== "production") {
  try {
    process.loadEnvFile(".env.local");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

function question(prompt: string) {
  const readline = createInterface({ input: stdin, output: stdout });
  return new Promise<string>((resolve) => {
    readline.question(prompt, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}

function secretQuestion(prompt: string) {
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    throw new Error("Run this command in an interactive terminal so the password can be hidden.");
  }

  stdout.write(prompt);
  stdin.setRawMode(true);
  stdin.resume();

  return new Promise<string>((resolve, reject) => {
    let value = "";
    const finish = (error?: Error) => {
      stdin.removeListener("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
      if (error) reject(error);
      else resolve(value);
    };
    const onData = (chunk: Buffer) => {
      for (const character of chunk.toString("utf8")) {
        if (character === "\u0003") return finish(new Error("Admin setup cancelled."));
        if (character === "\r" || character === "\n") return finish();
        if (character === "\u007f" || character === "\b") value = value.slice(0, -1);
        else value += character;
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const target = process.env.CRM_BOOTSTRAP_TARGET;
  if (target !== "local" && target !== "production") {
    throw new Error("Set CRM_BOOTSTRAP_TARGET=local or production explicitly before bootstrapping.");
  }
  if (target === "production" && (process.env.NODE_ENV !== "production" || process.env.CRM_BOOTSTRAP_CONFIRM_PRODUCTION !== "I_UNDERSTAND_PRODUCTION_BOOTSTRAP")) {
    throw new Error("Production bootstrap requires NODE_ENV=production and CRM_BOOTSTRAP_CONFIRM_PRODUCTION=I_UNDERSTAND_PRODUCTION_BOOTSTRAP.");
  }
  if (target === "local" && process.env.NODE_ENV === "production") {
    throw new Error("Refusing local bootstrap while NODE_ENV=production.");
  }
  if (!process.env.MONGODB_URI) throw new Error("Set MONGODB_URI before bootstrapping the first admin.");
  const database = new URL(process.env.MONGODB_URI).pathname.replace(/^\//, "").split("?")[0];
  if (database === "CRM_TEST_MONGODB_URI") throw new Error("Refusing to create an administrator in the dedicated test database.");
  if (target === "local" && /(^|[-_])(prod|production|live)([-_]|$)/i.test(database)) {
    throw new Error("The selected database name looks production-like; select production explicitly if this is intentional.");
  }
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < (target === "production" ? 43 : 32)) {
    throw new Error(`Set AUTH_SECRET to a randomly generated value of at least ${target === "production" ? 43 : 32} characters.`);
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10_000,
  });
  await CrmUser.createIndexes();
  await CrmLoginLimit.createIndexes();

  const existingAdmin = await CrmUser.exists({
    $or: [{ role: "administrator" }, { bootstrapKey: "initial-admin" }],
  });
  if (existingAdmin) throw new Error("An administrator already exists; first-admin setup is one-time only.");

  if (target === "production") {
    const confirmation = await question('Type "CREATE FIRST PRODUCTION ADMIN" to continue: ');
    if (confirmation !== "CREATE FIRST PRODUCTION ADMIN") throw new Error("Production administrator setup cancelled.");
  }

  const input = bootstrapAdminSchema.parse({
    name: await question("Administrator name: "),
    email: await question("Administrator email: "),
    password: await secretQuestion("Choose a password (14+ characters; input hidden): "),
  });

  const passwordHash = await bcrypt.hash(input.password, 12);
  await CrmUser.create({
    name: input.name,
    email: input.email,
    passwordHash,
    role: "administrator",
    active: true,
    bootstrapKey: "initial-admin",
  });

  console.log("Initial administrator created.");
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Admin setup failed.");
    process.exitCode = 1;
  })
  .finally(async () => {
    const mongoose = (await import("mongoose")).default;
    await mongoose.disconnect();
  });
