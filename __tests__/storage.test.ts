import { sendUsageData, IUsage } from '../lib/storage';
import mongoose from 'mongoose';

// Mock environment variables
process.env.MONGODB_URI = 'mongodb://test';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    readyState: 0
  }
}));

// Mock the Usage model
jest.mock('../models/UsageData', () => ({
  __esModule: true,
  default: {
    create: jest.fn()
  }
}));

import Usage from '../models/UsageData';

describe('sendUsageData', () => {
  const usageData: IUsage = {
    requestTimestamp: 1,
    responseTimestamp: 2,
    filterApplied: 'test',
    entryCount: 10,
    duration: 100,
    userAgent: 'jest',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mongoose.connection as any).readyState = 0;
    (mongoose.connect as jest.Mock).mockResolvedValue(undefined);
    (Usage.create as jest.Mock).mockResolvedValue(usageData);
  });

  afterAll(() => {
    delete process.env.MONGODB_URI;
  });

  it('should call Usage.create with correct data', async () => {
    await sendUsageData(usageData);
    expect(Usage.create).toHaveBeenCalledWith(usageData);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('DB error');
    (Usage.create as jest.Mock).mockRejectedValueOnce(error);
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await sendUsageData(usageData);
    
    expect(consoleSpy).toHaveBeenCalledWith('Error sending usage data:', error);
    consoleSpy.mockRestore();
  });

  it('should connect to database if not already connected', async () => {
    await sendUsageData(usageData);
    expect(mongoose.connect).toHaveBeenCalled();
  });

  it('should not connect to database if already connected', async () => {
    (mongoose.connection as any).readyState = 1; // Connected state
    await sendUsageData(usageData);
    expect(mongoose.connect).not.toHaveBeenCalled();
  });
}); 