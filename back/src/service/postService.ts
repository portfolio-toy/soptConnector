import CommentDTO from "../dto/CommentDTO";
import Post from "../models/Post";

export default {
  comment : async {dto: CommentDTO} => {
    try{
      //비즈니스(서비스) 로직 service디렉터리를 만들어서 분리를 해준 것
      const {postId, userId, text} = dto;
      const user = await User.findById(userId).select("-password");
      const post = await Post.findById(postId)
        const newPost = IComment = {
          text: text,
          name: user.name,
          avatar: user.avatar,
          user: userId,
        });
        post.comments.unshift(newComment);
        await newPost.save();
        return post;

      } catch (error) {
        console.error(error.message);
      }
    };

//DTO, response DTO를 나눠서 설계하는 것이 좋다!
