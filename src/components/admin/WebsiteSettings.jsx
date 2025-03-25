import { useEffect, useState } from "react";
import { apiUrl } from "../../pages/blog/Register";
import axios from "axios";
import Loader from "../blog/Loader";
import WebsiteColor from "./WebsiteColor";
import Line from "../Line";

const WebsiteSettings = ({ token }) => {
 const [websiteData, setWebsiteData] = useState({
  websiteName: "",
  websiteTitle: "",
  favicon: "",
  websiteLogo: "",
  canPublish: true,
  showLogo: false,
  showName: true,
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [savedSuccessfully, setSavedSuccessfully] = useState(false);

 const fetchCurrentSettings = async () => {
  setLoading(true);
  try {
   const resp = await axios.get(`${apiUrl}/api/admin/webiste-settings`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setWebsiteData(resp.data);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const handleResetSettings = async () => {
  setLoading(true);
  try {
   const resp = await axios.get(`${apiUrl}/api/admin/reset-webiste-settings`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setWebsiteData(resp.data);
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSavedSuccessfully(false);
  setLoading(true);
  setError(null);
  try {
   const resp = await axios.post(
    `${apiUrl}/api/admin/webiste-settings`,
    websiteData,
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   setWebsiteData(resp.data);
   setSavedSuccessfully(true);
  } catch (error) {
   console.error(error);
   setError(error.response.data.error || "حدث خطأ غير معروف");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCurrentSettings();
 }, []);

 if (loading) return <Loader />;

 return (
  <div className="w-full max-w-[800px] mx-auto">
   <h1 className="text-center text-2xl m-2">تحديث بيانات الموقع</h1>
   <form onSubmit={handleSubmit}>
    <div className="mb-4">
     <label
      htmlFor="websiteName"
      className="block text-gray-700 dark:text-gray-300 mb-2"
     >
      اسم الموقع
     </label>
     <input
      type="text"
      id="websiteName"
      placeholder="اكتب اسم الموقع ..."
      value={websiteData.websiteName}
      onChange={(e) =>
       setWebsiteData({ ...websiteData, websiteName: e.target.value })
      }
      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
      required
     />
    </div>
    <div className="mb-4">
     <label
      htmlFor="websiteTitle"
      className="block text-gray-700 dark:text-gray-300 mb-2"
     >
      عنوان الموقع
     </label>
     <input
      type="text"
      id="websiteTitle"
      placeholder="اكتب عنوان الموقع ..."
      value={websiteData.websiteTitle}
      onChange={(e) =>
       setWebsiteData({ ...websiteData, websiteTitle: e.target.value })
      }
      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
      required
     />
    </div>
    <div className="mb-4">
     <label
      htmlFor="favicon"
      className="block text-gray-700 dark:text-gray-300 mb-2"
     >
      ايقونة الموقع (favicon)
     </label>
     <input
      type="text"
      id="favicon"
      placeholder="رابط أيقونة الموقع"
      value={websiteData.favicon}
      onChange={(e) =>
       setWebsiteData({ ...websiteData, favicon: e.target.value })
      }
      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
      required
     />
    </div>
    <div className="mb-4">
     <label
      htmlFor="websiteLogo"
      className="block text-gray-700 dark:text-gray-300 mb-2"
     >
      لوغو الموقع
     </label>
     <input
      type="text"
      id="websiteLogo"
      placeholder="رابط لوغو الموقع"
      value={websiteData.websiteLogo}
      onChange={(e) =>
       setWebsiteData({ ...websiteData, websiteLogo: e.target.value })
      }
      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
      required
     />
    </div>
    <div className="flex items-center justify-center gap-4 text-center">
     <div className="mb-4 dark:bg-gray-700 bg-gray-200 p-1 rounded">
      <label
       htmlFor="canPublish"
       className="block text-gray-700 dark:text-gray-300 mb-2"
      >
       تمكين النشر للأعضاء
      </label>
      <input
       type="checkbox"
       id="canPublish"
       checked={websiteData.canPublish}
       onChange={(e) =>
        setWebsiteData({ ...websiteData, canPublish: e.target.checked })
       }
       className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
      />
     </div>
     <div className="mb-4 dark:bg-gray-700 bg-gray-200  p-1 rounded">
      <label
       htmlFor="showLogo"
       className="block text-gray-700 dark:text-gray-300 mb-2"
      >
       عرض الشعار
      </label>
      <input
       type="checkbox"
       id="showLogo"
       checked={websiteData.showLogo}
       onChange={(e) =>
        setWebsiteData({ ...websiteData, showLogo: e.target.checked })
       }
       className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
      />
     </div>
     <div className="mb-4 dark:bg-gray-700 bg-gray-200  p-1 rounded">
      <label
       htmlFor="showName"
       className="block text-gray-700 dark:text-gray-300 mb-2"
      >
       عرض الاسم
      </label>
      <input
       type="checkbox"
       id="showName"
       checked={websiteData.showName}
       onChange={(e) =>
        setWebsiteData({ ...websiteData, showName: e.target.checked })
       }
       className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
      />
     </div>
    </div>
    <button
     type="submit"
     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
     disabled={loading}
    >
     {loading ? "جاري الحفظ..." : "حفظ الإعدادات"}
    </button>
    {savedSuccessfully && (
     <p className="text-green-600 mt-2 text-center mb-2">
      تم حفظ الإعدادات بنجاح!
     </p>
    )}
    {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
   </form>
   <button
    onClick={handleResetSettings}
    className="bg-blue-500 text-white px-4 py-2 my-2.5 rounded-lg hover:bg-blue-600 transition duration-200"
    disabled={loading}
   >
    {loading ? "جاري الاستعادة..." : "استعادة الوضع التلقائي"}
   </button>
   <Line />
   <WebsiteColor />
   <p className="text-end text-xs text-gray-700 dark:text-gray-400">
    قم باعادة تحميل الصفحة لرؤية التغييرات
   </p>
  </div>
 );
};

export default WebsiteSettings;
