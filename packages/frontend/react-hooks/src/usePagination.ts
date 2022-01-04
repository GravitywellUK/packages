import {
  useMemo,
  useReducer
} from "react";

export type SortOrder = "ASC" | "DESC";

export interface PaginationState {
  /** Starting item index of the current page */
  offset: number;
  /** Page size */
  limit: number;
  /** Sort order */
  order: SortOrder;
}

export interface PaginationActions {
  /** Load the next page */
  next: () => void;
  /** Load the previous page */
  previous: () => void;
  /** Set sort order */
  sort: (order: SortOrder) => void;
  /** Reverse sort order */
  invert: () => void;
  /** Set page size */
  setPageSize: (pageSize: number) => void;
  /** Reset to initial pagination state */
  reset: () => void;
}

export interface Pagination extends PaginationState, PaginationActions {
  /** Human-readable page number */
  currentPage: number;
}

interface ReducerAction {
  type: keyof PaginationActions;
  payload?: Partial<PaginationState>;
}

const reducer = (state: PaginationState, action: ReducerAction): PaginationState => {
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
  } else if (action.type === "sort" && action.payload?.order) {
    return {
      ...state,
      offset: 0,
      order: action.payload.order
    };
  } else if (action.type === "invert") {
    return {
      ...state,
      offset: 0,
      order: state.order === "ASC" ? "DESC" : "ASC"
    };
  } else if (action.type === "setPageSize" && action.payload?.limit) {
    return {
      ...state,
      offset: 0,
      limit: action.payload.limit
    };
  } else if (action.type === "reset" && action.payload) {
    return {
      ...state,
      ...action.payload
    };
  }

  return state;
};

type UsePagination = (initialState: PaginationState) => Pagination;

/** Custom reducer to handle pagination of Gravitywell API endpoints in React */
export const usePagination: UsePagination = initialState => {
  const [ paginationState, dispatch ] = useReducer(reducer, initialState);

  const currentPage = useMemo(() => {
    return (paginationState.offset / paginationState.limit) + 1;
  }, [ paginationState ]);

  const paginationActions = useMemo<PaginationActions>(() => ({
    next: () => dispatch({ type: "next" }),
    previous: () => dispatch({ type: "previous" }),
    sort: (order: SortOrder) => dispatch({
      type: "sort",
      payload: { order }
    }),
    invert: () => dispatch({ type: "invert" }),
    setPageSize: (pageSize: number) => dispatch({
      type: "setPageSize",
      payload: { limit: pageSize }
    }),
    reset: () => dispatch({
      type: "reset",
      payload: initialState
    })
  }), [ initialState ]);

  return {
    currentPage,
    ...paginationState,
    ...paginationActions
  };
};