import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

const UpdateBlogEditor = ({ handleEditorChange, content }) => {
 return (
  <FroalaEditorComponent
   tag="textarea"
   config={{
    placeholderText: "Edit your blog content here...",
    charCounterCount: true,
    direction: "rtl",
    language: "ar",
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
    imageUpload: false,
    videoUpload: false,
    videoResponsive: true,
    videoDefaultWidth: "100%",
    events: {
     "video.inserted": function ($video, response) {
      $video.removeAttr("width height");
      $video.wrap('<div class="fr-video-container"></div>');
     },
    },
   }}
   model={content}
   onModelChange={handleEditorChange}
  />
 );
};

export default UpdateBlogEditor;
