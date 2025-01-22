import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';

function TransactionVerification(){
    const {orderId} =useParams();
    const [order,setOrder]=useState(null);
    
}