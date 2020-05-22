// NOTE only import into tests or mock. Must remove from all imports from  production scripts
export const RevalidationHistoryRespone1 = {};
export const RevalidationHistoryRespone2 = JSON.parse(
  `{"fullName":"Hubey Coping","gmcNumber":"8304613","programmeMembershipType":"General Surgery","currentGrade":"grade","cctDate":"2020-05-22",
  "revalidations":[{"gmcOutcome":"APPROVED","revalidationType":"REVALIDATE","gmcSubmissionDate":"2017-10-16T11:57:29","actualSubmissionDate":"2017-11-30","gmcRevalidationId":null,"revalidationStatus":"SUBMITTED_TO_GMC","deferralDate":null,"deferralReason":null,"deferralComment":null,"admin":"emma.cruickshank@hee.nhs.uk"}]}`
);
export const notesResponse1 = JSON.parse(`[
    {"id": "123", "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
    {"id": "111", "note": "Pellentesque facilisis erat non mollis varius."},
    {"id": "3", "note": "Donec laoreet sapien a eros commodo ultricies."},
    {"id": "99", "note": "Maecenas ac dui dignissim, faucibus lectus sit amet, feugiat neque. et massa quis urna elementum interdum in ac neque. Vestibulum ut justo mattis, eleifend neque et, vulputate neque. Duis ornare leo at posuere feugiat."}
  ]`);
