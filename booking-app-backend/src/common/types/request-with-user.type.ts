import { Request } from "express";
import User from "src/common/types/user.type";

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
