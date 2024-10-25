import styled from "styled-components";
import { Button, ConfigProvider } from "antd";
import React from "react";

export const PREFIX_CLS = "kvant";
export const BASE_ADMIN_PATH = "/admin";

const App = () => {
  return (
    <ConfigProvider
      prefixCls={PREFIX_CLS}
      theme={{
        token: {},
        components: {},
      }}
    >
      <AppWrapper>
        <Button>Hello</Button>
      </AppWrapper>
    </ConfigProvider>
  );
};

const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export default App;
