//import { post, postWithLoadTip } from '@/utils/request'

// export default {
//     login: query => postWithLoadTip(`/api/user/login`, query),
//     logout: query => post(`/api/user/logout`, query)
// }
import axios from 'axios';
import result from '../mock/mock';

export default {
    login: query => {
        let result = axios.get('http://localhost:8080/mockData');
        result.then((res)=>{console.log('success',res);}).catch((res)=>{console.log('fail',res);})
        return result;
    }
}