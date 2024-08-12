"use client";
import { Flex, Table, TableColumnsType } from "antd";
import Image from "next/image";
import trash from "../../../public/icons/trash.svg";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import dummy from "../../../testing/dummy.json";
import { log } from "console";

interface DataType {
  key: React.Key;
  name: string;
  sandBox: string;
  qa: string;
  uat: string;
  staging: string;
  production: string;
}

export const CustomTable = () => {
  const expandedRowRender = (record: any) => {
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
        render: (text: string) => (
          <Flex
            justify="center"
            className="c-p-1 c-font-color-white"
            style={{ backgroundColor: "red", minWidth: "100px" }}
          >
            {text}
          </Flex>
        ),
      },
      {
        title: "QA",
        dataIndex: "qa",
        key: "qa",
        render: (text: string) => (
          <Flex
            justify="center"
            className="c-p-1 c-font-color-white"
            style={{ backgroundColor: "red", minWidth: "100px" }}
          >
            {text}
          </Flex>
        ),
      },
      {
        title: "UAT",
        dataIndex: "uat",
        key: "uat",
        render: (text: string) => (
          <Flex
            justify="center"
            className="c-p-1 c-font-color-white"
            style={{ backgroundColor: "red", minWidth: "100px" }}
          >
            {text}
          </Flex>
        ),
      },
      {
        title: "Staging",
        dataIndex: "staging",
        key: "staging",
        render: (text: string) => (
          <Flex
            justify="center"
            className="c-p-1 c-font-color-white"
            style={{ backgroundColor: "red", minWidth: "100px" }}
          >
            {text}
          </Flex>
        ),
      },
      {
        title: "Production",
        dataIndex: "production",
        key: "production",
        render: (text: string) => (
          <Flex
            justify="center"
            className="c-p-1 c-font-color-white"
            style={{ backgroundColor: "red", minWidth: "100px" }}
          >
            {text}
          </Flex>
        ),
      },
    ];

    const detailsData = Object.keys(record.details).map((key) => ({
      key,
      name: key,
      sandBox: record.details[key].sandBox,
      qa: record.details[key].qa,
      uat: record.details[key].uat,
      staging: record.details[key].staging,
      production: record.details[key].production,
    }));

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

  const customExpandIcon = (props: any) => {
    if (props.expanded) {
      return <DownOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    } else {
      return <RightOutlined onClick={(e) => props.onExpand(props.record, e)} />;
    }
  };

  const columns: TableColumnsType<DataType> = [
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
          className="c-p-1 c-font-color-white"
          style={{ backgroundColor: "pink", minWidth: "100px" }}
        >
          {record.sandBox}
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
          className="c-p-1 c-font-color-white"
          style={{ backgroundColor: "pink", minWidth: "100px" }}
        >
          {record.qa}
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
          className="c-p-1 c-font-color-white"
          style={{ backgroundColor: "pink", minWidth: "100px" }}
        >
          {record.uat}
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
          className="c-p-1 c-font-color-white"
          style={{ backgroundColor: "pink", minWidth: "100px" }}
        >
          {record.staging}
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
          className="c-p-1 c-font-color-white"
          style={{ backgroundColor: "pink", minWidth: "100px" }}
        >
          {record.production}
        </Flex>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screen",
      sandBox: "v12.1.3-1",
      qa: "v13.1.3-1",
      uat: "v14.1.3-1",
      staging: "v15.1.3-1",
      production: "v16.1.3-1",
    });
  }

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
    />
  );
};
