import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../../../hook/useAxiosPublic';
import { FaUser } from 'react-icons/fa';
import useAxiosSecure from './../../../../hook/useAxiosSecure';
const Users = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic(`/users`);
      return res.data;
    },
  });
  // make admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
      console.log(res.data);
      refetch()
    })

  }
  // delete user
  const handleDelete = (user) => {
    axiosSecure.delete(`/users/${user._id}`)
    .then(res => {
      console.log(res.data);
      refetch()
    })

  }
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[870px]">
          {/* head */}
          <thead className="bg-green text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <th>{user.name}</th>
                <td>{user.email}</td>
                <td>{user.role === 'admin' ? 'admin' : (
                  <button onClick={()=> handleMakeAdmin(user)}><FaUser></FaUser></button>
                )}</td>
                <td><button onClick={()=>handleDelete(user)} className='btn btn-xs bg-red text-white'>x</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
