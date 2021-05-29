import User from "../models/User";
import Post from "../models/Post";
import { IComment } from "../interfaces/IComment";
import CommentDTO from "../dto/CommentDTO";

/**
 * @route POST api/posts/comment/:id
 * @desc Comment a post
 * @access Private
 */
export default {
  comment: async (dto: CommentDTO) => {
    try {
      // Service Logic service 디렉터리를 만들어서 분리해준 것
      const { postId, userId, text } = dto;
      const user = await User.findById(userId).select("-password");
      const post = await Post.findById(postId);
      const newComment: IComment = {
        text: text,
        name: user.name,
        avatar: user.avatar,
        user: userId,
    };
    
      post.comments.unshift(newComment);
      await post.save();
      return post;
    } catch (error) {
      console.error(error.message);
    }
  }
};