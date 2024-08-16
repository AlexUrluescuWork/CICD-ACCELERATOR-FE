import React, { useState } from "react";
import { Button, Checkbox, Flex, Input, Modal, Select } from "antd";
import minusIcon from "../../../public/icons/minus.svg";
import Image from "next/image";

interface IModal {
  isModalOpen: boolean;
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  projects: IProject[];
}

interface IProject {
  label: string;
  value: string;
}

export const CustomModal: React.FC<IModal> = ({
  isModalOpen,
  showModal,
  handleOk,
  handleCancel,
  projects,
}) => {
  const [selValues, setSelValues] = useState<IProject[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleCheckboxChange = (checked: boolean, option: IProject) => {
    const newValue = checked
      ? [...selValues, { label: option.label, value: option.value }]
      : selValues.filter((project) => project.value !== option.value);

    setSelValues(newValue); // Update the state with the new value
  };

  const handleRemoveProject = (value: string) => {
    const projectListUpdated = selValues.filter(
      (project) => project.value !== value
    );

    setSelValues([...projectListUpdated]);
  };

  // Filter options based on search input
  const filteredOptions = projects.filter((option) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <Modal
        title={
          <Flex
            align="center"
            justify="space-between"
            className="c-w-100 c-border-botton-gray c-p-1"
          >
            Create new environment
            <Button
              onClick={() => {
                setSelValues([]);
                handleCancel();
              }}
            >
              Cancel
            </Button>
          </Flex>
        }
        width={650}
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
      >
        <Flex vertical gap={40}>
          <Flex justify="space-between">
            <Flex vertical gap={10}>
              <span>Applications</span>
              <Select
                size="middle"
                placeholder="Please select"
                style={{ width: "100%" }}
                showSearch
                filterOption={false} // Disable default filtering
                onSearch={(value) => setSearchInput(value)} // Update search input state
                popupMatchSelectWidth={false}
                dropdownRender={(menu) => (
                  <Flex vertical>
                    {filteredOptions.map((option) => (
                      <Flex
                        key={option.value}
                        justify="space-between"
                        className="c-p-1"
                        gap={10}
                      >
                        {option.label}
                        <Checkbox
                          checked={selValues.some(
                            (project) => project.value === option.value
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked, option)
                          }
                        />
                      </Flex>
                    ))}
                  </Flex>
                )}
              >
                {filteredOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              <Flex vertical gap={10}>
                {selValues.map((project) => (
                  <Flex
                    key={project.value}
                    align="center"
                    justify="space-between"
                    gap={10}
                  >
                    <span>{project.label}</span>
                    <Flex
                      className="c-cursor-pointer"
                      onClick={() => handleRemoveProject(project.value)}
                    >
                      <Image priority src={minusIcon} alt="Remove" />
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Flex vertical gap={10}>
              <span>Environment name</span>
              <Input placeholder="Preprod"></Input>
            </Flex>
            <Flex vertical gap={10}>
              <span>Git branch</span>
              <Input placeholder="Branch"></Input>
            </Flex>
          </Flex>
          <Flex className="c-w-100" justify="center">
            <Button type="primary">Create new environment</Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
