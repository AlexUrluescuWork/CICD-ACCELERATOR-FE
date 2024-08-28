import {
  Button,
  Checkbox,
  ConfigProvider,
  Flex,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import {
  DownOutlined,
  RightOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  CustomExpandIconProps,
  EnvStatusTypes,
  IEnvDetails,
  IntireObject,
} from "@/types";

interface ICustomTable {
  tableData: IntireObject[];
  setTableData: React.Dispatch<React.SetStateAction<IntireObject[]>>;
  dynamicColumns: any[];
  setDynamicColumns: any;
}

export const CustomTable: React.FC<ICustomTable> = ({
  tableData,
  setTableData,
  dynamicColumns,
  setDynamicColumns,
}) => {
  const filterData = tableData.map((app) => ({
    text: app.name,
    value: app.name,
  }));

  const sandBoxFilters = [
    { text: "Active", value: EnvStatusTypes.ACTIVE },
    { text: "Loading", value: EnvStatusTypes.LOADING },
    { text: "Failure", value: EnvStatusTypes.FAILURE },
  ];

  const [sortOrder, setSortOrder] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    filterData.map((filter) => filter.value)
  );
  const [selectedFilterSandBox, setSelectedFiltersSandBox] = useState<string[]>(
    []
  );
  const [selectedFilterQA, setSelectedFiltersQA] = useState<string[]>([]);

  const handleMasterCheckboxChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;

    if (checked) {
      setChecked(true);
      setSelectedFilters(filterData.map((filter) => filter.value));
    } else {
      setChecked(false);
      setSelectedFilters([]);
    }
  };
  // const computedWidth = () => {
  //   let environments = ["sandBox", "qa", "uat", "staging", "production"];
  //   if (dynamicColumns.length > 0) {
  //     environments.push(dynamicColumns[0].dataIndex);
  //   }

  //   const numbersOfEnvs = environments.length;
  //   const widthColumn = 75 / numbersOfEnvs;

  //   setColumnWidth(widthColumn);
  // };

  const handleSortChange = (sorter: string) => {
    setSortOrder(sorter);

    if (sorter === "desc") {
      const tableDataSorted = tableData.sort((a, b) => b.activity - a.activity);
      setTableData([...tableDataSorted]);
    }

    if (sorter === "asc") {
      const tableDataSorted = tableData.sort((a, b) => a.activity - b.activity);
      setTableData([...tableDataSorted]);
    }
  };

  const getTheTimeInterval = (start: string) => {
    const date1: Date = new Date(start);
    const date2: Date = new Date();

    const diffInMs: number = date2.getTime() - date1.getTime();
    const hoursDiff: number = diffInMs / (1000 * 60 * 60);

    return hoursDiff;
  };

  const getColorByTime = (start: string, end: string, status: any) => {
    const date1: Date = new Date(start);
    const date2: Date = new Date();

    const diffInMs: number = date2.getTime() - date1.getTime();
    const hoursDiff: number = diffInMs / (1000 * 60 * 60);

    if (status === EnvStatusTypes.FAILURE) {
      return "c-bg-legend-error";
    }

    if (status === EnvStatusTypes.LOADING) {
      return "c-bg-gray";
    }

    if (hoursDiff > 12 && hoursDiff < 24) {
      return "c-bg-legend-passable c-font-color-white";
    } else if (hoursDiff > 5 && hoursDiff < 12) {
      return "c-bg-legend-satisfactory c-font-color-white";
    } else if (hoursDiff > 1 && hoursDiff < 5) {
      return "c-bg-legend-good c-font-color-white";
    } else if (hoursDiff < 1) {
      return "c-bg-legend-success c-font-color-white";
    } else {
      return "c-bg-white c-font-color-black c-border-gray-light";
    }
  };

  const addColumn2 = () => {
    const dynamicKey = "dev"; // This could be any string or determined dynamically
    const newColumn = {
      title: `New Column ${dynamicColumns.length + 1}`,
      dataIndex: dynamicKey,
      key: dynamicKey,
      render: (_: any, record: any) => {
        return <span>{record.name}</span>;
      }, // Example data rendering
    };

    const newValue = {
      version: "version2",
      start: "2024-08-13T10:00:00",
      end: "2024-08-13T18:30:00",
      status: "loaging",
    };
    const newValue2 = "test";

    setTableData([...tableData]);

    // Update the state to include the new dynamic key in each object
    setTableData((prevData) =>
      prevData.map((item) => ({
        ...item, // Spread existing properties
        details: {
          ...item.details, // Spread existing details
          changeLog: {
            ...item.details.changeLog, // Spread existing changelog
            [dynamicKey]: newValue2, // Add new key to changelog
          },
          deploymentDateTime: {
            ...item.details.deploymentDateTime, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          deploymentHistory: {
            ...item.details.deploymentHistory, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          pipelineRun: {
            ...item.details.pipelineRun, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          rollback: {
            ...item.details.rollback, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
        },
        [dynamicKey]: newValue,
      }))
    );

    setDynamicColumns([...dynamicColumns, newColumn]);
  };

  const addColumn = () => {
    const dynamicKey = "testing"; // This could be any string or determined dynamically
    const newColumn = {
      title: `New Column ${dynamicColumns.length + 1}`,
      dataIndex: dynamicKey,
      key: dynamicKey,
      render: (_: any, record: any) => {
        return <span>{record.name}</span>;
      }, // Example data rendering
    };

    const newValue = {
      version: "version",
      start: "2024-08-13T10:00:00",
      end: "2024-08-13T18:30:00",
      status: "active",
    };

    const newValue2 = "test";

    // Update the state to include the new dynamic key in each object
    setTableData((prevData) =>
      prevData.map((item) => ({
        ...item, // Spread existing properties
        status: "active",
        details: {
          ...item.details, // Spread existing details
          changeLog: {
            ...item.details.changeLog, // Spread existing changelog
            [dynamicKey]: newValue2, // Add new key to changelog
          },
          deploymentDateTime: {
            ...item.details.deploymentDateTime, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          deploymentHistory: {
            ...item.details.deploymentHistory, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          pipelineRun: {
            ...item.details.pipelineRun, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
          rollback: {
            ...item.details.rollback, // Spread existing uat
            [dynamicKey]: newValue2, // Add new key to uat
          },
        },
        [dynamicKey]: newValue,
      }))
    );

    setDynamicColumns([...dynamicColumns, newColumn]);
  };

  const expandedRowRender = (record: IntireObject) => {
    let environments = ["sandBox", "qa", "uat", "staging", "production"];
    if (dynamicColumns.length > 0) {
      const dynamicColumnsNames = dynamicColumns.map(
        (column: any) => column.dataIndex
      );
      environments = [...environments, ...dynamicColumnsNames];
    }

    const columns = [
      {
        title: "Application name",
        dataIndex: "name",
        key: "name",
        width: "auto",
        render: (text: string) => (
          <Flex>
            <span className="c-font-capitalize c-font-color-gray">{text}</span>
          </Flex>
        ),
      },
      ...environments.map((env) => ({
        title: (
          <Flex>
            <span>{env.charAt(0).toUpperCase() + env.slice(1)}</span>
          </Flex>
        ),
        dataIndex: env,
        key: env,
        width: 150,
        render: (text: string, row: { name: string }) => {
          let component;

          if (text === EnvStatusTypes.LOADING) {
            component = (
              <Flex
                justify="center"
                className={`c-p-1 c-font-color-gray`}
                style={{ width: 150, minHeight: "50px" }}
              >
                <span style={{ fontSize: 13 }}>-</span>
              </Flex>
            );
          } else {
            component = (
              <Flex
                justify="center"
                className={`c-p-1 c-font-color-gray`}
                style={{ width: 150, minHeight: "50px" }}
              >
                {row.name === "Rollback" ||
                row.name === "Deployment Date Time" ? (
                  <span style={{ fontSize: 13 }}>{text}</span>
                ) : (
                  <Flex className="c-w-100" justify="center">
                    <a style={{ fontSize: 13 }}>{text}</a>
                  </Flex>
                )}
              </Flex>
            );
          }

          return component;
        },
      })),
    ];

    // const detailsData = (Object.keys(record.details) as (keyof IDetails)[]).map(
    //   (key) => ({
    //     key,
    //     name: record.details[key].name,
    //     sandBox: {
    //       content: record.details[key].sandBox.content,
    //       start: record.details[key].sandBox.start,
    //       end: record.details[key].sandBox.end,
    //     },
    //     qa: {
    //       content: record.details[key].qa.content,
    //       start: record.details[key].qa.start,
    //       end: record.details[key].qa.end,
    //     },
    //     uat: {
    //       content: record.details[key].uat.content,
    //       start: record.details[key].uat.start,
    //       end: record.details[key].uat.end,
    //     },
    //     staging: {
    //       content: record.details[key].staging.content,
    //       start: record.details[key].staging.start,
    //       end: record.details[key].staging.end,
    //     },
    //     production: {
    //       content: record.details[key].production.content,
    //       start: record.details[key].production.start,
    //       end: record.details[key].production.end,
    //     },
    //     testing: {
    //       content: record.details[key].testing.content,
    //       start: record.details[key].testing.start,
    //       end: record.details[key].testing.end,
    //     },
    //   })
    // );

    // const detailsData = (Object.keys(record.details) as (keyof IDetails)[]).map(
    //   (key) => ({
    //     key,
    //     name: record.details[key].name,
    //     ...environments.reduce(
    //       (acc, env) => ({
    //         ...acc,
    //         [env]: {
    //           content: record.details[key][env]?.content || "",
    //           start: record.details[key][env]?.start || "",
    //           end: record.details[key][env]?.end || "",
    //         },
    //       }),
    //       {}
    //     ),
    //   })
    // );
    const detailsData = (
      Object.keys(record.details) as (keyof IEnvDetails)[]
    ).map((key) => ({
      key,
      name: record.details[key].name,
      ...environments.reduce(
        (acc, env) => ({
          ...acc,
          [env]: record.details[key][env] || "", // Directly use the string value
        }),
        {}
      ),
    }));

    return (
      <Table
        columns={columns}
        dataSource={detailsData}
        pagination={false}
        showHeader={false}
      />
    );
  };

  const handleIndividualFilterChange = (
    filterValue: string,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedFilters((prev) => [...prev, filterValue]);
    } else {
      setSelectedFilters((prev) =>
        prev.filter((value) => value !== filterValue)
      );
    }
  };

  const customExpandIcon = <T,>(props: CustomExpandIconProps<T>) => {
    if (props.expanded) {
      return <DownOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    } else {
      return <RightOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    }
  };

  // Dynamic columns generator
  const generateDynamicColumns = (columns2: any): TableColumnsType<any> => {
    let environments = ["uat", "staging", "production"];
    if (columns2.length > 0) {
      const dynamicColumnsNames = columns2.map(
        (column: any) => column.dataIndex
      );
      environments = [...environments, ...dynamicColumnsNames];
    }

    return environments.map((env) => ({
      title: env.charAt(0).toUpperCase() + env.slice(1),
      dataIndex: env,
      key: env,
      align: "center",
      width: 150,
      filters: sandBoxFilters,
      onFilter: (value, record) => {
        const envData = record[env];

        if (!envData) {
          return false; // or true if you want to include null environments in the filter
        }

        return envData.status === value;
      },
      sorter: (a, b) =>
        getTheTimeInterval(a.env?.start as string) -
        getTheTimeInterval(b.env?.start as string),

      render: (_: any, record: any) => {
        const envData = record[env];

        // Check if the envData is null or undefined
        if (!envData) {
          return (
            <div style={{ width: 150, minHeight: "50px" }}>
              {/* Render an empty box */}
            </div>
          );
        }

        // Render the usual content when envData is not null
        return (
          <Flex
            justify="center"
            align="center"
            className={`c-p-1 ${getColorByTime(
              envData.start,
              envData.end,
              envData.status
            )}`}
            style={{ width: 150, minHeight: "50px" }}
          >
            {envData.status === EnvStatusTypes.ACTIVE ||
            envData.status === EnvStatusTypes.FAILURE
              ? envData.version
              : `${EnvStatusTypes.LOADING} ... `}
          </Flex>
        );
      },
    }));
  };

  const filterDropdown = (
    <div style={{ padding: 8 }}>
      <div style={{ marginBottom: 8 }}>
        <Checkbox checked={checked} onChange={handleMasterCheckboxChange}>
          Select All
        </Checkbox>
      </div>
      {filterData.map((filter) => (
        <div key={filter.value} style={{ marginBottom: 8 }}>
          <Checkbox
            checked={selectedFilters.includes(filter.value)}
            onChange={(e) =>
              handleIndividualFilterChange(filter.value, e.target.checked)
            }
          >
            {filter.text}
          </Checkbox>
        </div>
      ))}
      <div style={{ marginTop: 8 }}>
        <Button
          type="primary"
          onClick={() => {
            // Close the filter dropdown manually (optional)
            // You can implement logic to close the dropdown here if needed
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  const columns: TableColumnsType<IntireObject> = [
    {
      title: (
        <Flex justify="space-between">
          Application name
          {/* <Flex gap={10}>
            <Flex>
              <Checkbox
                onChange={handleMasterCheckboxChange}
                checked={checked}
              />
              
            </Flex>
            <Flex vertical>
              <Tooltip title="Sort by the most active">
                <CaretUpOutlined
                  onClick={() => {
                    handleSortChange("desc");
                    setSortOrder("desc");
                  }}
                  style={{
                    fontSize: 12,
                    color: sortOrder === "desc" ? "#006bd8" : "#BFBFBF",
                  }}
                />
              </Tooltip>
              <Tooltip title="Sort by the less active">
                <CaretDownOutlined
                  onClick={() => {
                    handleSortChange("asc");
                    setSortOrder("asc");
                  }}
                  style={{
                    fontSize: 12,
                    color: sortOrder === "asc" ? "#006bd8" : "#BFBFBF",
                  }}
                />
              </Tooltip>
            </Flex> 
          </Flex> */}
        </Flex>
      ),
      dataIndex: "name",
      key: "name",
      width: "auto",
      sorter: (a, b) => a.activity - b.activity,
      // filterDropdown: filterDropdown,
      // filteredValue: selectedFilters,
      // onFilter: (value, lr) => selectedFilters.includes(lr.name),
      filterMode: "tree",
      filters: filterData,
      filterSearch: true,
      onFilter: (value, record) => record.name === value,
      render: (_, record) => (
        <Flex>
          <span className="c-font-color-primary c-font-weight-2 c-font-size-2">
            {record.name}
          </span>
        </Flex>
      ),
    },
    {
      title: "SandBox",
      dataIndex: "sandBox",
      key: "sandBox",
      align: "center",
      width: 150,
      // filterDropdown: filterDropdown2,
      // filteredValue: selectedFilterSandBox,
      // onFilter: (value, lr) =>
      //   selectedFilterSandBox.includes(lr.sandBox?.status as string),
      filters: sandBoxFilters,
      onFilter: (value, record) => record.sandBox?.status === value,
      sorter: (a, b) =>
        getTheTimeInterval(a.sandBox?.start as string) -
        getTheTimeInterval(b.sandBox?.start as string),
      render: (_, record) => {
        const environment = record.sandBox;
        if (!environment) {
          return (
            <div style={{ width: 150, minHeight: "50px" }}>
              {/* Render an empty box */}
            </div>
          );
        }
        return (
          <Flex
            justify="center"
            align="center"
            className={`c-p-1 ${getColorByTime(
              environment.start,
              environment.end,
              environment.status
            )}`}
            style={{ width: 150, minHeight: "50px" }}
          >
            {environment.status === EnvStatusTypes.ACTIVE ||
            environment.status === EnvStatusTypes.FAILURE
              ? environment.version
              : `${EnvStatusTypes.LOADING} ...`}
          </Flex>
        );
      },
    },
    {
      title: "QA",
      dataIndex: "qa",
      key: "qa",
      align: "center",
      width: 150,
      // filterDropdown: filterDropdown3,
      // filteredValue: selectedFilterQA,
      // onFilter: (value, lr) =>
      //   selectedFilterQA.includes(lr.qa?.status as string),
      filters: sandBoxFilters,
      onFilter: (value, record) => record.qa?.status === value,
      sorter: (a, b) =>
        getTheTimeInterval(a.qa?.start as string) -
        getTheTimeInterval(b.qa?.start as string),
      render: (_, record) => {
        const environment = record.qa;
        if (!environment) {
          return (
            <div style={{ width: 150, minHeight: "50px" }}>
              {/* Render an empty box */}
            </div>
          );
        }
        return (
          <Flex
            justify="center"
            align="center"
            className={`c-p-1 ${getColorByTime(
              environment.start,
              environment.end,
              environment.status
            )}`}
            style={{ width: 150, minHeight: "50px" }}
          >
            {environment.status === EnvStatusTypes.ACTIVE ||
            environment.status === EnvStatusTypes.FAILURE
              ? environment.version
              : `${EnvStatusTypes.LOADING} ...`}
          </Flex>
        );
      },
    },
    ...generateDynamicColumns(dynamicColumns),
  ];

  return (
    <>
      {/* <Button type="primary" onClick={addColumn} style={{ marginBottom: 16 }}>
        1
      </Button>
      <Button type="primary" onClick={addColumn2} style={{ marginBottom: 16 }}>
        2
      </Button> */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellPaddingInline: 1,
              cellPaddingBlock: 1,
            },
          },
        }}
      >
        <Table
          // style={{ width: "auto" }}
          className="c-w-100 custom-table c-bg-white"
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
            expandIcon: customExpandIcon,
          }}
          scroll={{ y: 450 }}
          dataSource={tableData}
          rowKey={(record) => record.id}
          footer={() => (
            <Flex className="c-p-y-3 c-p-x-1 c-bg-white">
              <Flex className="c-w-25" align="center">
                Legend
              </Flex>
              <Flex justify="space-evenly" gap={20} className="c-w-75">
                <Flex align="center" gap={10}>
                  <div
                    className="c-bg-legend-success"
                    style={{ width: 70, height: 30 }}
                  ></div>
                  <span>1h</span>
                </Flex>
                <Flex align="center" gap={10}>
                  <div
                    className="c-bg-legend-good"
                    style={{ width: 70, height: 30 }}
                  ></div>
                  <span>1h - 5h</span>
                </Flex>
                <Flex align="center" gap={10}>
                  <div
                    className="c-bg-legend-satisfactory"
                    style={{ width: 70, height: 30 }}
                  ></div>
                  <span>5h - 12h</span>
                </Flex>
                <Flex align="center" gap={10}>
                  <div
                    className="c-bg-legend-passable"
                    style={{ width: 70, height: 30 }}
                  ></div>
                  <span>12 - 24h</span>
                </Flex>
                <Flex align="center" gap={10}>
                  <div
                    className="c-bg-legend-error"
                    style={{ width: 70, height: 30 }}
                  ></div>
                  <span>Failure</span>
                </Flex>
              </Flex>
            </Flex>
          )}
        />
      </ConfigProvider>
    </>
  );
};
