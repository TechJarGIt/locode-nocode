const Navbar = () => {
    return (
        <nav className="bg-slate-900 border-b border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between text-slate-900">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <img src='../src/assets/logo.png' width="150px" className='logo font-bold text-slate-900'></img>
                    </div>
                    <span className="text-gray-300 text-xl font-bold">LoCode</span>
                </div>

                <div className="flex items-center gap-4">
                    <ul className="flex flex-row text-gray-300 hover:cursor-pointer">
                        <li className="mx-2 hover:text-white"><a href="">My Apps</a></li>
                        <li className="mx-2 hover:text-white"><a href="">Docs</a></li>
                        <li className="mx-2 hover:text-white"><a href="">Sign Up</a></li>
                        <li className="mx-2 hover:text-white"><a href="">Log In</a></li>
                        <li className="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            {/* <span aria-label="User profile" className="profile-icon hover:cursor-pointer text-gray-300 hover:outline rounded-2xl px-2">Img</span> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;