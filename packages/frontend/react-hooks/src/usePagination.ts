import {
  useReducer,
  useRef
} from "react";

export type SortOrder<T> = Array<[ keyof T, "ASC" | "DESC" ]>;

export interface PaginationState<ResponseObject, FilterOptions> {
  /** Starting item index of the current page */
  offset: number;
  /** Page size */
  limit: number;
  /** Results sorting */
  order?: SortOrder<ResponseObject>;
  /** Results filtering */
  filters?: FilterOptions;
}

export interface PaginationActions<ResponseObject, FilterOptions> {
  /** Load the next page */
  next: () => void;
  /** Load the previous page */
  previous: () => void;
  /** Set page size */
  setPageSize: (pageSize: number) => void;
  /** Set sort key and order */
  sort: (order: SortOrder<ResponseObject> | null) => void;
  /** Set filters */
  filter: (filters: FilterOptions | null) => void;
  /** Reset to initial pagination state */
  reset: () => void;
}

export interface Pagination<ResponseObject, FilterOptions> {
  /** Pagination params for controlling a paginated API endpoint */
  params: PaginationState<ResponseObject, FilterOptions>;
  /** Pagination actions for updating pagination state */
  actions: PaginationActions<ResponseObject, FilterOptions>;
}

interface ReducerAction<ResponseObject, FilterOptions> {
  type: keyof PaginationActions<ResponseObject, FilterOptions>;
  payload?: Partial<PaginationState<ResponseObject, FilterOptions>>;
}

type PaginationReducer<T, U> = React.Reducer<PaginationState<T, U>, ReducerAction<T, U>>;

const reducer = <T, U>(state: PaginationState<T, U>, action: ReducerAction<T, U>): PaginationState<T, U> => {
  if (action.type === "next") {
    return {
      ...state,
      offset: state.offset + state.limit
    };
  } else if (action.type === "previous") {
    const canGoBack = state.offset >= state.limit;

    return {
      ...state,
      offset: canGoBack ? state.offset - state.limit : state.offset
    };
  } else if (action.type === "setPageSize" && action.payload?.limit) {
    return {
      ...state,
      offset: 0,
      limit: action.payload.limit
    };
  } else if (action.type === "sort") {
    return {
      ...state,
      offset: 0,
      order: action.payload?.order
    };
  } else if (action.type === "filter") {
    return {
      ...state,
      offset: 0,
      filters: action.payload?.filters
    };
  } else if (action.type === "reset" && action.payload) {
    return action.payload as PaginationState<T, U>;
  }

  return state;
};

/** Custom reducer to handle offset-based pagination of API endpoints in React */
// eslint-disable-next-line @typescript-eslint/ban-types
export const usePagination = <ResponseObject extends object, FilterOptions extends object = Partial<ResponseObject>>(initialState: PaginationState<ResponseObject, FilterOptions>): Pagination<ResponseObject, FilterOptions> => {
  const [ paginationState, dispatch ] = useReducer<PaginationReducer<ResponseObject, FilterOptions>>(reducer, initialState);

  // useRef ensures that paginationActions remains stable, avoiding useEffect loops when calling these actions
  const paginationActions = useRef<PaginationActions<ResponseObject, FilterOptions>>({
    next: () => dispatch({ type: "next" }),
    previous: () => dispatch({ type: "previous" }),
    setPageSize: pageSize => dispatch({
      type: "setPageSize",
      payload: { limit: pageSize }
    }),
    sort: order => dispatch({
      type: "sort",
      payload: { order: order || undefined }
    }),
    filter: filters => dispatch({
      type: "filter",
      payload: { filters: filters || undefined }
    }),
    reset: () => dispatch({
      type: "reset",
      payload: initialState
    })
  });

  return {
    params: paginationState,
    actions: paginationActions.current
  };
};