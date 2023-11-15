/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import UseGet_1 from '../../MainConDas/components/hooks/UseGet_1';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillSendFill } from 'react-icons/bs';
import UseGet_11 from '../../MainConDas/components/hooks/UseGet_B_1';


function StationDetailTable({ station, isSetUp,data,handleEdit,setIsSure,setStationName,stationLiense,setStationLiense,stationLocation,setStationLocation,stationDeviceCount,setStationDeviceCount,stationNozzleCount,setStationNozzleCount,stationName,stationLoading,deleteStation }) {
    const [stationData, setStationData] = useState([]);
    const user = useSelector((state) => state.login);
    const [collectionName, setCollectionName] = useState('');
    const navigate = useNavigate();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const name = urlParams.get('name');


    const [{ data_g_11, loading_g_11, error_g_11 }, fetchIt_G_11] = UseGet_11();

    useEffect(() => {
        if (!user.login) {
            navigate("/");
        }
      
        
        
        fetchIt_G_11(`/station-detail/get/all`,name, user.token);
    }, []);

    useEffect(() => {
       fetchIt_G_11(`/station-detail/get/all`,name, user.token);

    },[stationLoading])

    useEffect(() => {

        if (data_g_11.result) {
            setStationData(data_g_11.result);
        }
    }, [ data_g_11, loading_g_11, error_g_11]);



    return (
        <table id='detailSale_table' className=' bg-white text-xs'>
            <tr>
                <th className='w-[2%]'>No</th>
                <th className='w-[18.2%]'>Id</th>
                <th className='w-[14.2%]'>Name</th>
                <th className='w-[7.2%]'>Liense No</th>
                <th className='w-[20.2%]'>Location</th>
                {
                    isSetUp ? "" :
                        <>
                <th className='w-[5.4%]'>Device Count</th>
                <th className='w-[5.4%]'>Nozzle Count</th>
                <th className='w-[5.2%]'>Edit</th>
                <th className='w-[5.2%]'>Delete</th>
                        </>
                }
            </tr>
            {
                stationData.map((e, id) => (
                    <tr>
                        <td>{id+1}</td>
                        <td>{e._id}</td>
                        <td>{data === e._id ? <input
                      onChange={(e)=>setStationName(e.target.value)}
className='border-[1px] h-full px-2  border-black'
value={stationName}
                    />: <p>{e.name}</p>}</td>
                        <td>{data === e._id ? 
                        <input 
                          onChange={(e)=>setStationLiense(e.target.value)}
className='border-[1px] h-full px-2 border-black'
value={stationLiense}
                        /> : <p>{e.lienseNo}</p>}</td>
                         <td>{data === e._id ? 
                        <textarea 
                        onChange={(e)=>setStationLocation(e.target.value)}
                        className='border-[1px] h-full px-2 border-black'
                        value={stationLocation}
                            />
                          : <p>{e.location}</p>}</td>
                        {
                            isSetUp ? "" :
                                <>
                    <td>{data === e._id ? 
                    <input 
                    type='number'
                    onChange={(e)=>setStationDeviceCount(e.target.value)}
                    className='border-[1px] h-full w-[50px] px-2 border-black'
                    value={stationDeviceCount}
                    /> : <p>{e.deviceCount}</p>}</td>
                    <td>{data === e._id ? <input type='number'
                    onChange={(e)=>setStationNozzleCount(e.target.value)}
                    className='border-[1px] h-full w-[50px] px-2 border-black'
                    value={stationNozzleCount}/> : <p>{e.nozzleCount}</p>}</td>
                    <td className={` text-white ${data === e._id?"bg-green-500":"bg-gray-500"}`}><button className=' flex items-center justify-center  w-[100%] h-[100%]'>{data === e._id ? <button onClick={()=>setIsSure(true)}  className=' flex items-center justify-center w-full h-full'><BsFillSendFill  className=' scale-[1.5]'/></button> :<button className=' flex items-center justify-center w-full h-full' onClick={()=>handleEdit(e)}> <AiFillEdit   className=' scale-[1.5]' /></button>}</button></td>
                    <td  onClick={()=>{deleteStation(e)}} className={` text-white border-2 bg-red-500`}>
                        <button>Delete</button>
                    </td>
                    </>
   }
                    </tr>
                ))
            }
        </table>
    )
}

export default StationDetailTable