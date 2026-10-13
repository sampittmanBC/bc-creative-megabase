import {handleAuth} from '../../lib/auth.js';
export default request=>handleAuth(request,process.env);
export const config={path:['/api/login','/api/logout']};
