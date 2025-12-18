import { Sort } from "@angular/material/sort";
import { environment } from "@environment";

import {
  RecommendationGmcOutcome,
  RecommendationStatus
} from "../recommendation/recommendation-history.interface";
import {
  FormControlBase,
  AutocompleteControl,
  FormControlType
} from "../shared/form-controls/form-contol-base.model";
import { IRecordDataCell } from "../records/records.interfaces";

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export const COLUMN_DATA: IRecordDataCell[] = [
  {
    label: "Designated body",
    name: "designatedBody",
    enableSort: false,
    displayType: "dbc",
    isLondonOnly: true
  },

  {
    label: "GMC Submission due date",
    name: "submissionDate",
    enableSort: true,
    displayType: "date"
  },

  {
    label: "GMC Status",
    name: "gmcOutcome",
    enableSort: false
  },

  {
    label: "TIS Status",
    name: "doctorStatus",
    enableSort: false
  },
  {
    label: "Current programme name",
    name: "programmeName",
    enableSort: false
  },

  {
    label: "Programme membership type",
    name: "programmeMembershipType",
    enableSort: false
  },

  {
    label: "Curriculum end date",
    name: "curriculumEndDate",
    enableSort: false,
    displayType: "date"
  },
  {
    label: "Admin",
    name: "admin",
    enableSort: false,
    displayType: "admin"
  },

  {
    label: "Last updated",
    name: "lastUpdatedDate",
    enableSort: false,
    displayType: "date"
  }
];

export const RECOMMENDATION_SORT: Sort = {
  active: "submissionDate",
  direction: "asc"
};

export const DEFERRAL_MIN_DAYS = 120;
export const DEFERRAL_MAX_DAYS = 365;
export const DEFERRAL_PERMITTED_MAX_DAYS = 120;

export const TABLE_FILTERS_FORM_BASE: Array<
  FormControlBase | AutocompleteControl
> = [
  {
    key: "programmeName",
    label: "Programme name",
    order: 1,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing..."
  },
  {
    key: "gmcStatus",
    label: "GMC status",
    options: [
      {
        key: RecommendationGmcOutcome.APPROVED,
        value: RecommendationGmcOutcome.APPROVED
      },
      {
        key: RecommendationGmcOutcome.REJECTED,
        value: RecommendationGmcOutcome.REJECTED
      },
      {
        key: RecommendationGmcOutcome.UNDER_REVIEW,
        value: RecommendationGmcOutcome.UNDER_REVIEW
      }
    ],
    order: 2,
    controlType: FormControlType.SELECTION_LIST,
    initialValue: []
  },
  {
    key: "tisStatus",
    label: "TIS status",
    options: [
      {
        key: getEnumKeyByEnumValue(
          RecommendationStatus,
          RecommendationStatus.NOT_STARTED
        ),
        value: RecommendationStatus.NOT_STARTED
      },
      {
        key: getEnumKeyByEnumValue(
          RecommendationStatus,
          RecommendationStatus.SUBMITTED_TO_GMC
        ),
        value: RecommendationStatus.SUBMITTED_TO_GMC
      },
      {
        key: getEnumKeyByEnumValue(
          RecommendationStatus,
          RecommendationStatus.DRAFT
        ),
        value: RecommendationStatus.DRAFT
      },
      {
        key: getEnumKeyByEnumValue(
          RecommendationStatus,
          RecommendationStatus.COMPLETED
        ),
        value: RecommendationStatus.COMPLETED
      }
    ],
    order: 3,
    controlType: FormControlType.SELECTION_LIST,
    initialValue: []
  },
  {
    key: "admin",
    label: "TIS admin",
    order: 5,
    controlType: FormControlType.AUTOCOMPLETE,
    placeholder: "Start typing...",
    minLengthTerm: 2,
    data: []
  }
];

export const TABLE_FILTERS_FORM_DBC: FormControlBase = {
  key: "dbcs",
  label: "Designated Body",
  options: environment.londonDBCs,
  order: 4,
  controlType: FormControlType.SELECTION_LIST,
  initialValue: []
};
