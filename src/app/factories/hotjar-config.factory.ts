import { environment } from "@environment";

export function hotjarConfigFactory() {
  return {
    hotJarId: environment.hotJarId,
    hotJarSv: environment.hotJarSv,
    enabled: environment.production
  };
}
