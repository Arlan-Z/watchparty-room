import { v4 as uuidv4 } from "uuid"; 

class UserUtils {
  private userId : string;
  
  constructor() {
    this.userId = uuidv4();
  }

  getUserId() {
    return this.userId;
  }
}

export default new UserUtils();