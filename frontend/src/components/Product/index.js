import React ,{useContext ,useEffect, useState ,useParams} from 'react'
import { userContext } from '../../App'
import axios from 'axios'
 const Product = () => {
    const {categId} = useContext(userContext)
const [id , setId] = useState(categId)
const [item , setItem]=useState([])
console.log(id);
useEffect(()=>{
    axios.get(`http://localhost:5000/product/${id}/category`).then((respones)=>{
        console.log(respones);
        setItem(respones.data.product)
    }).catch((err)=>{
        console.log(err);
    })
},[])


  return (
    <div>
        <h1>Hello</h1>
        {item.map((produc , i )=>{
            return <div key={i}>
                
                <img src={produc.image} width="200" height="200" />
                <h3 >{produc.name}</h3>
                <h3>{produc.price}</h3>
            </div>
        })}
    </div>
  )
}

export default Product