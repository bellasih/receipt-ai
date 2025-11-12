import * as React from "react";
import { RiFileWarningFill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import Router from "next/router";
import { Button} from "@/components";

const NotFoundPage: React.FC = () => {
  const handleBack = () => Router.back();

  return (
    <>

      <main>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 text-center">
          <RiFileWarningFill size={72} className="text-red-400" />
          <h1>Page Not Found</h1>
          <Button onClick={handleBack} color="primary">
            <BiArrowBack className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
