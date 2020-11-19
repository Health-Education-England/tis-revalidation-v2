import {
  IConnectionResponse,
  IConnectionDetails,
  IDesignatedBody,
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
      connectionStatus: "open",
      designatedBodyCode: "HNEW",
      programmeMembershipStartDate: new Date("10/11/2021"),
      programmeMembershipEndDate: new Date("10/11/2020")
    },
    {
      programmeMembershipType: "prg type2",
      programmeName: "prg name2",
      programmeOwner: "prg owner2",
      connectionStatus: "closed",
      designatedBodyCode: "HNSW",
      programmeMembershipStartDate: new Date("09/08/2019"),
      programmeMembershipEndDate: new Date("09/08/2020")
    }
  ]
};

const dbcs: IDesignatedBody[] = [
  {
    id: 1,
    dbc: "1-AIIDWT",
    name: "Health Education England East of England",
    abbr: "HEEOE",
    status: "CURRENT"
  },
  {
    id: 2,
    dbc: "1-AIIDR8",
    name: "Health Education England Kent, Surrey and Sussex",
    abbr: "HEKSS",
    status: "CURRENT"
  },
  {
    id: 3,
    dbc: "1-AIIDSA",
    name: "Health Education England East Midlands",
    abbr: "HEEM",
    status: "CURRENT"
  }
];

const designatedBodyCode: IUserDBC = {
  designatedBodyCode: "1-AIIDSA"
};

export const mockConnectionResponse: IConnectionResponse = {
  connection,
  dbcs,
  designatedBodyCode
};
