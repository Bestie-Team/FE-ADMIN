"use client";

import { ConfigProvider } from "antd";
import type React from "react";

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "GowunBatang-Regular",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
