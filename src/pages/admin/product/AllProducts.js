import React, {useEffect, useState} from "react";
import { AdminNav } from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { AdminProductCard } from '../../../components/cards/AdminProductCard';

export const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state }));

    useEffect(() =>{
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
    };
    
    const handleRemove = (slug) => {
        if(window.confirm("Delete?")){
            removeProduct(slug, user.token)
            .then(res => {
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`)
            })
            .catch(err =>{
                if(err.response.status === 400){
                    toast.error(err.response.data);
                    console.log(err);
                }
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<LoadingOutlined className="h1" />) : (<h4 className="col-md-2">All Products</h4>)}
                    <div className="row">
                        {products.map((product) => <div style={{width: 400}} className="col-md-3 pb-3 " key={product._id}><AdminProductCard product={product} handleRemove={handleRemove}/></div>)}
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};