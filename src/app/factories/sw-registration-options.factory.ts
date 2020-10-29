import { environment } from "@environment";

export function swRegistrationOptionsFactory() {
  return {
    enabled: environment.production
  };
}
