import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar';
import { Bar , Line } from 'react-chartjs-2';
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
        const barChartData = placedOrders.map(item => (item.articles).map(obj => ({ category: obj.category, amount: Number(obj.price) , quantity : Number(obj.quantity) })))

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
            if (obj.category === "men's clothing") {
                dispObj.find(i => i.category === "Men's").amount += Number(obj.amount * obj.quantity);
            }
            else if (obj.category === "women's clothing") {
                dispObj.find(i => i.category === "Women's").amount += Number(obj.amount * obj.quantity);
            }
            else if (obj.category === "electronics") {
                dispObj.find(i => i.category === "Electronics").amount += Number(obj.amount * obj.quantity);
            }
            else {
                dispObj.find(i => i.category === "Others").amount += Number(obj.amount * obj.quantity);
            }
        });

        setBarChartData({
            labels: dispObj.map(obj => obj.category),
            datasets: [{
                label: "Sales Amount",
                data: dispObj.map(obj => obj.amount),
                backgroundColor: ["aqua" , "pink" , "lightgrey" , "lightgreen"]
            }]
        })
    }

    return (
        <>
            <Navbar></Navbar>
            {
                hasAdminAccess && (<div>

                    <div className='container d-flex'>
                        <h4 className='justify-content-start'>Bar Chart representing performace of different categories of all the listed articles</h4>
                        <div className="w-50 h-100">
                            <Bar data={barChartData} />
                        </div>
                    </div>

                    <div className='container d-flex'>
                        <h4 className='justify-content-start'>Line Chart representing performace of different categories of all the listed articles</h4>
                        <div className="w-50 h-100">
                            <Line data={barChartData} />
                        </div>
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