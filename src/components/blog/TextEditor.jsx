import React, { useState } from "react";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

const TextEditor = ({ onChange }) => {
 const [model, setModel] = useState("");

 const handleEditorChange = (event) => {
  setModel(event);
  onChange(event);
 };

 return (
  <div>
   <FroalaEditorComponent
    tag="textarea"
    config={{
     placeholderText: "اكتب مقالك هنا ...",
     charCounterCount: true,
     direction: "rtl",
     language: "ar",
     // Disable image upload and use URL only
     imageUpload: false,
     imageInsertButtons: ["imageBack", "|", "imageByURL"],
     // Disable automatic image processing
     imageManagerPreloader: false,
     imagePaste: false,
     // Video configuration
     videoUpload: false,
     videoInsertButtons: ["videoBack", "|", "videoByURL"],
     // Toolbar configuration
     toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "|",
      "align",
      "formatOL",
      "formatUL",
      "|",
      "fontSize",
      "color",
      "|",
      "insertLink",
      "insertImage",
      "insertVideo",
      "|",
      "undo",
      "redo",
     ],
     fontSizeSelection: true,
     fontSize: ["8", "10", "12", "14", "16", "18", "20", "24", "30", "36"],
     quickInsertEnabled: false,
     linkAlwaysBlank: true,
     videoAllowedProviders: ["youtube", "vimeo"],
     // Events to handle image and video URLs
     events: {
      "image.beforeUpload": function (images) {
       // Prevent image upload
       return false;
      },
      "video.beforeUpload": function (videos) {
       // Prevent video upload
       return false;
      },
      "image.inserted": function ($img, response) {
       // Ensure the original URL is preserved
       if ($img.attr("src").startsWith("blob:")) {
        const originalUrl = $img.data("original-url");
        if (originalUrl) {
         $img.attr("src", originalUrl);
        }
       }
      },
      videoResponsive: true, // Enable responsive videos
      videoDefaultWidth: "100%", // Make videos full width by default
      events: {
       "video.inserted": function ($video, response) {
        // Ensure videos maintain aspect ratio
        $video.removeAttr("width height");
        $video.wrap('<div class="fr-video-container"></div>');
       },
      },
     },
    }}
    model={model}
    onModelChange={handleEditorChange}
   />
  </div>
 );
};

export default TextEditor;
