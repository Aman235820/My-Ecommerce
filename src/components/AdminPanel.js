import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import Navbar from './Navbar';
import ProfileModal from './modals/ProfileModal';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as CharJS } from 'chart.js/auto';

function AdminPanel() {

    const placedOrders = useSelector((state) => {
        return state.masterData.placedOrders;
    });

    const { user , showProfileModal } = useContext(AuthContext);

    const [hasAdminAccess, setAdminAccess] = useState(false);

    const [barChartData, setBarChartData] = useState({});

    useEffect(() => {
        setAdminAccess(user?.userData?.AdminAccess);
    }, [user]);

    useEffect(() => {
        prepareBarchartData();
    }, [placedOrders]);

    const prepareBarchartData = () => {
        const barChartData = placedOrders.map(item => (item.articles).map(obj => ({ category: obj.category, amount: Number(obj.price), quantity: Number(obj.quantity) })));

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

        const flattendbarChartData = barChartData.flat();     //it converts the 2-D array into single dimentional array eg : [[1,2],[3,4],[4,5]] -> [1,2,3,4,5]

        flattendbarChartData.forEach(obj => {
            switch (obj.category.toLowerCase()) {
                case "men's clothing":
                    dispObj.find(i => i.category === "Men's").amount += Number(obj.amount * obj.quantity);
                    break;
                case "women's clothing":
                    dispObj.find(i => i.category === "Women's").amount += Number(obj.amount * obj.quantity);
                    break;
                case "electronics":
                    dispObj.find(i => i.category === "Electronics").amount += Number(obj.amount * obj.quantity);
                    break;
                default:
                    dispObj.find(i => i.category === "Others").amount += Number(obj.amount * obj.quantity);
                    break;
            }
        });

        setBarChartData({
            labels: dispObj.map(obj => obj.category),
            datasets: [{
                label: "Sales Amount",
                data: dispObj.map(obj => obj.amount),
                backgroundColor: ["aqua", "pink", "lightgrey", "lightgreen"]
            }]
        });
    };

    return (
        <>
            
            {showProfileModal && <ProfileModal></ProfileModal>}
            
            
            <header className="d-flex justify-content-center py-3">
                <Navbar />
            </header>
            <div className="container my-4">
                {hasAdminAccess ? (
                    <>
                        <div className="row">
                            <div className="col">
                                <h4>Bar Graph illustrating the performance of various categories across all listed articles.</h4>
                                <div className="chart-container">
                                    <Bar data={barChartData} />
                                </div>
                            </div>
                            <div className="col">
                                <h4>Line Graph showcasing the performance trends of different article categories</h4>
                                <div className="chart-container">
                                    <Line data={barChartData} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        You don't have Admin Access !!
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminPanel;
