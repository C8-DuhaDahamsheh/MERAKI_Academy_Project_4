import React ,{useContext ,useEffect, useState} from 'react'
import { userContext } from '../../App'
import axios from 'axios'
 const Product = () => {
    const {categId} = useContext(userContext)
const [item , setItem]=useState([])
useEffect(()=>{
    axios.get(`http://localhost:5000/${categId}/category/`).then((respones)=>{
        setItem(respones.data.product)
    }).catch((err)=>{
        console.log(err);
    })
},[])
console.log(categId);

  return (
    <div>
        <h1>Hello</h1>
        {item.map((prod , i )=>{
            return <div key={i}>
                <h1 >{prod.name}</h1>
            </div>
        })}
    </div>
  )
}

export default Product