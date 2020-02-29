import React, {Component} from "react";
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <header className="bg-dark">
                <div className="container">
                    <div className="row align-content-center justify-content-between navbar p-3">
                        <div>ООО ЛИКОС</div>
                        <div>+7 (343) 323 33 22</div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Navbar;
