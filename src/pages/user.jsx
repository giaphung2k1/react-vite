import UserTable from '../components/user/user.table';
import UserForm from '../components/user/user.form';
import { useState,useEffect  } from 'react';
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {
 


    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        loadUser()
    }, [current,pageSize])


    const loadUser = async () => {
        const res = await fetchAllUserAPI(current,pageSize);
        if(res.data){
            setDataUsers(res.data.result)
            setTotal(res.data.meta.total) 
        }
    }
 
    

    return (
        <div>
            <div>
                <UserForm
                    loadUser={loadUser}
                />
                <UserTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                />
            </div>

        </div>
    );
}

export default UserPage;