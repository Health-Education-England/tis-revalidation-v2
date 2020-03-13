import { IMenuItem, MenuType } from "./menu-item.interface";

export const menuItems: IMenuItem[] = [
  //NOSONAR
  {
    name: "People",
    type: MenuType.external,
    route: "admin/people/person-search",
    description: "",
    menuItems: [
      {
        type: MenuType.external,
        route: "admin/people/person-search",
        name: "Add person record",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/uploads",
        name: "Bulk upload",
        description: ""
      }
    ]
  },
  {
    name: "Posts",
    type: MenuType.external,
    route: "admin/posts",
    description: "",
    menuItems: [
      {
        type: MenuType.external,
        route: "admin/posts/post",
        name: "Search posts",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/posts/new-post",
        name: "Create posts",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/uploads",
        name: "Bulk upload",
        description: ""
      }
    ]
  },
  {
    name: "Programmes",
    type: MenuType.external,
    route: "admin/programmes",
    description: "",
    menuItems: [
      {
        type: MenuType.external,
        route: "admin/programmes/new-programme",
        name: "Create programmes",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/programmes/curriculum",
        name: "Curricula",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/rotations/rotations",
        name: "Rotations",
        description: ""
      },
      {
        type: MenuType.external,
        route: "admin/programmes/list",
        name: "Search programmes",
        description: ""
      }
    ]
  },
  {
    name: "Revalidation",
    type: MenuType.internal,
    route: "admin/manage-connections",
    description: "",
    menuItems: [
      {
        type: MenuType.internal,
        route: "admin/manage-connections",
        name: "Manage connections",
        description: ""
      },
      {
        type: MenuType.internal,
        route: "concerns/",
        name: "Concerns log",
        description: ""
      },
      {
        type: MenuType.internal,
        route: "admin/manage-connections/create",
        name: "Connection discrepancies",
        description: ""
      },
      {
        type: MenuType.internal,
        route: "revalidation/",
        name: "Provide recommendation",
        description: ""
      }
    ]
  },
  {
    name: "Assessments",
    type: MenuType.external,
    route: "admin/assessment",
    description: ""
  },
  {
    name: "Admin",
    type: MenuType.external,
    route: "admin/reference",
    description: "",
    menuItems: [
      {
        type: MenuType.external,
        route: "/admin/reference/college",
        name: "College",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/country",
        name: "Country",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/programmes/curriculum",
        name: "Curricula",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/curriculum-sub-type",
        name: "Curriculum SubType",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/dbc",
        name: "Dbc",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/ethnic-origin",
        name: "Ethnic Origin",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/funding-issue",
        name: "Funding Issue",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/funding-type",
        name: "Funding Type",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/gdc-status",
        name: "Gdc Status",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/gender",
        name: "Gender",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/gmc-status",
        name: "Gmc Status",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/grade",
        name: "Grade",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/inactive-reason",
        name: "Inactive Reason",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/leaving-destination",
        name: "Leaving Destination",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/leaving-reason",
        name: "Leaving Reason",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/local-office",
        name: "Local Office",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/marital-status",
        name: "Marital Status",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/medical-school",
        name: "Medical School",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/nationality",
        name: "Nationality",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/placement-type",
        name: "Placement Type",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/programme-membership-type",
        name: "Programme Membership Type",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/record-type",
        name: "Record Type",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/religious-belief",
        name: "Religious Belief",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/role",
        name: "Role",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/settled",
        name: "Settled",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/sexual-orientation",
        name: "Sexual Orientation",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/site",
        name: "Site",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/programmes/specialty",
        name: "Specialty",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/programmes/specialty-group",
        name: "Specialty Group",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/status",
        name: "Status",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/tariff-rate",
        name: "Tariff Rate",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/title",
        name: "Title",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/training-number-type",
        name: "Training Number Type",
        description: ""
      },
      {
        type: MenuType.external,
        route: "/admin/reference/trust",
        name: "Trust",
        description: ""
      }
    ]
  }
];
