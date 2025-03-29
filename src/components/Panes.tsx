/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  Input,
  Table,
  Tag,
  Tabs,
  Statistic,
  Col,
  Card,
  Row,
} from "antd";
import {
  MoreOutlined,
  SearchOutlined,
  HeartOutlined,
  MessageOutlined,
  EyeOutlined,
  UserOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { posts } from "../constants/mock";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import useUsers from "../hooks/users/useUsers";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

export default function Panes() {
  const navigate = useNavigate();
  const [pageParams, setPageParams] = useState<{
    page: number;
    limit: number;
    sortBy: "name" | "createdAt" | "accountId";
    sortOrder: "asc" | "desc";
  }>({
    page: 1,
    limit: 15,
    sortBy: "createdAt" as const,
    sortOrder: "desc" as const,
  });

  const [activeTab, setActiveTab] = useState("1");
  const { data: users, isError } = useUsers(pageParams);

  if (isError) {
    navigate("/");
  }

  const userColumns = [
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (name: any) => (
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium">{name}</div>
          </div>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "accountId",
      key: "accountId",
      sorter: true,
      render: (accountId: any) => (
        <div className="flex items-center">
          <div className="ml-2">
            <div className="text-md text-gray-500">@{accountId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      render: (provider: any) => (
        <Tag
          color={
            provider === "KAKAO"
              ? "yellow"
              : provider === "GOOGLE"
              ? "cyan"
              : "magenta"
          }
        >
          {provider}
        </Tag>
      ),
    },

    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt: any) => (
        <span>
          {new Date(createdAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "탈퇴",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt: any) => (
        <span>
          {deletedAt !== null
            ? new Date(deletedAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "-"}
        </span>
      ),
    },
    {
      title: "프로필 이미지",
      dataIndex: "profileImageUrl",
      key: "profileImageUrl",
      render: (profileImageUrl: any) => (
        <img
          src={profileImageUrl}
          alt="profile"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover cursor-pointer mx-auto"
          onClick={() => window.open(profileImageUrl, "_blank")}
        />
      ),
    },
    {
      title: "설정",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "View Profile",
              },
              {
                key: "2",
                label: "Edit User",
              },
              {
                key: "3",
                label: "Disable Account",
                danger: true,
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const postColumns = [
    {
      title: "Post",
      dataIndex: "id",
      key: "id",
      render: (_: any, record: any) => (
        <div className="flex items-center">
          <img
            src={record.image || "/placeholder.svg"}
            alt="Post thumbnail"
            className="rounded"
          />
          <div className="ml-2">
            <div className="font-medium">@{record.user}</div>
            <div className="text-xs text-gray-500 max-w-xs truncate">
              {record.caption}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Engagement",
      key: "engagement",
      render: (_: any, record: any) => (
        <div>
          <div>
            <HeartOutlined /> {record.likes.toLocaleString()}
          </div>
          <div>
            <MessageOutlined /> {record.comments}
          </div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <Tag color={status === "published" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "View Post",
              },
              {
                key: "2",
                label: "Edit Post",
              },
              {
                key: "3",
                label: "Remove Post",
                danger: true,
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleTableChange = (pagination: any, _: any, sorter: any) => {
    console.log(sorter.field);
    setPageParams((prev) => ({
      ...prev,
      page: pagination.current || prev.page,
      sortBy: sorter.field || prev.sortBy,
      sortOrder: sorter.order === "ascend" ? "asc" : "desc",
    }));
  };

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <TabPane tab="Users" key="1">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-2xl font-semibold">유저 관리</span>
          <div className="flex gap-2">
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Button type="primary">Add User</Button>
          </div>
        </div>
        <Table
          dataSource={users}
          columns={userColumns}
          onChange={handleTableChange}
          pagination={{
            pageSize: pageParams.limit,
            current: pageParams.page,
            total: 50,
            onChange: (page) => {
              setPageParams((prev) => ({
                ...prev,
                page,
                limit: 15,
              }));
            },
          }}
        />
      </TabPane>
      <TabPane tab="Dashboard" key="2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={124350}
                  prefix={<UserOutlined />}
                  suffix={
                    <div className="text-green-500 text-xs flex items-center">
                      <ArrowUp className="h-3 w-3" />
                      <span>12%</span>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Posts"
                  value={1458720}
                  prefix={<PictureOutlined />}
                  suffix={
                    <div className="text-green-500 text-xs flex items-center">
                      <ArrowUp className="h-3 w-3" />
                      <span>8%</span>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Daily Active Users"
                  value={45280}
                  prefix={<UserOutlined />}
                  suffix={
                    <div className="text-red-500 text-xs flex items-center">
                      <ArrowDown className="h-3 w-3" />
                      <span>3%</span>
                    </div>
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Content Views"
                  value={8452000}
                  prefix={<EyeOutlined />}
                  suffix={
                    <div className="text-green-500 text-xs flex items-center">
                      <ArrowUp className="h-3 w-3" />
                      <span>15%</span>
                    </div>
                  }
                />
              </Card>
            </Col>
          </Row>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <Table
            dataSource={users}
            columns={userColumns}
            pagination={false}
            size="small"
          />
          <div className="mt-4 flex justify-end">
            <Button type="primary">View All Users</Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
          <Table
            dataSource={posts}
            columns={postColumns}
            pagination={false}
            size="small"
          />
          <div className="mt-4 flex justify-end">
            <Button type="primary">View All Posts</Button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Posts" key="3">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">포스트 관리</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Search posts..."
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
            />
            <Button type="primary">Add Post</Button>
          </div>
        </div>
        <Table
          dataSource={posts}
          columns={postColumns}
          pagination={{ pageSize: 10 }}
        />
      </TabPane>
    </Tabs>
  );
}
