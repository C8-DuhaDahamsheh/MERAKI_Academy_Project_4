import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../ContactUs/style.css"
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit'
 const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
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

      <MDBBtn noRipple type='submit' className='mb-4' block>
      Submit
      </MDBBtn>
    </form>
</MDBContainer>
  );
};



export default ContactUs