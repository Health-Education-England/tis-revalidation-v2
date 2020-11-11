export const ACTION_REASONS = [
  {
    action: "Add connection",
    reasons: [
      "Doctor has a connection with this local office",
      "Conflict of interest"
    ]
  },
  {
    action: "Remove connection",
    reasons: [
      "Doctor has retired (2)",
      "Doctor has a connection with this local office",
      "Conflict of interest"
    ]
  },
  {
    action: "Review connection",
    reasons: []
  },
  {
    action: "Ignore connection",
    reasons: []
  }
];

export const ADMIN_ROLES = [
  "RevalSuperAdmin",
  "RevalTISAdmin1",
  "RevalTISAdmin2"
];
