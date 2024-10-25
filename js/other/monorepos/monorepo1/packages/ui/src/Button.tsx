// packages/ui-components/src/Button/Button.tsx
import React from 'react';
import { Button as AntButton } from 'antd';

export const Button: React.FC<{ type: "primary" | "default" }> = ({ children, ...props }) => {
  return <AntButton {...props}>{children}</AntButton>;
};

// packages/ui-components/src/Button/index.ts
export { Button } from './Button';