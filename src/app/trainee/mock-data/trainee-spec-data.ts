// NOTE only import into tests or mock. Must remove from all imports from  production scripts
export const RevalidationHistoryRespone1 = {};
export const RevalidationHistoryRespone2 = JSON.parse(
  `{
    "gmcId": "7083139",
    "traineeName": "",
    "cctDate": "2015-09-08",
    "programmeMembershipType": "",
    "programmeName": "Gastro-enterology North East LDN",
    "currentGrade": "ST3",
    "recommendations": [{"Id":124735,"recommendation":"Revalidate","outcome":"Approved","gmcSubDueDate":"17-Jun-2020","ActSubDate":"16-Jun-2019","submittedBy":"A Pringle","submissionStatus":"Revalidated","comments":[{"id":1,"comment":"Form R received - no concerns"}]},{"Id":228741,"recommendation":"Revalidate","outcome":"Rejected","gmcSubDueDate":"18-Jun-2020","ActSubDate":"16-Jun-2019","submittedBy":"A Pringle","submissionStatus":"Non Engagement on the 16-Jun-2019","comments":[{"id":7,"comment":"Form R received - no concerns"},{"id":8,"comment":"Started GP training on 01/02/2019. No ARCP as yet."}]},{"Id":109876,"recommendation":"Revalidate","outcome":"Under review","gmcSubDueDate":"19-Jun-2020","ActSubDate":"16-Jun-2019","submittedBy":"A Pringle","submissionStatus":"Deferred on the 19-Jun-2020","comments":[{"id":2,"comment":"Form R submitted to new system. No concerns."},{"id":9,"comment":"Started GP training. No ARCP as yet."}]}]
  }
  `
);
export const notesResponse1 = JSON.parse(`[
    {"id": "123", "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
    {"id": "111", "note": "Pellentesque facilisis erat non mollis varius."},
    {"id": "3", "note": "Donec laoreet sapien a eros commodo ultricies."},
    {"id": "99", "note": "Maecenas ac dui dignissim, faucibus lectus sit amet, feugiat neque. et massa quis urna elementum interdum in ac neque. Vestibulum ut justo mattis, eleifend neque et, vulputate neque. Duis ornare leo at posuere feugiat."}
  ]`);
