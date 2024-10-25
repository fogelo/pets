import React from 'react';
import { Button } from 'antd';
import './CustomButton.css';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick }) => {
  return (
    <Button className="custom-button" onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
