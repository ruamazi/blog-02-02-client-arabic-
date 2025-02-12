import React from "react";

const PageNotFound = () => {
 return (
  <div className="flex flex-col items-center justify-center mt-16 gap-6 px-2">
   <img src="/download.svg" alt="not found" width={500} />
   <p className="text-4xl text-purple-400">الصفحة غير متوفرة</p>
  </div>
 );
};

export default PageNotFound;
