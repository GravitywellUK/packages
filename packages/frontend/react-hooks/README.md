<h1 align="center">Gravitywell React Hooks</h1>
<p align="center">Library of commonly used React hooks</p>
<p align="center">
  <img src="https://img.shields.io/github/workflow/status/GravitywellUK/packages/CI/master" alt="CI" />
  <img src="https://img.shields.io/github/license/gravitywelluk/packages" alt="License" />
  <img src="https://img.shields.io/npm/dm/@gravitywelluk/react-hooks" alt="Downloads" />
  <img src="https://img.shields.io/npm/v/@gravitywelluk/react-hooks" alt="Version" />
</p>
<br />

## Usage

```typescript
import { <LIB_NAME_HERE> } from "@gravitywelluk/react-hooks";
```

## Table of Contents
- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [`useDebounce`](#usedebounce)
- [`useLocalStorage`](#uselocalstorage)
- [`useWindowDimensions`](#usewindowdimensions)

## `useDebounce`

A hook that returns a value once the `inputValue` has stopped mutating after a set amount of time.

```typescript
import { useDebounce } from "@gravitywelluk/react-hooks";

const [ value, seinputValuetValue ] = React.useState("");
const debouncedInputValue = useDebounce<string>(value, 800);

// On debouncedInputValue change
React.useEffect(() => {
  // Do something with the `debouncedInputValue` result
}, [ debouncedUserSearchValue ]);
```

## `useLocalStorage`

A hook that allows you to set and store data in local storage with the given `key`.

```typescript
import { useLocalStorage } from "@gravitywelluk/react-hooks";

const [localStorageValue, setLocalStorageValue] = useLocalStorage<string[]>('test', []);
```

## `useWindowDimensions`

A hook that returns an object containing the `width` and `height` of the device's window dimensions.

```typescript
import { useWindowDimensions } from "@gravitywelluk/react-hooks";

const windowDimension = useWindowDimensions();

/* Output:

{
  width: 320,
  height: 568
}

*/
```

## `usePagination`

A custom reducer to handle offset-based pagination of API endpoints.

### Usage

Basic demo [here](https://codesandbox.io/s/usepagination-zo97e)

```ts
import { usePagination } from "@gravitywelluk/react-hooks";
import { FiltersOptions as SequelizeFilterOptions } from "@gravitywelluk/sequelize-utils";
import { useTestApi, TestAttributes } from "@api/test";

const [ testResponse, testRequest ] = useTestApi("GET_TEST_ITEMS");

const pagination = usePagination<TestAttributes, SequelizeFilterOptions<TestAttributes>>({
  offset: 0,
  limit: 25,
  order: [ [ "a", "DESC" ] ],
  filters: {
    a: { $or: [ "one", "two" ] },
    b: true
  }
});

useEffect(() => {
  testRequest(pagination.params);
}, [ testRequest, pagination.params ]);
```

### API Reference
```ts
interface PaginationState<ResponseObject, FilterOptions> {
  /** Starting item index of the current page */
  offset: number;
  /** Page size */
  limit: number;
  /** Results sorting */
  order?: SortOrder<ResponseObject>;
  /** Results filtering */
  filters?: FilterOptions;
}

interface PaginationActions<ResponseObject, FilterOptions> {
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

interface Pagination<ResponseObject, FilterOptions> {
  /** Pagination params for controlling a paginated API endpoint */
  params: PaginationState<ResponseObject, FilterOptions>;
  /** Pagination actions for updating pagination state */
  actions: PaginationActions<ResponseObject, FilterOptions>;
}

type UsePagination = <ResponseObject extends object, FilterOptions extends object = Partial<ResponseObject>>(initialState: PaginationState<ResponseObject, FilterOptions>) => Pagination<ResponseObject, FilterOptions>;
```