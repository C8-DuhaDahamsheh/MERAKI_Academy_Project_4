import React ,{useEffect ,useState} from 'react'
import axios from "axios"
import "../Category/style.css"
 const Category = () => {
const [categ , setCateg] = useState([])

  const getAllCategory =()=>{
    axios.get("http://localhost:5000/category/").then((respones)=>{
      
       setCateg(respones.data.category)
    }).catch((err)=>{
      console.log(err);
    })
  }

  
  console.log(categ);
  return (
    <div className='collection' >
      {getAllCategory()}
      {categ.map((coll ,i)=>{
        
        return (<div key={i} className='category'>
        <h2>{coll.name}</h2>
        <img src={coll.imag} width="200" height="200"></img>
        </div>)
      })}
    </div>
  )
}


export default Category