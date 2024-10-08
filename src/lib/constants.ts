export const Environment = {
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN as string,
  STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL + "/api",
  STRAPI_BASE_URL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string,
  CLOUDFRONT_BASE_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_BASE_URL as string,
  SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL as string,
  SESSION_ENCRYPT_KEY: process.env.SESSION_ENCRYPT_KEY as string
};
