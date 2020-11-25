export const putObject: jest.Mock<AWS.S3.PutObjectOutput> = jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ key: "file.csv" }) });
