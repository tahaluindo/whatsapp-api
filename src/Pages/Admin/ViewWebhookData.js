import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import UserPermissionDataTable from '../../Components/Common/UserPermissionDataTable'
// import PaymentDataTable from '../../Components/Common/PaymentDataTable'

function ViewWebhookData(props) {

    // const bearer = JSON.parse(window.localStorage.getItem('token'))
    // const header = {
    //     headers: {
    //         Authorization: `Bearer ${bearer}`,
    //         Accept: 'application/json',
    //     }
    // }

    const columns = [
        {
            Header: 'Sl.',
            Cell: ({ row }) => (
                <div className='px-1'>{row.index + 1}</div>
            )
        },
        {
            Header: 'Event',
            accessor: 'event',
        },
        {
            Header: 'Payment Order Id',
            accessor: 'payment_order_id',
        },
        {
            Header: 'Phone No',
            accessor: 'payment_contact',
        },
        {
            Header: 'Method',
            accessor: 'payment_method',
        },
        {
            Header: 'Amount',
            accessor: 'payment_amount',
            Cell: (props) => {
                return (
                    <p >
                        {props.value && '₹' + props.value}
                    </p>
                );
            }
        },
        {
            Header: 'Email At',
            accessor: 'payment_email',
        },
        {
            Header: 'Status',
            accessor: 'payment_status',
        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ cell }) => (
                <button onClick={() => props.viewBtn(cell.row.values.id, cell.row.values.role_name)} className='shadow-xl bg-blue-500 hover:bg-blue-600 py-2 px-3 text-white rounded-sm mx-1'>
                    View Details</button>
            )
        }

        // {
        //     Header: 'Action',
        //     accessor: 'id',
        //     Cell: ({ cell }) => (
        //         <button onClick={() => props.viewBtn(cell.row.values.id, cell.row.values.role_name)} className='bg-blue-600 hover:bg-blue-400 py-1 px-3 text-white rounded-sm mx-1'>
        //             View Users</button>
        //     )
        // }
    ]

    const { isLoading, data, isError, error } = useQuery("view-razorpay-payment-data", () => {
        try {
            return axios.get(`http://203.129.217.245:80/api/view-razorpay-payment-data`);
        } catch (err) {
            console.log("Error in fetching Data", err)
        }
    });
    if (!isLoading) { }


    const FakeData = [
        { 'role_name': "Dipu Singh", "created_at": "Today" },
    ]

    console.log("Data is", data?.data)
    return (
        <>
            <div className='border mt-0 mx-0 px-1 pt-1 pb-10 bg-white mb-20'>
                <div className={`p-2 bg-green-400 shadow-lg`}>
                    <div className='grid grid-cols-2 '>
                        <div className='col-span-1 text-xl font-semibold'>All Payment Details</div>

                    </div>
                </div>
                <div>
                    <div>
                        {/* {!isLoading && <UserPermissionDataTable searchText="Roles" columns={columns} data={data?.data?.data} />} */}

                        {data?.data ? !isLoading && <UserPermissionDataTable searchText="Roles" columns={columns} data={data?.data?.data} /> : "Something Went Wrong"}


                        {/* <UserPermissionDataTable searchText="Roles" columns={columns} data={FakeData} /> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewWebhookData