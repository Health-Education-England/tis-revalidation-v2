export enum ConnectionActions {
  ADD_CONNECTION = "Add connection",
  REMOVE_CONNECTION = "Remove connection",
  REVIEW_CONNECTION = "Review connection",
  IGNORE_CONNECTION = "Ignore connection"
}

export const ACTION_REASONS = [
  {
    action: ConnectionActions.ADD_CONNECTION,
    reasons: [
      "Doctor has a connection with this local office",
      "Conflict of interest"
    ]
  },
  {
    action: ConnectionActions.REMOVE_CONNECTION,
    reasons: [
      "Doctor has retired (2)",
      "Doctor has a connection with this local office",
      "Conflict of interest"
    ]
  },
  {
    action: ConnectionActions.REVIEW_CONNECTION,
    reasons: []
  },
  {
    action: ConnectionActions.IGNORE_CONNECTION,
    reasons: []
  }
];

export const ADMIN_ROLES = [
  "RevalSuperAdmin",
  "RevalTISAdmin1",
  "RevalTISAdmin2"
];
