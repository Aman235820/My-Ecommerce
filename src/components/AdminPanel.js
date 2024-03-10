import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar';
import { Bar } from 'react-chartjs-2';
import { Chart as CharJS } from 'chart.js/auto';

function AdminPanel() {

    const placedOrders = useSelector((state) => {
        return state.masterData.placedOrders;
    })

    const { user } = useContext(AuthContext);

    const [hasAdminAccess, setAdminAccess] = useState(false);

    const [barChartData, setBarChartData] = useState({})

    useEffect(() => {
        setAdminAccess(user?.userData?.AdminAccess);
    }, [user]);

    useEffect(() => {
        prepareBarchartData();
    }, [placedOrders]);


    const prepareBarchartData = () => {
        const barChartData = placedOrders.map(item => (item.articles).map(obj => ({ category: obj.category, amount: Number(obj.price) })))
        console.log(barChartData)

        const dispObj = [
            {
                category: "Men's",
                amount: 0
            },
            {
                category: "Women's",
                amount: 0
            },
            {
                category: "Electronics",
                amount: 0
            },
            {
                category: "Others",
                amount: 0
            }
        ];


        const flattendbarChartData = barChartData.flat();                                  //it converts the 2-D array into single dimentional array eg : [[1,2],[3,4],[4,5]] -> [1,2,3,4,5]

        flattendbarChartData.forEach(obj => {
            if (obj.category == "men's clothing") {
                dispObj.find(i => i.category == "Men's").amount += Number(obj.amount);
            }
            else if (obj.category == "women's clothing") {
                dispObj.find(i => i.category == "Women's").amount += Number(obj.amount);
            }
            else if (obj.category == "electronics") {
                dispObj.find(i => i.category == "Electronics").amount += Number(obj.amount);
            }
            else{
                dispObj.find(i => i.category == "Others").amount += Number(obj.amount);
            }
        });

              setBarChartData({
                labels : dispObj.map(obj=> obj.category),
                datasets: [{
                       label: "Sales Amount",
                       data: dispObj.map(obj=> obj.amount)
                }]
          })
    }

    return (
        <>
            <Navbar></Navbar>
            {
                hasAdminAccess && (<div>

                    <div className='container'>

                        <Bar data={barChartData} />

                    </div>


                </div>)
            }
            {
                !hasAdminAccess && (<div><p>You don't have Admin Access !!</p></div>)
            }
        </>
    );
}

export default AdminPanel;