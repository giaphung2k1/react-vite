import UserTable from '../components/user/user.table';
import UserForm from '../components/user/user.form';
import { useState, useEffect } from 'react';
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {



    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loadingUserTable, setLoadingUserTable] = useState(false);


    useEffect(() => {
        loadUser()
    }, [current, pageSize])


    const loadUser = async () => {
        setLoadingUserTable(true);
        const res = await fetchAllUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result)
            setTotal(res.data.meta.total)
        }
        setLoadingUserTable(false)
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
                    loadingUserTable={loadingUserTable}
                />
            </div>

        </div>
    );
}

export default UserPage;