import { Music } from './music.model ';
import {User} from './user.model'

const entities = [User, Music]
// export separately
export {User};
export {Music};
// export all
export default entities;