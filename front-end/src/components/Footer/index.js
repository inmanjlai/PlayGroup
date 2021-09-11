import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="get-started">
                    <h2>Create your own PlayGroup.</h2>
                    <button>Get Started</button>
                </div>


                <div className="account-list">
                    <h3>Your Account</h3>
                    <ul>
                        <li>Sign up</li>
                        <li>Log in</li>
                    </ul>
                </div>

                <div className="discover-list">
                    <h3>Discover</h3>
                    <ul>
                        <li>Groups</li>
                        <li>Events</li>
                    </ul>
                </div>

                <div className="about-list">
                    <h3>PlayGroup</h3>
                    <ul>
                        <li>About</li>
                        <li>Made by Ismail N Manjlai</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;