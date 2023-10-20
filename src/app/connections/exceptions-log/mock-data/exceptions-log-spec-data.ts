import { IException } from "../exceptions-log.interface";

export const exceptionsJson = `
[
   
    {
        "gmcId": "1",
        "errorMessage": "Error message",
        "timestamp": "2023-10-18T14:45:47.337",
        "admin": "admin"
    },
    {
        "gmcId": "3",
        "errorMessage": "Error message",
        "timestamp": "2023-10-18T14:45:47.337",
        "admin": "admin"
    },
    {
        "gmcId": "1",
        "errorMessage": "Error message",
        "timestamp": "2023-10-18T14:45:43.793",
        "admin": "admin"
    }

]
`;
export const mockExceptions: IException[] = JSON.parse(exceptionsJson);
