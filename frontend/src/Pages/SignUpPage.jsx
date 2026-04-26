import {Button} from '../Components/ui/Button';
import {Input} from '../Components/ui/Input';
import {useState} from 'react';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-400px p-4 rounded-lg shadow-lg bg-white'>   
                <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
                <Input
                  variant='outline'
                    label='Email'
                    type='email'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                />
                <Input
                    label='Password'
                    type='password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                />
                <Button className='w-full mt-4'>Sign Up</Button>  
            </div>
        </div>
    );
}

export default SignUpPage;