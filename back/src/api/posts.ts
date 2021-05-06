import express,{ Router, Request, Response } from "express"
import auth from "../middleware/auth";

const router = Router();

/**
 *  @route GET api/posts
 *  @desc Get all posts
 *  @access Private
 */
router.get("/", auth, async ( req:Request, res:Response )=>{
    console.log(req);

});

router.get("/", async (req: Request, res: Response) => {
    try {
      const profiles = await Profile.find().populate("user",["name","avatar"]);
      res.json(profiles);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;