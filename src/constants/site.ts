export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://danielebuser.com");
export const LINKEDIN_URL = "https://linkedin.com/in/daniele-buser";
export const GITHUB_URL = "https://github.com/dbuser03";
