import {
  IConnectionHistory,
  IConnectionResponse,
  IHiddenDiscrepancy,
  IUserDBC
} from "../../connection.interfaces";

const connectionHistory: IConnectionHistory[] = [
  {
    connectionId: "b64ce5b7-7daf-4781-b51a-253c8b365e06",
    gmcId: "123456",
    gmcClientId: "e6788bfc-31b8-4f42-85fa-7e2ebd6be048",
    newDesignatedBodyCode: "1-AIIDHJ",
    previousDesignatedBodyCode: "1-AIIDHJ",
    reason: "Conflict of interest",
    reasonMessage: null,
    requestType: "ADD",
    requestTime: new Date(),
    responseCode: "80",
    responseMessage: "Missing / Invalid Designated Body code",
    updatedBy: "reval.admin@hee.nhs.uk"
  },
  {
    connectionId: "08f0b3dc-7ce6-4657-a7a7-12504fbdb72c",
    gmcId: "123456",
    gmcClientId: "e6dc787a-bfb4-456f-ac82-36db276d3265",
    newDesignatedBodyCode: "1-AIIDMQ",
    previousDesignatedBodyCode: "1-AIIDHJ",
    reason: "Conflict of interest",
    reasonMessage: null,
    requestType: "REMOVE",
    requestTime: new Date(),
    responseCode: "100",
    responseMessage: "Doctor already associated with your Designated Body",
    updatedBy: "reval.admin@hee.nhs.uk"
  }
];

const hiddenDiscrepancies: IHiddenDiscrepancy[] = [
  {
    id: "69cb99444dadd14f27a0d092",
    gmcId: "123456",
    hiddenForDesignatedBodyCode: "1-RSSQ05",
    hiddenBy: "test",
    reason:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget mi ultrices, aliquam lectus et, faucibus magna.",
    hiddenDateTime: "2026-03-31T09:52:04.703"
  },
  {
    id: "69e73b703bd79b659f0c1528",
    gmcId: "234567",
    hiddenForDesignatedBodyCode: "1-1RSSQ05",
    hiddenBy: "Bob Fossil",
    reason: "dfgdfg",
    hiddenDateTime: "2026-04-21T08:55:12.879"
  },
  {
    id: "69e73ddd3bd79b659f0c152f",
    gmcId: "345678",
    hiddenForDesignatedBodyCode: "1-1RSSPZ7",
    hiddenBy: "Dixon Bainbridge",
    reason: "Test",
    hiddenDateTime: "2026-04-21T09:05:33.948"
  },
  {
    id: "69e771703bd79b659f0c1541",
    gmcId: "4567890",
    hiddenForDesignatedBodyCode: "1-1RUZUYF",
    hiddenBy: "test",
    reason: "test",
    hiddenDateTime: "2026-04-21T12:45:36.893"
  },
  {
    id: "69e7784f3bd79b659f0c1542",
    gmcId: "5678901",
    hiddenForDesignatedBodyCode: "1-1RSSQ5L",
    hiddenBy: "test",
    reason: "test",
    hiddenDateTime: "2026-04-21T13:14:55.409"
  },
  {
    id: "69e781a13bd79b659f0c1572",
    gmcId: "6789012",
    hiddenForDesignatedBodyCode: "1-1RUZV1D",
    hiddenBy: "test",
    reason: "test",
    hiddenDateTime: "2026-04-21T13:54:41.82"
  }
];

const designatedBodyCode: IUserDBC = {
  designatedBodyCode: "1-1RUZV1D"
};

export const mockConnectionResponse: IConnectionResponse = {
  designatedBodyCode,
  hiddenDiscrepancies,
  connection: {
    connectionHistory
  }
};

export const mockHiddenDiscrepanciesColumnsToDisplay: string[] = [
  "id",
  "hiddenForDesignatedBodyCode",
  "hiddenBy",
  "reason",
  "hiddenDateTime"
];
