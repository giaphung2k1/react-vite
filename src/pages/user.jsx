import UserTable from '../components/user/user.table';
import UserForm from '../components/user/user.form';
import { useState,useEffect  } from 'react';
import { fetchAllUserAPI } from '../services/api.service';
const UserPage = () => {
 


    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        loadUser()
    }, [])


    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data)
    }

    return (
        <div>
            <div>
                <UserForm
                    loadUser={loadUser}
                />
                <UserTable
                    dataUsers={dataUsers}
                />
            </div>

        </div>
    );
}

export default UserPage;