import React, { useCallback, useEffect, useState } from "react";
import Content from "components/Content/Content";
import { FaSearch } from "react-icons/fa";

const HomePage: React.FC = () => {

  return (
    <>

      <main className="bg-grey-light">

        <div
          className="h-[91.5vh] w-full flex items-center justify-center"
        >
          <div className="hidden bg-white rounded-lg w-[85vw] lg:w-[40vw] lg:flex flex-col p-4 lg:px-10 lg:py-8 mt-80 z-1000">
            <div className="flex items-center gap-4">
              <div
                id="search"
                className="w-full bg-white rounded-lg flex items-center justify-between"
              >
                  <FaSearch className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-green-light">
          <Content>
            <div className="flex flex-col items-center py-12 lg:py-24">
            </div>
          </Content>
        </div>
        <Content>
          <div className="w-full flex flex-col items-center">

          </div>
        </Content>
      </main>
    </>
  );
};

export default HomePage;
