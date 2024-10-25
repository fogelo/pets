import React from 'react';
import { CustomButton } from '@monorepo2/ui-kit';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Custom Button Clicked!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>
      <CustomButton onClick={handleClick}>Нажми меня</CustomButton>
    </div>
  );
};

export default App;
