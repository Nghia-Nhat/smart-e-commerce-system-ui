import Cookies from "js-cookie";
import { parseJwt } from "@/lib/jwt.util";

export function getCurrentUsername() {
  const access_token = Cookies.get("access_token");
  if (!access_token) {
    return null;
  }
  const parsedToken = parseJwt(access_token);
  return parsedToken.username;
}
