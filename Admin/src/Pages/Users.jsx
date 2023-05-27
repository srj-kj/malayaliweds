/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "../Axios/axios";

const users = () => {
  const [user, setUser] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const handleBlock = (id) => {
    axios.put(`/admin/user/block/${id}`).then(() =>{
      setRefresh(!refresh)
    })
  }

  useEffect(() => {
    axios.get("/admin/users").then((response) => {
      console.log(response.data.user);
      setUser(response.data.user);
    });
  }, [refresh]);

  console.log(user);

  return (
    <div className="flex">
      <div className="m-5 w-full">
        <div className="flex flex-col">
          <div className=" sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {filter.length > 0 ? filter.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td><MdOutlineDeleteOutline onClick={() => removeUser(e._id)} /></td>
                <td><GrEdit onClick={() => {
                  dipatch(adminsetedit(e))
                  navigate('/adminedituser')
                }} /></td>
              </tr>
            );
          }) : <>User Doesnt Exist</>} */}
                    {user &&
                      user?.map((e, i) => (
                        <tr
                          key={e._id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {e.username}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {e.email}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {e.phone}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"   
                                checked={e.blocked ? true : false}
                                onChange={()=>handleBlock(e._id)}
                              />
                              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-white dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                              
                            </label>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default users;
