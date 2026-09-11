import { IMenuItem, MenuType } from "./menu-item.interface";

const REFERENCE_VIEW_ROLES = ["HEE TIS Admin"];

export const menuItems: IMenuItem[] = [
  {
    name: "People",
    type: MenuType.EXTERNAL,
    route: "admin/people/person-search",
    description: "",
    menuItems: [
      {
        type: MenuType.EXTERNAL,
        route: "admin/people/person-search",
        name: "Add person record",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/uploads",
        name: "Bulk upload",
        description: ""
      }
    ]
  },
  {
    name: "Posts",
    type: MenuType.EXTERNAL,
    route: "admin/posts",
    description: "",
    menuItems: [
      {
        type: MenuType.EXTERNAL,
        route: "admin/posts/post",
        name: "Search posts",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/posts/new-post",
        name: "Create posts",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/uploads",
        name: "Bulk upload",
        description: ""
      }
    ]
  },
  {
    name: "Programmes",
    type: MenuType.EXTERNAL,
    route: "admin/programmes",
    description: "",
    menuItems: [
      {
        type: MenuType.EXTERNAL,
        route: "admin/programmes/new-programme",
        name: "Create programmes",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/programmes/curriculum",
        name: "Curricula",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/rotations/rotations",
        name: "Rotations",
        description: ""
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/programmes/list",
        name: "Search programmes",
        description: ""
      }
    ]
  },
  {
    name: "Revalidation",
    type: MenuType.INTERNAL,
    route: "/",
    description: "",
    menuItems: [
      {
        type: MenuType.INTERNAL,
        route: "/recommendations",
        name: "Recommendations",
        description: ""
      },
      {
        type: MenuType.INTERNAL,
        route: "/connections",
        name: "Connections",
        description: ""
      }
    ]
  },
  {
    name: "Assessments",
    type: MenuType.EXTERNAL,
    route: "admin/assessment",
    description: ""
  },
  {
    name: "Admin",
    roles: [
      ...REFERENCE_VIEW_ROLES,
      "Reference Site Admin",
      "Reference Trust Admin"
    ],
    type: MenuType.EXTERNAL,
    route: "admin/reference",
    description: "",
    menuItems: [
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/college",
        name: "College",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/country",
        name: "Country",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "/admin/programmes/curriculum",
        name: "Curricula",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/curriculum-sub-type",
        name: "Curriculum SubType",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/dbc",
        name: "Dbc",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/ethnic-origin",
        name: "Ethnic Origin",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/funding-issue",
        name: "Funding Issue",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/funding-type",
        name: "Funding Type",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/gdc-status",
        name: "Gdc Status",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/gender",
        name: "Gender",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/gmc-status",
        name: "Gmc Status",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/grade",
        name: "Grade",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/inactive-reason",
        name: "Inactive Reason",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/leaving-destination",
        name: "Leaving Destination",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/leaving-reason",
        name: "Leaving Reason",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/local-office",
        name: "Local Office",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/marital-status",
        name: "Marital Status",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/medical-school",
        name: "Medical School",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/nationality",
        name: "Nationality",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/placement-type",
        name: "Placement Type",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/programme-membership-type",
        name: "Programme Membership Type",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/record-type",
        name: "Record Type",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/religious-belief",
        name: "Religious Belief",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/role",
        name: "Role",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/settled",
        name: "Settled",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/sexual-orientation",
        name: "Sexual Orientation",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/site",
        name: "Site",
        description: "",
        roles: [...REFERENCE_VIEW_ROLES, "Reference Site Admin"]
      },
      {
        type: MenuType.EXTERNAL,
        route: "/admin/programmes/specialty",
        name: "Specialty",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "/admin/programmes/specialty-group",
        name: "Specialty Group",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/status",
        name: "Status",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/tariff-rate",
        name: "Tariff Rate",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/title",
        name: "Title",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/training-number-type",
        name: "Training Number Type",
        description: "",
        roles: REFERENCE_VIEW_ROLES
      },
      {
        type: MenuType.EXTERNAL,
        route: "admin/reference/trust",
        name: "Trust",
        description: "",
        roles: [...REFERENCE_VIEW_ROLES, "Reference Trust Admin"]
      }
    ]
  }
];
