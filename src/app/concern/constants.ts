import { IConcernSummary } from "./concern.interfaces";

// TODO check if being used in app and maybe remove
export const defaultConcern: IConcernSummary = {
  concernId: null,
  gmcNumber: null,
  dateOfIncident: null,
  concernType: null,
  source: null,
  dateReported: null,
  employer: null,
  site: null,
  grade: null,
  status: null,
  admin: null,
  followUpDate: null,
  lastUpdatedDate: null,
  comments: []
};

export const ACCEPTED_IMAGE_EXTENSIONS: string[] = [
  ".bmp",
  ".gif",
  ".jpeg",
  ".png",
  ".svg",
  ".tiff",
  ".webp"
];

export const ACCEPTED_IMAGE_MIMES: string[] = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
  "image/x-png"
];
