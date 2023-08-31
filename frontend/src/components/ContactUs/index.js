import React, { useRef ,useState  } from 'react';
import emailjs from '@emailjs/browser';
import "../ContactUs/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit'

 const ContactUs = () => {
  const [messg ,setMessg]=useState("")
const[success ,setSuccess]=useState(true)
  const notifySucc = () => toast.success("Send Message Successfully", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });


    const notifyErr = () => toast.error("Send Message Faild...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });



  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_aesfl0b', 'template_lz0dgna', form.current, 'AeudsNtPdl-qTBqqj')
      .then((result) => {
          console.log('SUCCESS!', result.status, result.text);
          setMessg("SUCCESS!")
          setSuccess(true)
         
      }, (error) => {
          console.log('FAILED...', error.text);
          setMessg("FAILED...")
          setSuccess(false)
        
      });
  };

  return (
    // <form ref={form} onSubmit={sendEmail}>
    //   <label>Name</label>
    //   <input type="text" name="user_name" />
    //   <label>Email</label>
    //   <input type="email" name="user_email" />
    //   <label>Message</label>
    //   <textarea name="message" />
    //   <input type="submit" value="Send" />
    

<MDBContainer className='formContact'>

<form   ref={form} onSubmit={sendEmail} className='contact'>
      <MDBInput id='form4Example1'className='w-25' wrapperClass='mb-4' label='Name' />
      <MDBInput type='email' id='form4Example2' wrapperClass='mb-4' label='Email address'className='w-25' />
      <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Message' className='w-25' />

      <MDBCheckbox
        wrapperClass='d-flex justify-content-center mb-4'
        id='form4Example4'
        label='Send me a copy of this message'
        defaultChecked
      />
       <ToastContainer />
      <MDBBtn noRipple type='submit' className='mb-4' block  onClick={()=>{
        success ? notifySucc() : notifyErr()
      }}>
      Submit
      </MDBBtn>
     
    </form>
    
</MDBContainer>

  );
};



export default ContactUs