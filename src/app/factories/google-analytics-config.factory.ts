import { environment } from "@environment";

export function analyticsConfigFactory() {
  return {
    siteId: environment.siteIds,
    enabled: environment.production
  };
}
