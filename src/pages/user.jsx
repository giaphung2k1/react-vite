import { Space, Table, Tag } from 'antd';
import UserTable from '../components/user/user.table';
import UserForm from '../components/user/user.form';
const UserPage = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];


    return (
        <div>
            <div>
                <UserForm/>
                <UserTable />
            </div>

        </div>
    );
}

export default UserPage;