import { createContext, useState } from "react";

export const ModalContext = createContext({});

const ModalProvider = ({ children }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [itemDetail, setItemDetail] = useState();

  const togglePostModal = item => {
    setItemDetail(item);
    setShowPostModal(!showPostModal);
  };

  return (
    <ModalContext.Provider
      value={{
        showPostModal,
        setShowPostModal,
        itemDetail,
        setItemDetail,
        togglePostModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
