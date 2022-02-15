import React, { ReactElement } from "react";

import {
  Table,
  Column
} from "../..";
import Styles from "./styles";

type Person = {
  name: string;
  age: number;
};

export default (): ReactElement => {
  const columns = React.useMemo<Array<Column<Person>>>(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Age",
        accessor: "age"
      }
    ],
    []
  );

  const data: Person[] = [
    {
      name: "Sam",
      age: 29
    }
  ];

  return (
    <Styles>
      <Table<Person>
        columns={columns}
        data={data}
        loading={false}
        fetchData={() => console.log("hello")}
      />
    </Styles>
  );
};