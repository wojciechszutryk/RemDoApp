export const SEARCH_PHRASE_PARAM = "phrase";
export const SEARCH_SCOPE_PARAM = "scope";
export const SEARCH_LIMIT_PARAM = "limit";

export const SEARCH_HISTORY_RECORD_PARAM = "searchRecordId";

export const URL_SEARCH = `/search`;
export const URL_RECORD = "/record";
export const URL_HISTORY = "/history";

export const URL_SINGLE_HISTORY = (recordId?: string) =>
  `/${recordId || ":" + SEARCH_HISTORY_RECORD_PARAM}`;
