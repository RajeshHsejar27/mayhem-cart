import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useEffect,useState } from "react";
import axios from "axios";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import moment from "moment";



export default function UserOrders(){
   //context
   const [auth,setAuth]=useAuth();

   //state
   const [orders,setOrders]=useState([]);

   useEffect(()=>{
    if (auth?.token) getOrders();
   },[auth?.token]);

   const getOrders=async()=>{
    try{
        const {data}=await axios.get("/orders");
        setOrders(data);
    }catch(err){
        console.log(err);
    }
   }

   return(
    <>
        <Jumbotron
        
        subtitle="Your Orders are here!" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <UserMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">The Orders on Artifacts</div>
                    <h5 style={{color:"white"}}>Spent your gold on...</h5>
                   

                    {orders?.map((o,i)=>{
                        return(
                            <div key={o._id} className="border shadow bg-light rounded-4 bg mb-5">


                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Name of the Emptor</th>
                                        <th scope="col">Ordered</th>
                                        <th scope="col">Trade</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{o?.status}</td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createdAt).fromNow()}</td>
                                        <td>{o?.payment?.success ? 'Success':'Failed'}</td>
                                        <td>{o?.products?.length} artifacts</td>
                                    </tr>

                                </tbody>
                                </table>

                             <div className="container">
                                <div className="row m-2">
                                {o?.products?.map((p,i)=>(
                                    <ProductCardHorizontal key={i} p={p} remove={false}/>
                                ))}
                                </div>
                              </div>

                            </div>
                        )
                    })}

                    
                    </div>
            </div>
        </div>
        </>
   )
}