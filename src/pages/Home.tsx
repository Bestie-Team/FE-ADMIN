import { useState } from "react";
import { Layout, Menu, Avatar, Button, Dropdown } from "antd";
import {
  UserOutlined,
  PictureOutlined,
  BarChartOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import Panes from "../components/Panes";

const { Header, Sider, Content } = Layout;

export default function LightyAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <div className="p-4 flex items-center justify-center">
          {!collapsed && (
            <div className="text-xl font-semibold tracking-[-0.3px]">
              라이티 어드민
            </div>
          )}
          {collapsed && <div className="text-xl font-semibold">IG</div>}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarChartOutlined />,
              label: "대시보드",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "유저",
            },
            {
              key: "3",
              icon: <PictureOutlined />,
              label: "포스트",
            },
            {
              key: "4",
              icon: <BellOutlined />,
              label: "알림",
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: "설정",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              {/* <Input
                prefix={<SearchOutlined />}
                placeholder="Search..."
                style={{ width: 250 }}
              /> */}
            </div>
            <div className="flex items-center gap-4">
              <Button type="text" icon={<BellOutlined />} />
              <Button type="text" icon={<SettingOutlined />} />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "1",
                      label: "프로필",
                      icon: <UserOutlined />,
                    },
                    {
                      key: "2",
                      label: "설정",
                      icon: <SettingOutlined />,
                    },
                    {
                      key: "3",
                      label: "로그아웃",
                      icon: <LogoutOutlined />,
                      danger: true,
                    },
                  ],
                }}
              >
                <div className="flex items-center cursor-pointer">
                  <Avatar icon={<UserOutlined />} />
                  <span className="ml-2">관리자</span>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: 4,
          }}
        >
          <Panes />
        </Content>
      </Layout>
    </Layout>
  );
}
