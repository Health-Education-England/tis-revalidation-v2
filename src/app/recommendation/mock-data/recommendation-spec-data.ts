// NOTE only import into tests or mock. Must remove from all imports from  production scripts
export const RecommendationHistoryRespone1 = {};
export const RecommendationHistoryRespone2 = JSON.parse(
  `{"fullName":"Arlyne McLachlan","gmcNumber":"8159064","programmeMembershipType":"General Surgery","currentGrade":"grade","cctDate":"2020-06-12","underNotice":"Yes","revalidations":[{"gmcNumber":"8159064","recommendationId":"5ed9d9db7d1e5d79f3f94789","gmcOutcome":"Under Review","recommendationType":"REVALIDATE","gmcSubmissionDate":"2015-08-26","actualSubmissionDate":"2015-08-26","gmcRevalidationId":null,"recommendationStatus":"SUBMITTED_TO_GMC","deferralDate":null,"deferralReason":null,"deferralSubReason":null,"deferralComment":null,"comments":["testing save coupled with submit functionality"],"admin":null},{"gmcNumber":"8159064","recommendationId":null,"gmcOutcome":"Rejected","recommendationType":"REVALIDATE","gmcSubmissionDate":"2019-04-01","actualSubmissionDate":"2019-04-19","gmcRevalidationId":null,"recommendationStatus":"SUBMITTED_TO_GMC","deferralDate":null,"deferralReason":null,"deferralSubReason":null,"deferralComment":"Form R - 05/07/2018 - No concern. ARCP - 25/07/2018 - Outcome 1","comments":null,"admin":"elena.gonzalez@hee.nhs.uk"}],"deferralReasons":[{"code":"1","reason":"Insufficient evidence","subReasons":[{"code":"1","reason":"Appraisal activity","subReasons":null},{"code":"2","reason":"Colleague feedback","subReasons":null},{"code":"3","reason":"Compliments and Complaints","subReasons":null},{"code":"4","reason":"CPD","subReasons":null},{"code":"5","reason":"Interruption to practice","subReasons":null},{"code":"6","reason":"Patient feedback","subReasons":null},{"code":"7","reason":"QIA","subReasons":null},{"code":"8","reason":"The doctor is subject to an ongoing process","subReasons":null}]},{"code":"2","reason":"The doctor is subject to an ongoing process","subReasons":[]}]}`
);
export const detailsSideNavResponse = JSON.parse(`{
  "gmcNumber": "1",
  "forenames": "Donny",
  "surname": "Hirthe",
  "cctDate": "2020-06-17",
  "programmeMembershipType": "General Surgery",
  "programmeName": "Substantive",
  "currentGrade": "grade"
}`);
export const notesResponse1 = JSON.parse(`[
    {"id": "123", "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"},
    {"id": "111", "note": "Pellentesque facilisis erat non mollis varius."},
    {"id": "3", "note": "Donec laoreet sapien a eros commodo ultricies."},
    {"id": "99", "note": "Maecenas ac dui dignissim, faucibus lectus sit amet, feugiat neque. et massa quis urna elementum interdum in ac neque. Vestibulum ut justo mattis, eleifend neque et, vulputate neque. Duis ornare leo at posuere feugiat."}
  ]`);

export const ConcernHistoryResponse1 = {};
export const ConcernHistoryResponse2 = JSON.parse(
  `{"gmcNumber":"65477888","concerns":[{"concernId":"70244","gmcNumber":"65477888","dateOfIncident":"2020-06-28","concernType":"AAAA","source":"BBBBB","dateReported":"2020-06-29","employer":"Royal London Hospital Trust","site":"AAAAA","grade":"Academic Clinical Fellow","status":"AAAAA","admin":"AAAAA","followUpDate":"2020-07-05","lastUpdatedDate":"2020-06-24","comments":["This is a test comment","and more"]},{"concernId":"70245","gmcNumber":"65477888","dateOfIncident":"2020-76-28","concernType":"AAAA","source":"BBBBB","dateReported":"2020-06-29","employer":"Royal London Hospital Trust","site":"AAAAA","grade":"Academic Clinical Fellow","status":"AAAAA","admin":"AAAAA","followUpDate":"2020-07-05","lastUpdatedDate":"2020-06-24","comments":["This is a test comment","and less","and very less"]}]}`
);
