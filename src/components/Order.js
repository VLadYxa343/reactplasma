import React, {useState, useEffect, Component} from "react";
import axios from 'axios';
import {Progress} from 'reactstrap';
import './Order.css'

function FormOrder(props) {
    const {handleNewForm, handleChange, onFileUpload, id, form} = props;
    const [line] = useState(id > 0 ? <div className="line"/> : <div/>);
    return (
        <form>
            {line}
                <div className="row">
                <p className='ml-3 w-100 px18 mb-5 bold'>{id + 1} деталь</p>
                <div className="col-lg-6 col-12 row">
                    <div className="w-100">
                        <label htmlFor="" >Название детали</label>
                        <input type="text" placeholder="Косынки" className="mb-3 input-group" name="name" onChange={event => handleChange(event, id)}/>

                        <div className="row justify-content-between">
                            <label htmlFor="" >Количество</label>
                            <input type="text" placeholder="150" className="mb-3 input-group col-3" value={form[id]['amount']}  name="amount" onChange={event => handleChange(event, id)}/>
                        </div>

                        <label htmlFor="" >Материал</label>
                        <input type="text" placeholder="Сталь 5 мм" className="mb-3 input-group" value={form[id]['material']} name="material" onChange={event => handleChange(event, id)}/>

                        <label htmlFor="" >Коментарий</label>
                        <textarea cols="30" rows="8" placeholder="В максимально короткий срок" className="mb-5 input-group" value={form[id]['comment']} name="comment" onChange={event => handleChange(event, id)}/>
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="drag-n-drop row justify-content-center align-content-center">
                        <input className="file" type="file" name="file" onChange={event => onFileUpload(event, id)}/>
                        <div className="w-100 p-3">
                            <Progress className="" max="100" color="success" value={form[id].loaded} > {Math.round(form[id].loaded, 2) }%</Progress>
                        </div>
                    </div>
                    <button onClick={handleNewForm} className="btn-blue w-100 mt-3">Добавить еще деталь!</button>
                </div>
                </div>
        </form>
    )
}
function OrderForm () {
    const [form, setForm] = useState(
        [{
                        name: '',
                        material: '',
                        amount: '',
                        file: null,
                        loaded: 0,
                        sended: false,
                        comment: ''
                    }]
    );
    const [formTemplate, setFormTemplate] = useState([]);


    function onFileUpload (event, key) {
        setForm(prevForm => {
            let newForm = prevForm.map((el, i) => {
                return i == key ? {...el, loaded: 0} : el
            });
            return newForm
        });
        // setForm(prevForm => {
        //     return {...prevForm, loaded: 0}
        // });
        const file = event.target.files[0];
        setForm(prevForm => {
            let newForm = prevForm.map((el, i) => {
                return i == key ? {...el, file: file} : el
            });
            return newForm
        })
    }
    function handleChange (event, key) {
        console.log(key)
        let target = event.target;
        setForm(prevForm => {
            let newForm = prevForm.map((el, i) => {
                return i == key ? {...el, [target.name]: target.value} : el
            });
            return newForm
        })
    }
    function onSubmit (event, key) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', form[key].name);
        formData.append('amount', form[key].amount);
        formData.append('material', form[key].material);
        formData.append('comment', form[key].comment);
        formData.append('file', form[key].file);

        axios.post('http://localhost:8000/upload', formData, {
            onUploadProgress: ProgressEvent => {
                setForm(prevForm => {
                    let newForm = prevForm.map((el, i) => {
                        return i == key ? {...el, loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)} : el
                    });
                    return newForm
                });
            }
        })
            .then(e => console.log(e))
    }
    function handleNewForm(event) {
        event.preventDefault()
        setFormAmount(prevFormAmount => prevFormAmount + 1)
    }

    const [formAmount, setFormAmount] = useState(1);

    useEffect(() => {
        for(let i = form.length; i < formAmount; i++) {
            setForm(prevForm => {
                return [...prevForm, {
                    name: '',
                    material: '',
                    amount: '',
                    file: null,
                    loaded: 0,
                    sended: false,
                    comment: ''
                }]
            })
        }
    }, [formAmount]);
    useEffect(() => {
        setFormTemplate([])
        for(let i = 0; i < formAmount; i++) {
            setFormTemplate(prevFormTemplate => {
                return [...prevFormTemplate, <FormOrder handleChange={handleChange} id={i} handleNewForm={handleNewForm} onFileUpload={onFileUpload} form={form} />]
            })
        }
    }, [form]);
    return (
        <div className="order">
            <div className="container">
                <div className="row justify-content-center">
                    <b className="col-12 text-center px24">
                        Заказать деталь!
                    </b>
                    <h4 className="px18 light col-12 col-md-8 text-center mt-3">Пожалуйста используйте форму, но вы так же можете заказать деталь через email: lykos@mail.com или по телефону: +7 (343) 235 37 37</h4>
                    <div className="w-100 mb-3"/>
                    <div className="container">
                        <div className="dashed">
                            {formTemplate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            material: '',
            amount: '',
            file: null,
            loaded: 0,
            sended: false,
            comment: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this)
    }
    handleChange (event) {
        let target = event.target;
        this.setState({[target.name]: target.value})
    }

    onSubmit (event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('amount', this.state.amount);
        formData.append('material', this.state.material);
        formData.append('comment', this.state.comment);
        formData.append('file', this.state.file)

        axios.post('http://localhost:8000/upload', formData, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                })
            }
        })
            .then(e => console.log(e))
    }

    onFileUpload (event) {
        const file = event.target.files[0];
        this.setState({file: file})
    }

    render() {
        return (
            <div className="order">
                <div className="container">
                    <div className="row justify-content-center">
                        <b className="col-12 text-center px24">
                            Заказать деталь!
                        </b>
                        <h4 className="px18 light col-12 col-md-8 text-center mt-3">Пожалуйста используйте форму, но вы так же можете заказать деталь через email: lykos@mail.com или по телефону: +7 (343) 235 37 37</h4>
                        <div className="w-100 mb-3"/>
                        <div className="container">
                            <form onSubmit={this.onSubmit}>
                                <div className="row dashed">
                                    <p className='ml-3 w-100 px18 mb-5 bold'>1 деталь</p>
                                    <div className="col-lg-6 col-12 row">
                                        <div className="w-100">
                                            <label htmlFor="" >Название детали</label>
                                            <input type="text" placeholder="Косынки" className="mb-3 input-group" name="name" onChange={this.handleChange}/>

                                            <div className="row justify-content-between">
                                                <label htmlFor="" >Количество</label>
                                                <input type="text" placeholder="150" className="mb-3 input-group col-3" name="amount" onChange={this.handleChange}/>
                                            </div>

                                            <label htmlFor="" >Материал</label>
                                            <input type="text" placeholder="Сталь 5 мм" className="mb-3 input-group" name="material" onChange={this.handleChange}/>

                                            <label htmlFor="" >Коментарий</label>
                                            <textarea cols="30" rows="8" placeholder="В максимально короткий срок" className="mb-5 input-group" name="comment" onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="drag-n-drop row justify-content-center align-content-center">
                                                <input className="file" type="file" name="file" onChange={this.onFileUpload}/>
                                                <div className="w-100 p-3">
                                                    <Progress className="" max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-blue mt-3">Отправить</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderForm;
