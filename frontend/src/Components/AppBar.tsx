import { useState } from 'react';
import { Links } from '../data/links';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Button from './Button';
import { clearUser } from '../store/user/userslice';
import { clearCart } from '../store/cart/cartslice';
import toast from 'react-hot-toast';


function AppBar() {
    const location = useLocation();
    const { pathname } = location;
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const signOut = () => {
        dispatch(clearUser());
        dispatch(clearCart());
        toast.success('Logged out successfully')
        navigate('/');
    };



    return (
        <div className='flex items-center justify-between p-5 bg-gray-800 text-white'>
            <Link to={'/'} className='text-2xl font-bold'>LOGO</Link>
            <div className='hidden md:flex items-center gap-5'>
                {Links.map((link) => (
                    <Link
                        to={link.link}
                        key={link.id}
                        className={`rounded-2xl py-1 px-3 transition-colors duration-300 ${pathname === link.link ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex items-center gap-5">
                <Button className='py-1 px-3' type='button' onClick={() => navigate('/cart')}>
                    <CiShoppingCart className='h-6 w-6' />
                </Button>
                {user.email ? (
                    <div className="relative">
                        <Button type='button' onClick={toggleProfileMenu} className='bg-transparent hover:bg-transparent'>
                            <img src={user.profileImg} alt="User" className="h-8 w-8 rounded-full" />
                        </Button>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 p-4">
                                <div className="flex flex-col items-start">
                                    <img src={user.profileImg} alt="User" className="h-16 w-16 rounded-full mb-3" />
                                    <Button className='w-full py-1 mt-2' type='button' onClick={() => {
                                        navigate('/profile')
                                    }}>Profile</Button>
                                    <Button className='w-full py-1 mt-2' type='button' onClick={signOut}>Sign Out</Button>
                                    <Button className='w-full py-1 mt-2' type='button' onClick={() => {
                                        navigate('/myorders')
                                    }}>Orders</Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Button className='py-1 px-3' type='button' onClick={() => navigate('/signin')}>Sign In</Button>
                        <Button className='py-1 px-3' type='button' onClick={() => navigate('/signup')}>Sign Up</Button>
                    </>
                )}
            </div>
            <Button type='button' className='md:hidden py-1 px-3 transition ease-in-out' onClick={toggleMenu}>
                {isOpen ? <LiaTimesSolid /> : <CiMenuBurger />}
            </Button>
            {isOpen && (
                <div className='absolute top-16 left-0 right-0 bg-gray-300 text-black flex flex-col items-center gap-5 p-5 md:hidden rounded-b-2xl'>
                    {Links.map((link) => (
                        <Link
                            to={link.link}
                            key={link.id}
                            className={`rounded-2xl py-1 px-3 transition-colors duration-300 ${pathname === link.link ? 'bg-black text-white' : 'hover:bg-blue-600 hover:text-white'}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user.email ? (
                        <>
                            <Button className='py-1 px-3' type='button' onClick={toggleProfileMenu}>
                                <img src={user.profileImg} alt="User" className="h-8 w-8 rounded-full" />
                            </Button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 p-4">
                                    <div className="flex flex-col items-start">
                                        <img src={user.profileImg} alt="User" className="h-16 w-16 rounded-full mb-3" />
                                        <p><strong>Username:</strong> {user.username}</p>
                                        <p><strong>First Name:</strong> {user.firstName}</p>
                                        <p><strong>Last Name:</strong> {user.lastName}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <Button className='w-full py-1 mt-2' type='button' onClick={() => {
                                            setIsOpen(false);
                                            clearUser()
                                            navigate('/')
                                        }}>Sign Out</Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Button className='py-1 px-3' type='button' onClick={() => { setIsOpen(false); navigate('/signin'); }}>Sign In</Button>
                            <Button className='py-1 px-3' type='button' onClick={() => { setIsOpen(false); navigate('/signup'); }}>Sign Up</Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default AppBar;
