import axios from "axios";
import { Environment } from "../constants";

export const strapiClient = axios.create({
  baseURL: Environment.STRAPI_API_URL
});

strapiClient.interceptors.request.use((config) => {
  const token = Environment.STRAPI_API_TOKEN;
  config.headers["Accept"] = "application/json";
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

export const fetcher = (url: string) => {
  return strapiClient.get(url).then(res => res.data);
}

export function getStrapiMedia(url: string| undefined) {
  if (url == null) {
    return undefined;
  }

  if (url.startsWith("http")) {
    return url;
  }

  // Otherwise extract the pathname and prepend the URL path with the Strapi URL
  try {
    const parsedUrl = new URL(url, Environment.CLOUDFRONT_BASE_URL);
    return `${Environment.CLOUDFRONT_BASE_URL}${parsedUrl.pathname}`;
  } catch (error) {
    // In case of an invalid URL, return the original url or handle it as needed
    console.error('Invalid URL:', error);
    return url;
  }

}
