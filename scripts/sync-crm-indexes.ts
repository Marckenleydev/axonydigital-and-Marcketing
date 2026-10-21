import mongoose from "mongoose";
import CrmLoginLimit from "@/models/CrmLoginLimit";
import CrmUser from "@/models/CrmUser";
import Lead from "@/models/Lead";
import LeadConflict from "@/models/LeadConflict";
import PublicLeadLimit from "@/models/PublicLeadLimit";
import Client from "@/models/Client";
import Project from "@/models/Project";
import ClientConversionConflict from "@/models/ClientConversionConflict";
import Task from "@/models/Task";
import CrmNotification from "@/models/CrmNotification";
import CrmSecurityState from "@/models/CrmSecurityState";

if (process.env.CRM_INDEX_TARGET !== "production") {
  try {
    process.loadEnvFile(".env.local");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

async function main() {
  const testUri = process.env.CRM_TEST_MONGODB_URI;
  const target = process.env.CRM_INDEX_TARGET;
  if (testUri) {
    const database = new URL(testUri).pathname.replace(/^\//, "");
    if (database !== "CRM_TEST_MONGODB_URI") throw new Error("CRM_TEST_MONGODB_URI must target the database named CRM_TEST_MONGODB_URI.");
    if (target && target !== "test") throw new Error("When CRM_TEST_MONGODB_URI is set, CRM_INDEX_TARGET must be test or omitted.");
  } else if (target !== "production" || process.env.CRM_INDEX_CONFIRM_PRODUCTION !== "create-only") {
    throw new Error("No dedicated test URI is configured. To create production indexes, explicitly set CRM_INDEX_TARGET=production and CRM_INDEX_CONFIRM_PRODUCTION=create-only.");
  }
  const uri = testUri || process.env.MONGODB_URI;
  if (!uri) throw new Error("Set the selected MongoDB connection variable before synchronizing CRM indexes.");
  await mongoose.connect(uri, { bufferCommands: false, maxPoolSize: 10, serverSelectionTimeoutMS: 10_000 });
  await Promise.all([
    CrmLoginLimit.createIndexes(), CrmUser.createIndexes(), Lead.createIndexes(),
    LeadConflict.createIndexes(), PublicLeadLimit.createIndexes(),
    Client.createIndexes(), Project.createIndexes(), ClientConversionConflict.createIndexes(),
    Task.createIndexes(), CrmNotification.createIndexes(), CrmSecurityState.createIndexes(),
  ]);
  console.log(`CRM indexes created for the explicitly selected ${testUri ? "test" : "production"} target.`);
}

main().catch((error: unknown) => {
  console.error("CRM index synchronization failed:", error instanceof Error ? error.name : "unknown error");
  process.exitCode = 1;
}).finally(async () => {
  await mongoose.disconnect();
});
