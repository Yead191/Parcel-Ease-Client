import logo from '/parcel.png'

const Footer = () => {
    return (
        <footer className="w-full bg-muted text-muted-foreground py-10">
            <div className="container grid grid-cols-1 gap-8 md:grid-cols-4 justify-around items-center w-10/12 mx-auto">
                {/* Logo and About */}
                <div>
                    <div className="flex items-center gap-4">
                        <h1 style={{ fontVariant: 'small-caps' }} className='text-4xl' >Parcel Ease</h1>
                        <img className='w-14' src={logo} alt="" />
                    </div>
                    <p className="mt-4 text-sm">
                        Parcel Ease Ltd.
                        <br />
                        A Parcel Delivery System since 2024
                        <br />
                        This Project is Developed By Yead

                    </p>
                </div>

                {/* Services */}
                <div>
                    <h6 className="mb-4 text-lg font-semibold">Services</h6>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Branding
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Design
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Marketing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Advertisement
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h6 className="mb-4 text-lg font-semibold">Company</h6>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                About us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Jobs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Press kit
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h6 className="mb-4 text-lg font-semibold">Testing Credentials</h6>
                    <ul className="space-y-2">
                        <li>
                            Admin Credential: <br />
                            yead@admin.com | Pass: Yead123@456
                        </li>
                        <li>
                            DeliveryMan Credential: 
                            <br />
                            sajib@bormon.com | Pass: Yead123@456
                        </li>
                        <li>
                            User Credential: 
                            <br />
                            yead@gmail.com | Pass: Yead123@456
                        </li>
                        
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
