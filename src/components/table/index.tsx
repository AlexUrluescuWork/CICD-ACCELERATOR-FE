"use client";
import { Flex, Table, TableColumnsType } from "antd";
import Image from "next/image";
import trash from "../../../public/icons/trash.svg";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import dummy from "../../../testing/dummy.json";

type CustomExpandIconProps<T> = {
  expanded: boolean;
  onExpand: (
    record: T,
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  record: T;
};

interface objectType {
  content: string;
  start: string;
  end: string;
}

interface objectType2 {
  version: string;
  start: string;
  end: string;
}

interface ITypes {
  name: string;
  sandBox: objectType;
  qa: objectType;
  uat: objectType;
  staging: objectType;
  production: objectType;
}

interface IDetails {
  rollback: ITypes;
  deploymentDateTime: ITypes;
  pipelineRun: ITypes;
  changeLog: ITypes;
  deploymentHistory: ITypes;
}

interface IntireObject {
  id: string;
  name: string;
  sandBox: objectType2;
  qa: objectType2;
  uat: objectType2;
  staging: objectType2;
  production: objectType2;
  details: IDetails;
}

export const CustomTable = () => {
  const getColorByTime = (start: string, end: string) => {
    console.log("start", start);
    console.log("end", end);

    const date1: Date = new Date(start); // August 10, 2024 12:00 PM
    const date2: Date = new Date(end); // August 12, 2024 6:30 PM

    // Get the difference in milliseconds
    const diffInMs: number = date2.getTime() - date1.getTime();

    // Convert milliseconds to hours
    const hoursDiff: number = diffInMs / (1000 * 60 * 60);

    console.log(hoursDiff);

    if (hoursDiff > 24) {
      return "c-bg-legend-passable";
    } else if (hoursDiff > 5 && hoursDiff < 12) {
      return "c-bg-legend-satisfactory";
    } else if (hoursDiff > 1 && hoursDiff < 5) {
      return "c-bg-legend-good";
    } else if (hoursDiff < 1) {
      return "c-bg-legend-success";
    }
  };

  const expandedRowRender = (record: IntireObject) => {
    console.log("record", record);

    const columns = [
      {
        title: "Application name",
        dataIndex: "name",
        key: "name",
        width: "43.8%",
        render: (text: string) => (
          <Flex>
            <span className="c-font-capitalize c-font-color-gray">{text}</span>
          </Flex>
        ),
      },
      {
        title: (
          <Flex>
            <span>Sandbox</span>{" "}
            <Image priority src={trash} alt="Follow us on Twitter" />{" "}
          </Flex>
        ),
        dataIndex: "sandBox",
        key: "sandBox",
        width: "auto",
        render: (text: objectType, row: { name: string }) => (
          <Flex
            justify="center"
            className={`c-p-1 c-font-color-gray`}
            style={{ minWidth: "100px" }}
          >
            {row.name === "Rollback" || row.name === "Deployment Date Time" ? (
              text.content
            ) : (
              <a>{text.content}</a>
            )}
          </Flex>
        ),
      },
      {
        title: "QA",
        dataIndex: "qa",
        key: "qa",
        render: (text: objectType, row: { name: string }) => (
          <Flex
            justify="center"
            className={`c-p-1 c-font-color-gray`}
            style={{ minWidth: "100px" }}
          >
            {row.name === "Rollback" || row.name === "Deployment Date Time" ? (
              text.content
            ) : (
              <a>{text.content}</a>
            )}
          </Flex>
        ),
      },
      {
        title: "UAT",
        dataIndex: "uat",
        key: "uat",
        render: (text: objectType, row: { name: string }) => (
          <Flex
            justify="center"
            className={`c-p-1 c-font-color-gray`}
            style={{ minWidth: "100px" }}
          >
            {row.name === "Rollback" || row.name === "Deployment Date Time" ? (
              text.content
            ) : (
              <a>{text.content}</a>
            )}
          </Flex>
        ),
      },
      {
        title: "Staging",
        dataIndex: "staging",
        key: "staging",
        render: (text: objectType, row: { name: string }) => (
          <Flex
            justify="center"
            className={`c-p-1 c-font-color-gray`}
            style={{ minWidth: "100px" }}
          >
            {row.name === "Rollback" || row.name === "Deployment Date Time" ? (
              text.content
            ) : (
              <a>{text.content}</a>
            )}
          </Flex>
        ),
      },
      {
        title: "Production",
        dataIndex: "production",
        key: "production",
        render: (text: objectType, row: { name: string }) => (
          <Flex
            justify="center"
            className={`c-p-1 c-font-color-gray`}
            style={{ minWidth: "100px" }}
          >
            {row.name === "Rollback" || row.name === "Deployment Date Time" ? (
              text.content
            ) : (
              <a>{text.content}</a>
            )}
          </Flex>
        ),
      },
    ];

    console.log("record.details", record.details);

    const detailsData = (Object.keys(record.details) as (keyof IDetails)[]).map(
      (key) => ({
        key,
        name: record.details[key].name,
        sandBox: {
          content: record.details[key].sandBox.content,
          start: record.details[key].sandBox.start,
          end: record.details[key].sandBox.end,
        },
        qa: {
          content: record.details[key].qa.content,
          start: record.details[key].qa.start,
          end: record.details[key].qa.end,
        },
        uat: {
          content: record.details[key].uat.content,
          start: record.details[key].uat.start,
          end: record.details[key].uat.end,
        },
        staging: {
          content: record.details[key].staging.content,
          start: record.details[key].staging.start,
          end: record.details[key].staging.end,
        },
        production: {
          content: record.details[key].production.content,
          start: record.details[key].production.start,
          end: record.details[key].production.end,
        },
      })
    );

    console.log("detailsData", detailsData);

    return (
      <Table
        columns={columns}
        dataSource={detailsData}
        pagination={false}
        showHeader={false}
      />
    );
  };

  const customExpandIcon = <T,>(props: CustomExpandIconProps<T>) => {
    if (props.expanded) {
      return <DownOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    } else {
      return <RightOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    }
  };

  const columns: TableColumnsType<IntireObject> = [
    {
      title: "Application name",
      dataIndex: "name",
      key: "name",
      width: "42%",
      render: (_, record) => (
        <Flex>
          <span className="c-font-color-primary c-font-weight-2 c-font-size-2">
            {record.name}
          </span>
        </Flex>
      ),
    },
    {
      title: (
        <Flex align="center" justify="space-evenly">
          <span>Sandbox</span>{" "}
          <Image
            className="c-cursor-pointer"
            priority
            src={trash}
            alt="Follow us on Twitter"
          />{" "}
        </Flex>
      ),
      dataIndex: "sandBox",
      key: "sandBox",
      align: "center",
      render: (_, record) => (
        <Flex
          justify="center"
          className={`c-p-1 c-font-color-white ${getColorByTime(
            record.sandBox.start,
            record.sandBox.end
          )}`}
          style={{ minWidth: "100px" }}
        >
          {record.sandBox.version}
        </Flex>
      ),
    },
    {
      title: (
        <Flex align="center" justify="space-evenly">
          <span>QA</span>{" "}
          <Image
            className="c-cursor-pointer"
            priority
            src={trash}
            alt="Follow us on Twitter"
          />{" "}
        </Flex>
      ),
      dataIndex: "qa",
      key: "qa",
      align: "center",
      render: (_, record) => (
        <Flex
          justify="center"
          className={`c-p-1 c-font-color-white ${getColorByTime(
            record.qa.start,
            record.qa.end
          )}`}
          style={{ minWidth: "100px" }}
        >
          {record.qa.version}
        </Flex>
      ),
    },
    {
      title: "UAT",
      dataIndex: "uat",
      key: "uat",
      align: "center",
      render: (_, record) => (
        <Flex
          justify="center"
          className={`c-p-1 c-font-color-white ${getColorByTime(
            record.uat.start,
            record.uat.end
          )}`}
          style={{ minWidth: "100px" }}
        >
          {record.uat.version}
        </Flex>
      ),
    },
    {
      title: (
        <Flex align="center" justify="space-evenly">
          <span>Staging</span>{" "}
          <Image
            className="c-cursor-pointer"
            priority
            src={trash}
            alt="Follow us on Twitter"
          />{" "}
        </Flex>
      ),
      dataIndex: "staging",
      key: "staging",
      align: "center",
      render: (_, record) => (
        <Flex
          justify="center"
          className={`c-p-1 c-font-color-white ${getColorByTime(
            record.staging.start,
            record.staging.end
          )}`}
          style={{ minWidth: "100px" }}
        >
          {record.staging.version}
        </Flex>
      ),
    },
    {
      title: "Production",
      dataIndex: "production",
      key: "production",
      align: "center",
      width: "auto",
      render: (_, record) => (
        <Flex
          justify="center"
          className={`c-p-1 c-font-color-white ${getColorByTime(
            record.production.start,
            record.production.end
          )}`}
          style={{ minWidth: "100px" }}
        >
          {record.production.version}
        </Flex>
      ),
    },
  ];

  return (
    <Table
      className="c-w-75"
      columns={columns}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ["0"],
        expandIcon: customExpandIcon,
      }}
      dataSource={dummy}
      rowKey={(record) => record.id}
      footer={() => (
        <Flex className="c-p-y-3 c-p-x-1">
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
              <span>24h</span>
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
  );
};
