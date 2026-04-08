function getRequiredEnvironmentVariable(name: "DATABASE_URL"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to initialize the database client.`);
  }

  return value;
}

export const env = {
  DATABASE_URL: getRequiredEnvironmentVariable("DATABASE_URL"),
} as const;
