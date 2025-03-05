const CommentForm = ({
 comment,
 setComment,
 handleCommentSubmit,
 commenting,
}) => {
 return (
  <form onSubmit={handleCommentSubmit} className="mt-6">
   <textarea
    placeholder="اكتب تعليق ..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-400"
    rows="3"
    required
   />
   <button
    disabled={commenting}
    type="submit"
    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
   >
    {commenting ? "جاري التعليق ..." : "التعليق"}
   </button>
  </form>
 );
};

export default CommentForm;
