import {
  IConnectionHistory,
  IConnectionResponse,
  IProgramme,
  IUserDBC
} from "../connection.interfaces";

const programme: IProgramme = {
  gmcNumber: 123456,
  forenames: "Babul",
  surname: "Yasa",
  curriculumEndDate: new Date(),
  programmeMembershipType: "prg type1",
  programmeName: "prg name1",
  currentGrade: "GRADE",
  programmeHistory: [
    {
      designatedBodyCode: "1-AIIDVS",
      programmeMembershipType: "prg type1",
      programmeName: "prg name1",
      programmeOwner: "prg owner1",
      programmeMembershipStartDate: new Date("10/11/2021"),
      programmeMembershipEndDate: new Date("10/11/2020")
    },
    {
      designatedBodyCode: "1-AIIDMQ",
      programmeMembershipType: "prg type2",
      programmeName: "prg name2",
      programmeOwner: "prg owner2",
      programmeMembershipStartDate: new Date("09/08/2019"),
      programmeMembershipEndDate: new Date("09/08/2020")
    }
  ]
};

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
    responseMessage: "Missing / Invalid Designated Body code"
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
    responseMessage: "Doctor already associated with your Designated Body"
  }
];

const designatedBodyCode: IUserDBC = {
  designatedBodyCode: "1-AIIDSA"
};

export const mockConnectionResponse: IConnectionResponse = {
  programme,
  designatedBodyCode,
  connection: {
    connectionHistory
  }
};
