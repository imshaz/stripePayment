import React, { Component } from 'react'
import { Text, StyleSheet, View , TouchableHighlight} from 'react-native'
import { PaymentCardTextField } from 'tipsi-stripe'

import stripe from 'tipsi-stripe'

export default class Payment extends Component {

    constructor(){
        super();
        this.state = { 
            token: "NOT GENERATED YET"
        }

    }

    publishableKey ='pk_test_9I0AyS0CyB68Cyy5PXjz3eyM00sbH5KpR1'; 

    status = "Click on the button to process Payment"



    componentDidMount(){
        stripe.setOptions({
            publishableKey: this.publishableKey,
            androidPayMode: 'test'
          })

     
        
    }
     _processPayment=async ()=>{

        console.log('Processing Payment')

        const options = {
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
              billingAddress: {
                name: 'Gunilla Haugeh',
                line1: 'Canary Place',
                line2: '3',
                city: 'Macon',
                state: 'Georgia',
                country: 'US',
                postalCode: '31217',
              },
            },
          }
          
          const token = await stripe.paymentRequestWithCardForm(options)

        //   console.log(token)
        const {tokenId} =token
          this.setState({
              token: tokenId
          })
          
          
          
          // Client specific code
          // api.sendTokenToBackend(token)
    }

    handleFieldParamsChange = (valid, params) => {
        console.log(`
          Valid: ${valid}
          Number: ${params.number || '-'}
          Month: ${params.expMonth || '-'}
          Year: ${params.expYear || '-'}
          CVC: ${params.cvc || '-'}
        `)
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.statusLabel}> { this.status } </Text>
                <Text style={styles.statusLabel}> Token: { this.state.token } </Text>
                <TouchableHighlight onPress={this._processPayment} underlayColor="white">
                     <View style={styles.button}>
                     <Text style={styles.buttonText}>Process Payment</Text>
                     </View>
                     </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    statusLabel:{
        padding: 5,
        margin: 20
    },

container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    height:500,

},

button: {
  marginBottom: 30,
  width: 260,
  alignItems: 'center',
  backgroundColor: '#2196F3'
},
buttonText: {
  textAlign: 'center',
  padding: 20,
  color: 'white'
}, 
field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },

})
