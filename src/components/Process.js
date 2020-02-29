import React, {Component} from "react";
import './Process.css'

class Process extends Component {
    render() {
        return (
            <div className="container process">
                <div className="row justify-content-center justify-content-md-start">
                    <div className="text general-text text-md-left text-center col-12">
                        Простой процесс заказа детали:
                    </div>
                    <div className="col-md-8 col-12 text row p-0 pt-5">
                        <div className="col-12 text pb-3"><b>1.</b> Загрузите файлы: чертеж, макет изделия (.dxf, .slt, .obj, и.т.д) </div>
                        <div className="col-12 text pb-3"><b>2.</b> Мы ответим на вашу заявку меньше чем за 24 часа! </div>
                        <div className="col-12 text pb-3"><b>3.</b> Вы подтвердите заказ. </div>
                        <div className="col-12 text pb-3"><b>4.</b> Мы немедленно приступим к выполнению заказа. </div>
                        <div className="col-12 text pb-3"><b>5.</b> Когда детали будут готовы, наши специалисты проверят их качество. </div>
                        <div className="col-12 text pb-3"><b>6.</b> Вы сможете забрать ваш заказ, или мы его вам доставим! </div>
                    </div>
                    <div className="col-md-4 hide justify-content-end row">
                        <div className="plasma-logo"/>
                    </div>
                    <a>
                        <button className="btn-blue mt-3">ОСТАВИТЬ ЗАЯВКУ</button>
                    </a>
                </div>
            </div>
        );
    }
}
export default Process;
