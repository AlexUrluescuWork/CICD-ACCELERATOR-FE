"use client";
import {
  Button,
  ConfigProvider,
  Flex,
  Input,
  RadioChangeEvent,
  Select,
  SelectProps,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import appLogo from "../../public/icons/app-logo.svg";
import settingsIcon from "../../public/icons/settings.svg";
import notificationsIcon from "../../public/icons/notifications.svg";
import addIcon from "../../public/icons/add.svg";
import filterIcon from "../../public/icons/filter_list.svg";
import { CustomTable, IntireObject } from "@/components/table";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
import { CustomModal } from "@/components/modal";
import dummy from "../../testing/dummy.json";

export default function Home() {
  const [size, setSize] = useState<SizeType>("middle");
  const [tableData, setTableData] = useState<IntireObject[]>(dummy);
  const options: SelectProps["options"] = [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const projects = tableData.map((project) => {
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
        <CustomTable />
      </Flex>
      <CustomModal
        isModalOpen={isModalOpen}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        projects={projects}
      />
    </Flex>
  );
}
