import {
  ConnectionsFilterType,
  IConnection,
  IGetConnectionsResponse
} from "../connections.interfaces";

export const mockConnectionsResponse: IGetConnectionsResponse = {
  connections: [
    {
      connectionStatus: null,
      designatedBody: "1-AIIDWA",
      doctorFirstName: "Jonathan",
      doctorLastName: "Waller",
      gmcReferenceNumber: "9856987",
      programmeMembershipEndDate: null,
      programmeMembershipStartDate: null,
      programmeMembershipType: "Substantive",
      programmeName: "Histopathology South LDN",
      programmeOwner: null,
      submissionDate: "2018-03-20"
    },
    {
      connectionStatus: null,
      designatedBody: "1-AIITWA",
      doctorFirstName: "Andrew",
      doctorLastName: "Holmes",
      gmcReferenceNumber: "6589658",
      programmeMembershipEndDate: null,
      programmeMembershipStartDate: null,
      programmeMembershipType: "Substantive",
      programmeName: "Histopathology South LDN",
      programmeOwner: null,
      submissionDate: "2018-03-20"
    },
    {
      connectionStatus: null,
      designatedBody: "1-AIICWA",
      doctorFirstName: "Andrew",
      doctorLastName: "Howard",
      gmcReferenceNumber: "6589658",
      programmeMembershipEndDate: null,
      programmeMembershipStartDate: null,
      programmeMembershipType: "Military",
      programmeName: "Histopathology South LDN",
      programmeOwner: null,
      submissionDate: "2018-03-20"
    },
    {
      connectionStatus: null,
      designatedBody: "1-AIIDWA",
      doctorFirstName: "Jack",
      doctorLastName: "Reacher",
      gmcReferenceNumber: "6589658",
      programmeMembershipEndDate: null,
      programmeMembershipStartDate: null,
      programmeMembershipType: null,
      programmeName: "Foundation year programme",
      programmeOwner: null,
      submissionDate: "2018-03-20"
    }
  ],
  totalResults: 45327,
  totalPages: 2267
};
