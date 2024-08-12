"use client";
import { ConfigProvider, Flex, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import appLogo from "../../public/icons/app-logo.svg";
import settingsIcon from "../../public/icons/settings.svg";
import notificationsIcon from "../../public/icons/notifications.svg";
import { CustomTable } from "@/components/table";

export default function Home() {
  return (
    <Flex vertical gap={20}>
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
      <Flex justify="center">
        <CustomTable />
      </Flex>
    </Flex>
  );
}
