import { useTheme } from "../../context/ThemeContext";

const WebsiteColor = () => {
 const {
  colors,
  updateColors,
  resetColors,
  darkMode: isDark,
  saveColorsToDB,
 } = useTheme();

 const renderColorInput = (theme, property, label) => (
  <div className="flex items-center gap-4 py-2 border-b border-gray-200">
   <label
    style={{
     color: isDark ? colors.dark.secondaryColor : colors.light.secondaryColor,
    }}
    className="w-48 font-medium"
   >
    {label}
   </label>
   <input
    type="color"
    value={colors[theme][property]}
    onChange={(e) => updateColors(theme, property, e.target.value)}
    className="h-10 w-10 cursor-pointer"
   />
   <span className="hidden md:inline font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
    {colors[theme][property]}
   </span>
  </div>
 );

 const handleSave = async () => {
  try {
   await saveColorsToDB();
   alert("تم حفظ الألوان بنجاح");
  } catch (error) {
   console.error("Failed to save colors:", error);
   alert("حدث خطأ أثناء حفظ الألوان");
  }
 };

 const handleReset = () => {
  resetColors();
 };

 return (
  <div className="p-6 max-w-4xl mx-auto">
   <h1
    style={{
     color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
    }}
    className="text-2xl font-bold text-center mb-8"
   >
    اعدادات لون الموقع
   </h1>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Dark Theme */}
    <div className=" p-5 rounded-lg shadow">
     <h3
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
      className="text-lg font-bold mb-4 pb-2 border-b border-gray-300"
     >
      الوضع الداكن
     </h3>

     {renderColorInput("dark", "primaryBackground", "لون الخلفية الأساسي")}
     {renderColorInput("dark", "secondaryBackground", "لون الخلفية الثانوي")}
     {renderColorInput("dark", "tertiaryBackground", "لون خلفية التعليقات")}
     {renderColorInput("dark", "primaryColor", "لون النص الأساسي")}
     {renderColorInput("dark", "secondaryColor", "لون النص الثانوي")}
     {renderColorInput("dark", "primaryBtn", "لون الزر الأساسي (أزرق)")}
     {renderColorInput("dark", "secondaryBtn", "لون الزر الثانوي (أخضر)")}
     {renderColorInput("dark", "tertiaryBtn", "لون الزر الثالث (أحمر)")}
     {renderColorInput("dark", "quaternaryBtn", "لون الزر الرابع (ذهبي)")}
     {renderColorInput("dark", "backToHomeBtn", "لون زر العودة للرئيسية")}
     {renderColorInput("dark", "grayColor", "لون الرمادي")}
    </div>

    {/* Light Theme */}
    <div className=" p-5 rounded-lg shadow">
     <h3
      style={{
       color: isDark ? colors.dark.primaryColor : colors.light.primaryColor,
      }}
      className="text-lg font-bold mb-4 pb-2 border-b border-gray-300"
     >
      الوضع الفاتح
     </h3>

     {renderColorInput("light", "primaryBackground", "لون الخلفية الأساسي")}
     {renderColorInput("light", "secondaryBackground", "لون الخلفية الثانوي")}
     {renderColorInput("light", "tertiaryBackground", "لون خلفية التعليقات")}
     {renderColorInput("light", "primaryColor", "لون النص الأساسي")}
     {renderColorInput("light", "secondaryColor", "لون النص الثانوي")}
     {renderColorInput("light", "primaryBtn", "لون الزر الأساسي (أزرق)")}
     {renderColorInput("light", "secondaryBtn", "لون الزر الثانوي (أخضر)")}
     {renderColorInput("light", "tertiaryBtn", "لون الزر الثالث (أحمر)")}
     {renderColorInput("light", "quaternaryBtn", "لون الزر الرابع (ذهبي)")}
     {renderColorInput("light", "backToHomeBtn", "لون زر العودة للرئيسية")}
     {renderColorInput("light", "grayColor", "لون الرمادي")}
    </div>
   </div>

   <div className="flex gap-3 flex-wrap mt-8 text-center">
    <button
     onClick={handleSave}
     style={{
      backgroundColor: isDark
       ? colors.dark.primaryBtn
       : colors.light.primaryBtn,
     }}
     className="opacity-85 hover:opacity-100 text-white py-2 px-6 rounded-lg transition-all duration-200"
    >
     حفظ التغييرات
    </button>
    <button
     onClick={handleReset}
     style={{
      backgroundColor: isDark ? colors.dark.grayColor : colors.light.grayColor,
     }}
     className="opacity-80 hover:opacity-100 text-white py-2 px-6 rounded-lg transition-all duration-200"
    >
     إعادة تعيين
    </button>
   </div>
  </div>
 );
};

export default WebsiteColor;
