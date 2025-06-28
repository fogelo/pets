import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-100 h-[30px] flex items-center px-4">
      <h1 className={styles.title}>Header</h1>
    </header>
  );
};

export default Header;
