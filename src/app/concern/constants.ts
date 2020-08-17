import { IConcernSummary } from "./concern.interfaces";

export const defaultConcern: IConcernSummary = {
  admin: null,
  comments: [],
  concernType: null,
  dateOfIncident: null,
  dateReported: null,
  employer: null,
  followUpDate: null,
  gmcNumber: null,
  grade: null,
  lastUpdatedDate: null,
  site: null,
  source: null,
  status: null
};

export const ACCEPTED_IMAGE_EXTENSIONS: string[] = [
  "bmp",
  "gif",
  "jpeg",
  "png",
  "svg",
  "tiff",
  "webp"
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
