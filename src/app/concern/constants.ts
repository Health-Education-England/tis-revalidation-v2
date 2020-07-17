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

export const ACCEPTED_IMAGE_FILE_TYPES: string[] = [
  ".apng",
  ".bmp",
  ".gif",
  ".jpeg",
  ".png",
  ".svg+xml",
  ".tiff",
  ".webp"
];
