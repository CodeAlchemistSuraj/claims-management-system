// claim-management-frontend/src/components/admin/CreateUserForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import { Alert } from '../ui/Alert';
import { UserPlus, Mail, Lock, User, Building, Calendar, Shield } from 'lucide-react';

export const CreateUserForm = ({ onUserCreated }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        type: 'member',
        department: '',
        employeeCode: '',
        dob: '',
        startDate: '',
        role: 'USER'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const requestBody = {
                username: formData.username,
                password: formData.password,
                name: formData.name,
                email: formData.email,
                type: formData.type,
                department: formData.department,
                employeeCode: formData.employeeCode,
                dob: formData.dob,
                startDate: formData.startDate,
                role: formData.role,
                isAlive: true,
                lifetimeUsed: 0,
                annualUsed: 0
            };
            console.log('Sending Request:', requestBody);
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            console.log('Response Status:', response.status, 'Status Text:', response.statusText);
            const responseText = await response.text();
            console.log('Response Body:', responseText);

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Forbidden: You do not have permission to create a user');
                }
                if (responseText) {
                    try {
                        const errorData = JSON.parse(responseText);
                        throw new Error(errorData.message || 'Failed to create user');
                    } catch (jsonError) {
                        throw new Error(`Failed to parse response: ${responseText || 'Empty response'}`);
                    }
                } else {
                    throw new Error(`Request failed with status ${response.status}: ${response.statusText || 'No details provided'}`);
                }
            }

            const newUser = JSON.parse(responseText);
            setMessage('User created successfully!');
            setFormData({
                username: '',
                password: '',
                name: '',
                email: '',
                type: 'member',
                department: '',
                employeeCode: '',
                dob: '',
                startDate: '',
                role: 'USER'
            });

            if (onUserCreated) {
                onUserCreated();
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage(error.message || 'Failed to create user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <User size={18} />
                            Basic Information
                        </h3>
                        <FormField
                            label="Full Name"
                            icon={<User size={16} />}
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Enter full name"
                            required
                        />
                        <FormField
                            label="Email"
                            type="email"
                            icon={<Mail size={16} />}
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Enter email address"
                        />
                        <FormField
                            label="Username"
                            icon={<User size={16} />}
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                        <FormField
                            label="Password"
                            type="password"
                            icon={<Lock size={16} />}
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Building size={18} />
                            Employment Details
                        </h3>
                        <FormField
                            label="User Type"
                            type="select"
                            icon={<User size={16} />}
                            value={formData.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                            options={[
                                { value: 'member', label: 'Active Employee' },
                                { value: 'pensioner', label: 'Pensioner' }
                            ]}
                        />
                        <FormField
                            label="Role"
                            type="select"
                            icon={<Shield size={16} />}
                            value={formData.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            options={[
                                { value: 'USER', label: 'User' },
                                { value: 'ADMIN', label: 'Admin' }
                            ]}
                        />
                        <FormField
                            label="Department"
                            icon={<Building size={16} />}
                            value={formData.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                            placeholder="Enter department"
                        />
                        <FormField
                            label="Employee Code"
                            icon={<User size={16} />}
                            value={formData.employeeCode}
                            onChange={(e) => handleChange('employeeCode', e.target.value)}
                            placeholder="Enter employee code"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        label="Date of Birth"
                        type="date"
                        icon={<Calendar size={16} />}
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                    />
                    <FormField
                        label="Start Date"
                        type="date"
                        icon={<Calendar size={16} />}
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                </div>
                <Button
                    variant="primary"
                    type="submit"
                    loading={loading}
                    className="w-full pulse bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                    <UserPlus size={18} />
                    {loading ? 'Creating User...' : 'Create User'}
                </Button>
            </form>
            {message && (
                <Alert 
                    message={message} 
                    type={message.includes('success') ? 'success' : 'error'} 
                    className="mt-4"
                />
            )}
        </div>
    );
};