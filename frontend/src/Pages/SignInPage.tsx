import React, { useState } from 'react';
import SignInForm from '../Components/SignIn';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user/userslice';
import { useNavigate } from 'react-router-dom';
interface SignUpFormState {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormState>({
        email: '',
        password: '',
    });
    console.log(formData);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json();
            console.log(data.data);
            
            if (data.success) {
                toast.success(data.message);
                dispatch(setUser(data.data));
                navigate('/')

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);

        }
    };
    return (
        <div>
            <SignInForm formData={formData} handleChange={handleChange} handleSubmit={handlesubmit} />
        </div>
    );
};

export default SignIn;