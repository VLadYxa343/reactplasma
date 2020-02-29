import React, {Component} from "react";
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div className="general">
                <div className="container">
                    <div className="row justify-content-center align-content-center">
                        <div className="col-12 col-md-8 general-text animated bounceInDown mt-0 row justify-content-center">
                            <h1 className="text text-center extraBold col-12">
                                ПЛАЗМЕННАЯ РЕЗКА
                            </h1>
                            <h2 className="sub-text px18 text-center light col-12">
                                <b>Вам необходима создать фактурные элементы из заготовки? Нужен точный раскрой металлических листов?</b>
                                Вероятно для вас актуальна услуга “Воздушно-плазменная дуговая резка”. Обратитесь в ООО Ликос и мы проведем работы по выгодным ценам в Екатеринбурге!
                            </h2>
                            <a>
                                <button className="btn-blue mt-3">ОСТАВИТЬ ЗАЯВКУ</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;
