import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style/style.css';
import '../App.css';
import contract from "../connector/contract";
import account from "../connector/account";
import Paper from '@material-ui/core/Paper';
import InfoDialog from "./InfoDialog";
import Edit_ModalDialog from "./Edit_ModalDialog";
import DisplayCustomers from "./DisplayCustomers";
import CarListDialog from "./CarListDialog";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

class FetchingCustomer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            customers : [

                {
                    id: "",
                    ownerFullName: "",
                    carMake:"",
                    carModel: "",
                    extraDes:"",
                    photos:[],
                },
            ],

        };

    }

    getCustomers = async () => {

        const instance = await contract;
        var customerData = [];


        await instance.getNumOfCustomers.call().then((number) => {

            const numberOfCustomers = number.c[0];

            for (let i = 0; i < numberOfCustomers; i++) {

                const carPhotos = [];


                instance.getCustomer.call(i).then((output) => {
                    if (output != null) {
                        var id =  output[0].c[0];

                        instance.getNumOfPhotos.call(id).then((num) => {
                            const imageNumber = num.c[0];

                            for (let j = 0; j < imageNumber; j++) {
                                instance.getCustomerPhotos.call(id, j).then((image) => {
                                    carPhotos.push(image);
                                });

                            }
                        })
                    }

                    customerData.push({
                        id: id,
                        ownerFullName: output[1],
                        carMake: output[2],
                        carModel: output[3],
                        extraDes: output[4],
                        photos: carPhotos
                    })
                    this.setState({customers: customerData});
                    //carPhotos.length = 0;

                })
            }


        });


    }

        componentWillMount() {
        this.getCustomers()

    }


        updateUserById = (id) => (updatedUser) => {
        this.setState(prevState => {
            const users = prevState.users.map(user => {
                if (user.id !== id) {
                    return user;
                }

                return {...user, ...updatedUser};
            })

            return {
                users,
            }
        });

    }


    handleDelete  = async (id) => {
        const acc = await account;
        const instance = await contract;

        await instance.deleteCustomer(id,{ from: acc });

    }



    render() {

        return (
            <div className="gallery">
                <div style={{overflow:"auto", width:"550px", height:"750px"  }}>
                {this.state.customers.map((customer,index) => {

                    if(customer.ownerFullName.length  > 1 ){

                       return <div>


                    <Paper square elevation={0} className="header">
                    <CarListDialog items={customer.photos}/>
                    <p>{customer.carMake}</p> <div className="divider2"/> <p>{customer.carModel}</p>
                    <div className="divider"/>
                    <Edit_ModalDialog id = {customer.id} />
                    <div className="divider1"/>
                    <Button onClick={this.handleDelete.bind(this,customer.id)} variant="contained" color="secondary" size = "small" className="deleteButton" ><DeleteIcon  size = "small" className="" /> </Button>
                    <InfoDialog value1={customer.ownerFullName} value2={customer.carMake} value3={customer.carModel} value4={customer.extraDes} />
                </Paper>
                    <DisplayCustomers length={customer.photos.length} image={customer.photos}/>
                           <br/>
                        </div>


                    }}




                )} </div>

                    </div>
        );
    }
}



export default withStyles(style)(FetchingCustomer);