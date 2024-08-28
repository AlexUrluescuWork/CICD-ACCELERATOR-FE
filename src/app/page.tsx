"use client";
import { ConfigProvider, Flex, Input, SelectProps, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import appLogo from "../../public/icons/app-logo.svg";
import settingsIcon from "../../public/icons/settings.svg";
import notificationsIcon from "../../public/icons/notifications.svg";
import addIcon from "../../public/icons/add.svg";
import filterIcon from "../../public/icons/filter_list.svg";
import { CustomTable } from "@/components/table";
import { useMemo, useState } from "react";
import { CustomModal } from "@/components/modal";
import dummy from "../../testing/dummy.json";
import { IntireObject } from "@/types";

interface ICreateEnv {
  applications: {
    label: string;
    value: string;
  };
  environment: string;
  gitBranch: string;
}

export default function Home() {
  const [tableData, setTableData] = useState<IntireObject[]>(dummy);
  const options: SelectProps["options"] = [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dynamicColumns, setDynamicColumns] = useState<any>([]);

  const loadingEnvironments = useMemo(() => {
    let loadingEnvironmentsSet = new Set<string>();

    tableData.forEach((app) => {
      for (let env in app) {
        const envData = app[env];

        if (
          typeof envData === "object" &&
          envData !== null &&
          "status" in envData &&
          envData.status === "loading"
        ) {
          loadingEnvironmentsSet.add(env);
        }
      }
    });

    return Array.from(loadingEnvironmentsSet);
  }, [tableData]);

  const applications = tableData.map((project) => {
    return {
      label: project.name,
      value: project.id,
    };
  });

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addColumn = (environment: string, applications: any) => {
    const dynamicKey = environment;
    const newColumn = {
      title: `New Column ${dynamicColumns.length + 1}`,
      dataIndex: dynamicKey,
      key: dynamicKey,
      render: (_: any, record: any) => {
        return <span>{record.name}</span>;
      },
    };

    const newValue = {
      version: "version",
      start: "2024-08-13T10:00:00",
      end: "2024-08-13T18:30:00",
      status: "loading",
    };

    const appNames = applications.map((app: any) => app.label);

    // Update the state to include the new dynamic key in each object
    setTableData((prevData) =>
      prevData.map((item) => ({
        ...item, // Spread existing properties
        status: "active",
        details: {
          ...item.details, // Spread existing details
          changeLog: {
            ...item.details.changeLog, // Spread existing changelog
            [dynamicKey]: appNames.includes(item.name) ? "-" : " ", // Add new key to changelog
          },
          deploymentDateTime: {
            ...item.details.deploymentDateTime, // Spread existing uat
            [dynamicKey]: appNames.includes(item.name) ? "-" : " ", // Add new key to uat
          },
          deploymentHistory: {
            ...item.details.deploymentHistory, // Spread existing uat
            [dynamicKey]: appNames.includes(item.name) ? "-" : " ", // Add new key to uat
          },
          pipelineRun: {
            ...item.details.pipelineRun, // Spread existing uat
            [dynamicKey]: appNames.includes(item.name) ? "-" : " ", // Add new key to uat
          },
          rollback: {
            ...item.details.rollback, // Spread existing uat
            [dynamicKey]: appNames.includes(item.name) ? "-" : " ", // Add new key to uat
          },
        },
        [dynamicKey]: appNames.includes(item.name) ? newValue : null,
      }))
    );

    setDynamicColumns([...dynamicColumns, newColumn]);
  };

  const handleSubmit = (values: ICreateEnv) => {
    const { environment, applications, gitBranch } = values;

    addColumn(environment, applications);

    setIsModalOpen(false);
  };
  return (
    <Flex vertical className="c-bg-gray-light">
      <Flex
        justify="space-between"
        align="center"
        className="c-bg-primary c-w-100 c-p-y-1 c-p-x-2"
      >
        <Flex align="center" gap={20}>
          <Image priority src={appLogo} alt="Follow us on Twitter" />
          <span className="c-font-color-white">SDLC Dashboard</span>
        </Flex>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 20,
              colorBgContainer: "#80bdff",
              colorTextPlaceholder: "white",
              colorBorder: "#80bdff",
              colorText: "white",
            },
          }}
        >
          <Input
            className="c-w-25 c-bg-primary-light c-border-color-transparent c-fixed-b-radius-20"
            addonBefore={<SearchOutlined />}
            placeholder="Search ..."
          />
        </ConfigProvider>
        <Flex align="center" gap={20}>
          <Image priority src={notificationsIcon} alt="Follow us on Twitter" />
          <Image priority src={settingsIcon} alt="Follow us on Twitter" />
        </Flex>
      </Flex>
      <Flex vertical align="center" gap={8}>
        <Flex vertical className="c-w-100 c-bg-white">
          <Flex className="c-w-100 c-bg-white c-p-2" justify="space-between">
            <Flex align="center" gap={10}>
              <Image priority src={filterIcon} alt="Follow us on Twitter" />
              <span className="c-font-color-gray">Projects</span>
            </Flex>
            <Flex align="center" gap={10}>
              <span className="c-font-color-gray" style={{ fontSize: 15 }}>
                Create new environment
              </span>
              <Flex
                onClick={showModal}
                className="c-border-circle c-bg-primary c-cursor-pointer"
              >
                <Image priority src={addIcon} alt="Follow us on Twitter" />
              </Flex>
            </Flex>
          </Flex>
          {loadingEnvironments.length > 0 ? (
            <Flex className="c-w-100 c-bg-white c-p-2" vertical gap={10}>
              {loadingEnvironments.map((env) => (
                <span style={{ fontSize: 13 }} key={env}>
                  <Tag color="blue"> {env}</Tag> environment is loading ...
                </span>
              ))}
            </Flex>
          ) : null}
        </Flex>
        <CustomTable
          tableData={tableData}
          setTableData={setTableData}
          dynamicColumns={dynamicColumns}
          setDynamicColumns={setDynamicColumns}
        />
      </Flex>
      <CustomModal
        isModalOpen={isModalOpen}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        applications={applications}
        handleSubmit={handleSubmit}
        setTableData={setTableData}
      />
    </Flex>
  );
}
