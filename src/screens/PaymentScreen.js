import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Form,Button, FormGroup,Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'


import { savePaymentMethod, saveShippingAddress } from '../actions/cartActions'

function PaymentScreen() {
    let navigate = useNavigate();
    const cart=useSelector(state=>state.cart)
    const {shippingAddress} =cart

    const dispatch=useDispatch()

    const [paymentMethod,setPaymentMethod]=useState('Paypal')

    if(!shippingAddress.address){
        navigate('/shipping')

    }

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                <Form.Check
                 type='radio'
                  label='Payapl or Credit Card'
                   id='payapl' 
                   name='paymentMethod'
                    checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen