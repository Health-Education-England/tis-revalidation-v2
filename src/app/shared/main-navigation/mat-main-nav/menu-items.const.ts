import { IMenuItem } from "./menu-item.interface";
// SONAR DUPLICATES FOR Typescript Object
export const menuItems: IMenuItem[] = JSON.parse(
  `[
    {
        "name": "People",
        "type": 1,
        "route": "admin/people/person-search",
        "description": "",
        "menuItems": [
            {
                "type": 1,
                "route": "admin/people/person-search",
                "name": "Add person record",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/uploads",
                "name": "Bulk upload",
                "description": ""
            }
        ]
    },
    {
        "name": "Posts",
        "type": 1,
        "route": "admin/posts",
        "description": "",
        "menuItems": [
            {
                "type": 1,
                "route": "admin/posts/post",
                "name": "Search posts",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/posts/new-post",
                "name": "Create posts",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/uploads",
                "name": "Bulk upload",
                "description": ""
            }
        ]
    },
    {
        "name": "Programmes",
        "type": 1,
        "route": "admin/programmes",
        "description": "",
        "menuItems": [
            {
                "type": 1,
                "route": "admin/programmes/new-programme",
                "name": "Create programmes",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/programmes/curriculum",
                "name": "Curricula",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/rotations/rotations",
                "name": "Rotations",
                "description": ""
            },
            {
                "type": 1,
                "route": "admin/programmes/list",
                "name": "Search programmes",
                "description": ""
            }
        ]
    },
    {
        "name": "Revalidation",
        "type": 0,
        "route": "/",
        "description": "",
        "menuItems": [
            {
                "type": 0,
                "route": "/",
                "name": "Recommendations",
                "description": ""
            },
            {
                "type": 0,
                "route": "/concerns",
                "name": "Concerns",
                "description": ""
            },
            {
                "type": 0,
                "route": "/connections",
                "name": "Connections",
                "description": ""
            }                    
        ]
    },
    {
        "name": "Assessments",
        "type": 1,
        "route": "admin/assessment",
        "description": ""
    },
    {
        "name": "Admin",
        "type": 1,
        "route": "admin/reference",
        "description": "",
        "menuItems": [
            {
                "type": 1,
                "route": "/admin/reference/college",
                "name": "College",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/country",
                "name": "Country",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/programmes/curriculum",
                "name": "Curricula",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/curriculum-sub-type",
                "name": "Curriculum SubType",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/dbc",
                "name": "Dbc",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/ethnic-origin",
                "name": "Ethnic Origin",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/funding-issue",
                "name": "Funding Issue",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/funding-type",
                "name": "Funding Type",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/gdc-status",
                "name": "Gdc Status",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/gender",
                "name": "Gender",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/gmc-status",
                "name": "Gmc Status",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/grade",
                "name": "Grade",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/inactive-reason",
                "name": "Inactive Reason",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/leaving-destination",
                "name": "Leaving Destination",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/leaving-reason",
                "name": "Leaving Reason",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/local-office",
                "name": "Local Office",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/marital-status",
                "name": "Marital Status",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/medical-school",
                "name": "Medical School",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/nationality",
                "name": "Nationality",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/placement-type",
                "name": "Placement Type",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/programme-membership-type",
                "name": "Programme Membership Type",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/record-type",
                "name": "Record Type",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/religious-belief",
                "name": "Religious Belief",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/role",
                "name": "Role",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/settled",
                "name": "Settled",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/sexual-orientation",
                "name": "Sexual Orientation",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/site",
                "name": "Site",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/programmes/specialty",
                "name": "Specialty",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/programmes/specialty-group",
                "name": "Specialty Group",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/status",
                "name": "Status",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/tariff-rate",
                "name": "Tariff Rate",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/title",
                "name": "Title",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/training-number-type",
                "name": "Training Number Type",
                "description": ""
            },
            {
                "type": 1,
                "route": "/admin/reference/trust",
                "name": "Trust",
                "description": ""
            }
        ]
    }
]`
);
