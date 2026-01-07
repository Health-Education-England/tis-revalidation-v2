export interface FormControlBase {
  key: string;
  label?: string;
  value?: string;
  valueProperty?: string;
  initialValue?: any;
  required?: boolean;
  order: number;
  controlType: string;
  text?: string;
  placeholder?: string;
  filterType?: string;
  options?: {
    key: string;
    value?: string;
    valueProperty?: string;
  }[];
}

export interface AutocompleteControl extends FormControlBase {
  minLengthTerm?: number;
  data?: string[];
  dataService?: string;
}

export interface DateRangeControl extends FormControlBase {
  startRangeControl: string;
  endRangeControl: string;
  outputDateFormat?: string;
}

export enum FormControlType {
  AUTOCOMPLETE = "autocomplete",
  SELECTION_LIST = "selectionList",
  CHECKBOX = "checkbox",
  DATERANGE = "daterange"
}

export type OnChangeFn<T> = (value: T) => void;
export type OnTouchFn = () => void;
