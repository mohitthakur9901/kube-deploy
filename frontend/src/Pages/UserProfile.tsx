import { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Button from '../Components/Button';
import InputWithLabel from '../Components/Input';
import { RootState } from '../store/store';

interface UserState {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

const Profile = () => {

    const { user } = useSelector((state: RootState) => state);

    const [formData, setFormData] = useState<UserState>({
        username: user?.username || '',
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        toast.success('Profile updated successfully!');
    };

    return (
        <div className="bg-slate-100 p-4 w-1/2 flex flex-col justify-center ">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputWithLabel
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <InputWithLabel
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <InputWithLabel
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <InputWithLabel
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <InputWithLabel
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button type="submit" className="mt-4">
                    Update Profile
                </Button>
            </form>
        </div>
    );
};

export default Profile;
