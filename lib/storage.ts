import mongoose from "mongoose";
import Usage from "@/models/UsageData";

export interface IUsage {
    requestTimestamp: number;
    responseTimestamp: number;
    filterApplied: string;
    entryCount: number;
    duration: number;
    userAgent: string;
}

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI || "");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
};

export const sendUsageData = async ({
  requestTimestamp,
  responseTimestamp,
  filterApplied,
  entryCount,
  duration,
  userAgent,
}: IUsage): Promise<void> => {
  try {
    await connectDB();
    await Usage.create({
      requestTimestamp,
      responseTimestamp,
      filterApplied,
      entryCount,
      duration,
      userAgent,
    });
  } catch (error) {
    console.error("Error sending usage data:", error);
  }
};
