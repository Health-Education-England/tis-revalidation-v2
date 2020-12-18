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
      programmeMembershipType: null,
      programmeName: null,
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
      programmeMembershipType: null,
      programmeName: null,
      programmeOwner: null,
      submissionDate: "2018-03-20"
    }
  ],
  totalResults: 45327,
  totalPages: 2267
};
