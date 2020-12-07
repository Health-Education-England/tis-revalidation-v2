import {
  IConnectionResponse,
  IConnectionDetails,
  IUserDBC
} from "../connection.interfaces";

const connection: IConnectionDetails = {
  gmcNumber: 123456,
  forenames: "Babul",
  surname: "Yasa",
  cctDate: new Date(),
  programmeMembershipType: "prg type1",
  programmeName: "prg name1",
  currentGrade: "GRADE",
  connectionHistory: [
    {
      programmeMembershipType: "prg type1",
      programmeName: "prg name1",
      programmeOwner: "prg owner1",
      programmeMembershipStartDate: new Date("10/11/2021"),
      programmeMembershipEndDate: new Date("10/11/2020")
    },
    {
      programmeMembershipType: "prg type2",
      programmeName: "prg name2",
      programmeOwner: "prg owner2",
      programmeMembershipStartDate: new Date("09/08/2019"),
      programmeMembershipEndDate: new Date("09/08/2020")
    }
  ]
};

const designatedBodyCode: IUserDBC = {
  designatedBodyCode: "1-AIIDSA"
};

export const mockConnectionResponse: IConnectionResponse = {
  connection,
  designatedBodyCode
};
